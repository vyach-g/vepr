import { User } from '@prisma/client';
import { UserRole } from 'src/roles/roles.types';

export type UserId = number;

export class UserEnitity implements User {
  id: UserId;
  role: UserRole;
  name: string;
  email: string;
  password: string;
}
