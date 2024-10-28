import {Router} from "express"
import { login, logout, register } from "../controllers/auth.controller.js"

const router = Router()

//router.post("/register", register) no activate
router.post("/login", login)
router.post("/logout", logout)

export default router
