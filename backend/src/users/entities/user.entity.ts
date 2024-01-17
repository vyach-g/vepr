import { User } from '@prisma/client';

export class UserEnitity implements User {
  id: number;
  name: string;
  email: string;
  password: string;
}
