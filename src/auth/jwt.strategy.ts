import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from 'src/users/entities/user.entity';
import { UserDetailDto } from 'src/users/dto/userDetail.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,
    private configService: ConfigService,
    private userDetailDto: UserDetailDto,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET') || 'secretKey',
    });
  }

  async validate(payload: any) {
    const userRecord: UserEntity = await this.usersService.findById(
      payload.sub,
    );
    return this.userDetailDto.fromDb(userRecord);
  }
}
