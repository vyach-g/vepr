import { User } from '@prisma/client';

export type UserId = number;
export enum UserRole {
  Admin = 'admin',
  User = 'user',
}

export class UserEnitity implements User {
  id: UserId;
  role: UserRole;
  name: string;
  email: string;
  password: string;
}
