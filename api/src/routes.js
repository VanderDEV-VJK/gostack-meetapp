import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import authMiddleware from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import MeetupController from './app/controllers/MeetupController';
import OrganizingController from './app/controllers/OrganizingController';
import SubscriptionController from './app/controllers/SubscriptionController';
import AvatarController from './app/controllers/AvatarController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
routes.put('/users', UserController.update);

routes.get('/meetups', MeetupController.index);
routes.post('/meetups', MeetupController.store);
routes.put('/meetups/:id', MeetupController.update);
routes.delete('/meetups/:id', MeetupController.delete);
routes.post('/meetups/:id/subscriptions', SubscriptionController.store);

routes.get('/organizing', OrganizingController.index);
routes.get('/organizing/:id', OrganizingController.show);
routes.get('/subscriptions', SubscriptionController.index);

routes.post('/upload/avatar', upload.single('file'), AvatarController.store);

export default routes;
