import mongoose from "mongoose";
import { config } from "dotenv";
config();
const connection = mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
export default connection;