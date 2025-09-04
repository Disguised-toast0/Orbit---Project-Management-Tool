import { ApiResponse } from "../utils/api-response.js"
import { Asynchandler } from "../utils/Asynchandler.js"

const HealthCheck = Asynchandler((req, res) => {
  res
    .status(200)
    .json(new ApiResponse(200, { message: "Server is Running 🚀" }))
})

export { HealthCheck }
