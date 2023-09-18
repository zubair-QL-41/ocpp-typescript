import {Router} from 'express';
import { HomeController } from '../controllers/HomeController';

const router = Router();

router.post('/',HomeController.startTransaction);

export default router;