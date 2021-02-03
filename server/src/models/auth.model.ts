// @ts-nocheck

import config from "../config/config";
import db from "../services/db";
import crypto from "crypto";

const Auth = {
  makeSalt: () => {
    return crypto.randomBytes(config.crypto.saltByteSize).toString("base64");
  },

  encryptPassword: (salt, password) => {
    if (!password) {
      throw new Error("encryptPassword() No password specified!");
    }

    if (!salt) {
      throw new Error("encryptPassword() No salt specified!");
    }

    const saltBuffer = new Buffer(salt, "base64");

    return crypto
      .pbkdf2Sync(
        password,
        saltBuffer,
        config.crypto.iterations,
        config.crypto.hashByteSize,
        "sha512"
      )
      .toString("base64");
  },

  updateRefreshToken: (userId, refreshToken) => {
    if (!userId || userId.length === 0) {
      return Promise.reject(
        new Error("updateRefreshToken() No userId specified!")
      );
    }
    if (!refreshToken || refreshToken.length === 0) {
      return Promise.reject(
        new Error("updateRefreshToken() No refreshToken specified!")
      );
    }
    const updateUserSql = "UPDATE users SET refresh_token = ? WHERE id = ?";
    const updateUserSqlParams = [refreshToken, userId];
    return db.knex.raw(updateUserSql, updateUserSqlParams);
  },
};

export default Auth;
