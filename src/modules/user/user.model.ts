import mongoose from "mongoose";
import { IUser } from "./user.interface";

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["Admin", "Waiter", "kitchen", "Cashier"],
  },
  image: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
export default User;