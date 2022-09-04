import { IUser } from './user.interface';

export type IJWT = Omit<IUser, 'password'>;
