import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { User } from "../user.schema.js";

import dotenv from "dotenv";
dotenv.config();

const options = {
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtStrategy = new JwtStrategy(options, async (payload, done) => {
  try {
    const user = await User.findById(payload.userId);

    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
});

passport.use(jwtStrategy);

const auth = passport.authenticate("jwt", { session: false });

export { auth };
