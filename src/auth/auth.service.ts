import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { USER_ROLES } from 'src/users/enums/user_roles.enum';
import { CreateUserDto } from 'src/users/dto/user.dto';
import { UserDetailDto } from 'src/users/dto/userDetail.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly userDetailDto: UserDetailDto,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserDetailDto> | null {
    const userRecord = await this.usersService.findByEmail(email);

    if (userRecord && (await bcrypt.compare(password, userRecord.password))) {
      const result = this.userDetailDto.fromDb(userRecord);
      return result;
    }
    return null;
  }

  async login(user: UserDetailDto): Promise<{ accessToken: string }> {
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async register(registrationDto: RegisterDto): Promise<UserDetailDto> {
    const hashedPassword = await bcrypt.hash(registrationDto.password, 10);
    const newUser: CreateUserDto = {
      fullName: registrationDto.full_name,
      email: registrationDto.email,
      password: hashedPassword,
      role: USER_ROLES.MODERATOR,
    };

    return this.usersService.create(newUser);
  }
}
