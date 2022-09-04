import { Router } from 'express';
import LoginController from '../controllers/login.controller';
import LoginMiddleware from '../middlewares/login.middleware';
import validateToken from '../middlewares/token.middleware';

const routes = Router();

const controller = new LoginController();

routes.post(
  '/',
  LoginMiddleware.isValidEmail,
  LoginMiddleware.isValidPassword,
  controller.loginSuccess,
);

routes.get('/validate', validateToken, controller.verifyToken);

export default routes;
