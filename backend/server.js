import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.js";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";

const app = express();

// Passport Configuration for Google Oauth

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      // asynchronous verification, for effect...
      process.nextTick(function () {
        return done(null, profile);
      });
    }
  )
);

app.use(cors());
app.use(express.json());
app.use("/api/user", userRoutes);
app.get("/", (req, res) => {
  res.status(200).send("test");
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/success",
    failureRedirect: "/auth",
  })
);

app.get("/success", (req, res) => {
  res.send("login success");
});
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));
export default app;
