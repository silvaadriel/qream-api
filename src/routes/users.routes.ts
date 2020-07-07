import { Router } from 'express';
import multer from 'multer';
import { classToClass } from 'class-transformer';

import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  const { name, credential, password } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({ name, credential, password });

  return response.json(user);
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const { id } = request.user;
    const { filename } = request.file;
    const updateUserAvatar = new UpdateUserAvatarService();

    const user = await updateUserAvatar.execute({
      user_id: id,
      avatarFilename: filename,
    });

    return response.json(classToClass(user));
  },
);

export default usersRouter;
