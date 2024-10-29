import { Router } from "express";
import {registerUser,loginUser} from '../controllers/User-controler.js';
import {upload} from '../middlewares/Multer.js';

const router = Router();

router.route('/register').post(upload.single('avatar'),registerUser);
router.route('/login').post(loginUser);

export default router;

