import { Router } from 'express';
import RegisterController from '../controllers/register.controller';
import RegisterMiddleware from '../middlewares/register.middleware';

const routes = Router();

const controller = new RegisterController();

routes.post(
  '/',
  RegisterMiddleware.isValidName,
  RegisterMiddleware.isValidEmail,
  RegisterMiddleware.isValidPassword,
  controller.registerSuccess,
);

export default routes;
