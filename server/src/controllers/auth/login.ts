// @ts-nocheck
import { RequestHandler } from "express";
import Joi from "@hapi/joi";
import passport from "passport";
import requestMiddleware from "../../middleware/request-middleware";
import { createTokens } from "../../services/jwt.service";
import authModel from "../../models/auth.model";

export const UserSchema = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

const login: RequestHandler = async (req, res, next) => {
  passport.authenticate("local-login", {}, (err, userObj) => {
    if (err) {
      return next(err);
    }
    if (!userObj)
      return res.status(400).send({ msg: "Invalid username or password" });

    const tokens = createTokens(userObj);

    return authModel
      .updateRefreshToken(userObj.id, tokens.refreshToken)
      .then(() => res.json(tokens));
  })(req, res, next);
};

export default requestMiddleware(login, {
  validation: { body: UserSchema },
});
