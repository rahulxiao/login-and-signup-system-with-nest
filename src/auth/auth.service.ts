
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminService } from '../admin/admin.service';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private adminService: AdminService,
    private jwtService: JwtService
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const admin = await this.adminService.findByUsername(username);

    if (admin?.password !== pass) {
      throw new UnauthorizedException();
    }

    const payload = { sub: admin.id, username: admin.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(signupDto: SignupDto) {
    // Convert SignupDto to CreateAdminDto format
    const createAdminData = {
      ...signupDto,
      phone: '', // Default empty value
      address: '', // Default empty value
      dateOfBirth: new Date().toISOString(), // Default to current date
      socialMediaLink: '', // Default empty value
      country: 'Unknown' // Default country
    };

    return await this.adminService.createAdmin(createAdminData);
  }
}
