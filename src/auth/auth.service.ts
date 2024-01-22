import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { USER_ROLES } from 'src/users/enums/user_roles.enum';
import { UserDto } from 'src/users/dto/user.dto';
import { UserResponseDto } from 'src/users/dto/userResponse.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly userResponseDto: UserResponseDto,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserResponseDto> | null {
    const userRecord = await this.usersService.findByEmail(email);

    if (userRecord && (await bcrypt.compare(password, userRecord.password))) {
      const result = this.userResponseDto.fromDb(userRecord);
      return result;
    }
    return null;
  }

  async login(user: UserResponseDto): Promise<{ accessToken: string }> {
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async register(registrationDto: RegisterDto): Promise<UserResponseDto> {
    const hashedPassword = await bcrypt.hash(registrationDto.password, 10);
    const newUser: UserDto = {
      fullName: registrationDto.full_name,
      email: registrationDto.email,
      password: hashedPassword,
      role: USER_ROLES.BLOGGER,
    };

    return this.usersService.create(newUser);
  }
}
