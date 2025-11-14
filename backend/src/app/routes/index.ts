import  { Router } from 'express';
import { userRoutes } from '../modules/User/user.route';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { jobRoutes } from '../modules/Jobs/job.route';
import { LearningResourceRoutes } from '../modules/LearningResource/learningResource.route';
// import { chatRoutes } from '../modules/Chat/chat.route';




const router = Router();

const moduleRoutes = [
   {
    path:'/users',
    route:userRoutes,
  }
  ,
  {
    path: '/auth',
    route: AuthRoutes,
  },
{
  path:'/jobs',
  route:jobRoutes,
},
{
  path:'/learning-resources',
  route:LearningResourceRoutes
},
 
 
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;