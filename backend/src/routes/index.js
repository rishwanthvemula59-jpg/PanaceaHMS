import { Router } from 'express';
import publicRouter from './publicRoutes.js';
import adminRouter from './adminRoutes.js';

const apiRouter = Router();

// Mount public routes first so they take precedence for GET/public actions
apiRouter.use('/', publicRouter);

// Mount admin-scoped and protected mutating routes
apiRouter.use('/', adminRouter);

export default apiRouter;
