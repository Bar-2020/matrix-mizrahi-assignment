import { User } from './users.service';

// This is my in memory database, in a production app the passwords would be hashed.
export const hardcodedUsers: User[] = [
  {
    userId: '1',
    username: 'john',
    password: 'Password@123',
  },
  {
    userId: '2',
    username: 'maria',
    password: 'guess',
  },
];
