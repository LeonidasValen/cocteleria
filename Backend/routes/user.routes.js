import {Router} from "express"
import { getUser } from "../controllers/user.controller.js"
import { validateToken } from "../libs/validateJWT.js"

const router = Router()

router.get('/user', validateToken, getUser)

export default router