import { validationResult } from "express-validator"
import { ApiError } from "../utils/api-error.js"

export const validate = (req, res, next) => {
  const errors = validationResult(req)

  if (errors.isEmpty()) return next()

  const extractederrors = []

  errors.array().map((err) =>
    extractederrors.push({
      [errors.path]: err.msg,
    }),
  )

  throw new ApiError(422, "Recieved Data is invalid", extractederrors)
}
