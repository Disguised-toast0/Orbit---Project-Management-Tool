import { body } from "express-validator"

const userRegisterValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Field is Required")
      .isEmail()
      .withMessage("Please enter a valid email"),
    body("username")
      .trim()
      .notEmpty()
      .withMessage("username cannot be empty")
      .isLowercase()
      .withMessage("username must be in lowercase")
      .isLength({ min: 3 })
      .withMessage("username must be more than 3 character long"),
    body("password").trim().notEmpty().withMessage("password cannot be empty"),
    body("fullname").optional().trim(),
  ]
}

const userLoginValidator = () => {
  return [
    body("email")
      .trim()
      .optional()
      .isEmail()
      .withMessage("please enter a valid email"),
    body("username").trim().optional(),
    body("password").trim().notEmpty().withMessage("password cannot be empty"),
  ]
}

export { userRegisterValidator, userLoginValidator }
