import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import dotenv from "dotenv";
import axios from "axios";
import jwt from "jsonwebtoken";

dotenv.config();

passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:8000/auth/github/callback",
        scope: ["user:email"],
        session: false, // 🚀 Disable session support
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const { data: emails } = await axios.get("https://api.github.com/user/emails", {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
  
          const primaryEmail = emails.find((email) => email.primary && email.verified)?.email || null;
  
          const user = {
            id: profile.id,
            username: profile.username,
            displayName: profile.displayName,
            avatar: profile.photos[0]?.value,
            email: primaryEmail,
          };
  
          // Generate JWT token
          const token = jwt.sign(user, process.env.APP_SECRET_KEY, { expiresIn: "1h" });
  
          return done(null, { user, token });
        } catch (error) {
          return done(error, null);
        }
      }
    )
  );
  
  // 🚀 Remove session serialization (not needed for JWT)
  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((user, done) => done(null, user));
  

export default passport;
