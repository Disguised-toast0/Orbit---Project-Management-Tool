import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

// Parse JSON body, limit 16kb
app.use(express.json({ limit: "16kb" }))
// Parse form data (URL-encoded), limit 16kb
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())

// CORS INTEGRATION
app.use(
  cors({
    origin: process.env.CORS_ORIGIN
      ? process.env.CORS_ORIGIN.split(",")
      : ["http://localhost:5173/"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
)

import Healthcheckrouter from "./routes/healthcheck.routes.js"
import authrouter from "./routes/auth.routes.js"

app.use("/api/v1/healthcheck", Healthcheckrouter)
app.use("/api/v1/auth", authrouter)

app.get("/", (req, res) => {
  res.send(`this is crazy`)
})

export default app
