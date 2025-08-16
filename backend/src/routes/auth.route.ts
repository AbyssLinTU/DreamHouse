import {Router} from "express"
import authController from "../controllers/auth.controller"


const authRoute=Router()
authRoute.post("/register",authController.register)
authRoute.post("/login", authController.login)
authRoute.post("/logout",authController.logout)
authRoute.get('/activate/:link',authController.activate)
authRoute.get('/refresh',authController.refresh)
authRoute.get('/check-admin',authController.checkAdmin)
export default authRoute