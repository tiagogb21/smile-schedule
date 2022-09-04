export interface IUser {
  username: string,
  email: string,
  role: string,
  password: string
}

export type ILogin = Omit<IUser, 'role' | 'username' >;
