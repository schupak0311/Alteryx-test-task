// @ts-nocheck
import { RequestHandler } from "express";
import Joi from "@hapi/joi";
import requestMiddleware from "../../middleware/request-middleware";
import authModel from "../../models/auth.model";

export const UserSchema = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

const signup: RequestHandler = async (req, res, next) => {
  const userObj = req.body;

  return createUserAndGetToken(userObj).then((result) => {
    return res.json(result);
  });
};

const createUserAndGetToken = (userObj) => {
  return userModel.create(userObj).then((userInsertResult) => {
    const tokens = jwtService.createTokens(userResultObj);
    return authModel
      .updateRefreshToken(userInsertResult, tokens.refreshToken)
      .then(() => tokens);
  });
};

export default requestMiddleware(signup, {
  validation: { body: UserSchema },
});
