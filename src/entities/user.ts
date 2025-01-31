export interface User {
  id: number;
  firstName: string;
  lastName: string;
  short: string;
  bio: string;
  avatar: string;
  friends: { id: number; firstName: string; lastName: string }[];
}
