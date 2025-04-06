import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    let token = req.cookies?.accessToken;
    const authHeader = req.headers?.authorization;

    // fallback to Authorization header if cookie not found
    if (!token && authHeader?.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
        console.log("✅ Extracted token from header:", token);
    }

    if (!token) {
        throw new ApiError(401, "Access token missing");
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        req.user = await User.findById(decoded._id).select("-password");
        if (!req.user) throw new ApiError(401, "User not found");

        next();
    } catch (err) {
        console.error("❌ JWT error:", err.message);
        throw new ApiError(401, "Invalid access token");
    }
});
