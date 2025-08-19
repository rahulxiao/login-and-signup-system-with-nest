
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminService } from '../admin/admin.service';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './signup.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const admin = await this.adminService.findByUsername(username);

    const isValid = admin ? await bcrypt.compare(pass, admin.password) : false;
    if (!admin || !isValid) {
      throw new UnauthorizedException();
    }

    const payload = { sub: admin.id, username: admin.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(signupDto: SignupDto) {
    const createAdminData = {...signupDto,
      phone: '',
      address: '',
      dateOfBirth: new Date().toISOString(),
      socialMediaLink: '',
      country: 'Unknown'
    };

    return await this.adminService.createAdmin(createAdminData);
  }
}
