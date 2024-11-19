import {Router} from "express"
import { login, logout, register } from "../controllers/auth.controller.js"
import { loginLimit } from "../middleware/limitRate.js"

const router = Router()

//router.post("/register", register)
router.post("/login",loginLimit,  login)
router.post("/logout", logout)

export default router