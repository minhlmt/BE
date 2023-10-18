import express from 'express'; 
const adminRouter = express.Router();
import adminController from '../controllers/adminController.js';
import middlewareController from '../controllers/middlewareController.js';

adminRouter.get('/user',middlewareController.verifyAdmin,adminController.getUsers);
adminRouter.get('/recipe',middlewareController.verifyAdmin,adminController.getRecipes);
adminRouter.get('/dashboard',middlewareController.verifyAdmin,adminController.dashboardDetail);

export default adminRouter;