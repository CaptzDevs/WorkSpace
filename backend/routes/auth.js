import { Router } from "express";
import passport from "../config/githubConfig.js";
import jwt from "jsonwebtoken";
import { authenticateToken } from "backend/controller/authenticateToken.js";

const authRouter = Router();

// GitHub Login Route
authRouter.get("/github", passport.authenticate("github", { scope: ["user:email"] }));

// GitHub Callback Route
authRouter.get(
    "/github/callback",
    passport.authenticate("github", { session: false }), // 🚀 Disable session
    (req, res) => {
      const { user, token } = req.user; // Extract user & token
     /*  res.json({ user, token }); // Send JWT to frontend */
      res.redirect(`http://localhost:5173?token=${token}`);
    }
  );
  

// ✅ Protected route (requires JWT)
authRouter.get("/user", authenticateToken, (req, res) => {
  const user = req.user
    if (err) return res.status(403).json({ message: "Invalid token" });

    res.json(user); // Return authenticated user data
});

export default authRouter;
