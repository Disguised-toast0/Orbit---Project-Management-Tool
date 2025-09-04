import dotenv from "dotenv"
import app from "./app.js"
import ConnectDB from "./db/index.js"

dotenv.config({
  path: "./.env",
})

const port = process.env.PORT || 3000

ConnectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`App running on http://localhost:${port}`)
    })
  })
  .catch((err) => {
    console.log("MONGODB CONNECTION FAILED FROM PORT")
    process.exit(1)
  })
