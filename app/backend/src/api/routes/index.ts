import { Router } from 'express';

import login from './login.route';
import register from './register.route';

const routes = Router();

routes.use('/login', login);
routes.use('/teams', register);

export default routes;
