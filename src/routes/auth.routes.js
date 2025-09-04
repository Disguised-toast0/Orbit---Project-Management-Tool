import { Login, RegisterUser } from "../controllers/auth.controllers.js"
import { Router } from "express"
import {
  userLoginValidator,
  userRegisterValidator,
} from "../validators/index.js"
import { validate } from "../middlewares/validator.middleware.js"

const router = Router()

router.route("/register").post(userRegisterValidator(), validate, RegisterUser)
router.route("/login").post(userLoginValidator(), validate, Login)

export default router
