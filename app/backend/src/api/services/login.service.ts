import UsersModel from '../../database/models/user.model';
import { ITokenData } from '../interfaces/token.interface';
import { ILogin, IUser } from '../interfaces/user.interface';
import { Bcrypt, JWT, GenericError } from '../utils';
import { incorrectEmailOrPasswordMessage } from '../data/data';

export default class LoginService {
  private usersModel = UsersModel;
  private jwt = new JWT();
  private bcrypt = new Bcrypt();

  isValidLogin = async (loginData: ILogin) => {
    const userEmail = await this.usersModel.findOne({ where: { email: loginData.email } });
    if (!userEmail) throw new GenericError(401, incorrectEmailOrPasswordMessage);
    const { password, ...userWithoutPasword } = userEmail as unknown as IUser;

    const isValidPassword = await this.bcrypt.comparePassword(loginData.password, password);
    if (!isValidPassword) {
      throw new GenericError(401, incorrectEmailOrPasswordMessage);
    }
    return this.jwt.generateToken(userWithoutPasword);
  };

  verifyToken(token: string) {
    const validToken = this.jwt.validateToken(token);
    // eslint-disable-next-line no-empty-pattern
    const { data: { /* role */ } } = validToken as ITokenData;
    return { role: 'admin' };
  }
}
