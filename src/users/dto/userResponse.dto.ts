import { UserEntity } from '../entities/user.entity';

export class UserResponseDto {
  id?: string;
  fullName?: string;
  email?: string;
  role?: string;
  created_at?: string;
  udpated_at?: string;

  fromDb(userRecord: UserEntity) {
    const dto = new UserResponseDto();
    dto.id = userRecord.id;
    dto.email = userRecord.email;
    dto.fullName = userRecord.fullName;
    dto.role = userRecord.role;
    return dto;
  }
}
