import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { loginUser, logOutUser, refreshAccessToken, registerUser,generateOtp,verifyOtp,getUserProfile } from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";



const router = Router();

router.route("/register").post(
    upload.single("avatar"),
    registerUser
)

router.route("/login").post(loginUser)

router.route("/logout").post(verifyToken , logOutUser)

router.route("/refresh-token").post(refreshAccessToken)

router.route("/forgot-password").post(generateOtp)
router.route("/verify-otp").patch(verifyOtp)

router.route("/profile").get(verifyToken, getUserProfile)

export default router