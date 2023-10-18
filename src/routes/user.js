import express from "express";
import userController from "../controllers/userController.js";
import middlewareController from "../controllers/middlewareController.js";
const userRouter = express.Router();
import UserController from '../controllers/userController.js'

userRouter.get('/top_chief', UserController.getTopChief);

userRouter.get('/', UserController.getAll);
userRouter.get('/:id', UserController.getUserID);
userRouter.post('/forgot-password', UserController.forgotPassword);
// userRouter.put('/change-password', UserController.changePassword);
userRouter.post('/register', UserController.postUser );
userRouter.post('/login', UserController.CreateToken);
userRouter.delete('/', UserController.deleteUser);
userRouter.put('/:id', UserController.updateUser);



userRouter.get('/profile/:id',middlewareController.verifyToken,userController.getUserDetail);
userRouter.post('/update/:id',middlewareController.verifyToken,userController.updateUserDetails);
userRouter.post('/f_m/:id',middlewareController.verifyToken,userController.userChiefFollow);
userRouter.post('/c_m/:id',middlewareController.verifyToken,userController.userRecipeFollow);


export default userRouter;