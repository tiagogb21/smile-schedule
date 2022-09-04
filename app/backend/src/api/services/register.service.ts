import { Bcrypt, GenericError, JWT } from '../utils';

import UsersModel from '../../database/models/user.model';
import { IUser } from '../interfaces/user.interface';

const userExists = 'User already exists!';

export default class RegisterService {
  private model = UsersModel;
  private jwt = new JWT();
  private bCrypt = new Bcrypt();

  createNewUser = async (newUser: IUser) => {
    const { email } = newUser;
    const userAlreadyExists = await this.model.findOne({
      where: {
        email,
      },
    });

    if (userAlreadyExists) throw new GenericError(401, userExists);

    const { password, ...userInfo } = newUser;

    const hash = await this.bCrypt.generatePassword(password);

    const token = this.jwt.generateToken(userInfo);

    await this.model.create({ password: hash, ...userInfo });

    return {
      userInfo,
      token,
    };
  };
}
