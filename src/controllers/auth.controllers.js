import { User } from "../models/user.models.js"
import { ApiResponse } from "../utils/api-response.js"
import { Asynchandler } from "../utils/Asynchandler.js"
import { ApiError } from "../utils/api-error.js"
import { emailVerificationMailgenContent, sendEmail } from "../utils/mail.js"

const generateAccessandRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId)
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

    user.refreshToken = refreshToken //save it in db refreshToken schema

    await user.save({ validateBeforeSave: false })
    return { accessToken, refreshToken }
  } catch (error) {
    throw new ApiError(
      500,
      "Something Went wrong while generating access token",
    )
  }
}

const RegisterUser = Asynchandler(async (req, res) => {
  const { email, username, password, role } = req.body

  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  })

  if (existingUser) {
    throw new ApiError(409, "User with email or username already exists.", [])
  }

  const user = await User.create({
    email,
    password,
    username,
    isEmailVerified: false,
  })

  const { rawToken, HashedToken, TokenExpiry } = user.generateTemporaryToken()

  user.emailVerificationExpiry = TokenExpiry
  user.emailVerificationToken = HashedToken
  await user.save({ validateBeforeSave: false })

  await sendEmail({
    email: user?.email,
    subject: "Please Verify Your Email.",
    mailgenContent: emailVerificationMailgenContent(
      user.username,
      `${req.protocol}://${req.get("host")}/api/v1/auth/verify-email/${rawToken}`,
    ),
  })

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken -emailVerificationToken -emailVerificationExpiry",
  )

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering a user")
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { user: createdUser },
        "User Registered Successfully and Verification Email has been sent to your email",
      ),
    )
})

const Login = Asynchandler(async (req, res) => {
  const { email, username, password } = req.body

  if (!email) {
    throw new ApiError(401, "Email is required")
  }

  const user = await User.findOne({ email })

  if (!user) {
    throw new ApiError(409, "user Doesn't exist, go to create account")
  }

  const isPasswordValid = user.isPasswordCorrect(password)

  if (!isPasswordValid) {
    throw new ApiError(409, "password is incorrect")
  }

  const { accessToken, refreshToken } = await generateAccessandRefreshToken(
    user._id,
  )

  const LoggedUser = await User.findById(user._id).select(
    "-password -refreshToken -emailVerificationToken -emailVerificationExpiry",
  )

  const options = {
    httpOnly: true,
    secure: true,
  }

  return res
    .status(200)
    .cookie("accesstoken", accessToken, options)
    .cookie("refreshtoken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: LoggedUser,
          accessToken,
          refreshToken,
        },
        "User Logged in Successfully",
      ),
    )
})

export { RegisterUser, Login }
