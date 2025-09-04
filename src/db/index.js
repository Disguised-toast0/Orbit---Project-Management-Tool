import mongoose from "mongoose"

const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log(" 🚀 MONGODB CONNECTION SUCCESS")
  } catch (error) {
    console.log(" ❌ MONGODB CONNECTION FAILED")
    process.exit(1)
  }
}

export default ConnectDB
