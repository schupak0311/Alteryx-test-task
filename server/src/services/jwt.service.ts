// @ts-nocheck
import jwt from "jsonwebtoken";

let config = {
  sessionSecret: "supersecret",
  JWTExpires: 90 * 60,
};

export const createTokens = (userObj) => {
  const { id, username } = userObj;

  const token = jwt.sign(
    {
      id,
      username,
    },
    config.sessionSecret,
    {}
  );
  const refreshToken = jwt.sign({ id, username }, config.sessionSecret, {
    expiresIn: config.refreshJWTExpires,
  });

  return { token, refreshToken };
};
