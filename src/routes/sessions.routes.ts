import { Router } from 'express';
import { classToClass } from 'class-transformer';

import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { credential, password } = request.body;

  const authenticateUser = new AuthenticateUserService();

  const { user, token } = await authenticateUser.execute({
    credential,
    password,
  });

  return response.json({ user: classToClass(user), token });
});

export default sessionsRouter;
