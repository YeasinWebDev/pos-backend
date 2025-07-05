import { Router } from "express";
import { CreateUser, loginUser } from "./user.controllers";

export const userRoute = Router()

userRoute.post('/signUp', CreateUser)
userRoute.post('/signIn', loginUser)