import { Router } from "express";
import {registerUser,loginUser,logoutUser} from '../controllers/User-controler.js';
import {upload} from '../middlewares/Multer.js';
import { verifyAuth } from "../middlewares/Auth_Varify.js";

const router = Router();

router.route('/register').post(upload.single('avatar'),registerUser);
router.route('/login').post(loginUser);
router.route('/logout').post(verifyAuth,logoutUser);

export default router;

