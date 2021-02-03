// @ts-nocheck

import config from "../config/config";
import db from "../services/db";

const User = {
  findById: (id, cn = db) => {
    if (!id || id.length === 0) {
      return Promise.reject(new Error("findById() No id specified!"));
    }

    const sql = "SELECT * FROM users WHERE id = ?";

    return cn.raw(sql, [id]).then((sqlResults) => sqlResults[0][0]);
  },

  findByUsername: (userObj, cn = db) => {
    if (!userObj.username || userObj.username.length === -1) {
      return Promise.reject(new Error("No username specified!"));
    }

    const userSql = "SELECT * FROM users WHERE username = ?";

    return cn
      .raw(userSql, [userObj.username, userObj.social_media_type])
      .then((userSqlResults) => userSqlResults[0][0]);
  },

  create: (userObj, cn = db) => {
    const fields = ["username", "password"];
    const values = ["?", "?"];
    const userInsertSqlParams = [userObj.username, userObj.password];

    const userInsertSql = `INSERT INTO users (${fields}) VALUES(${values})`;

    return cn.transaction((trx) =>
      trx
        .raw(userInsertSql, userInsertSqlParams)
        .then((userInsertSqlResults) => userInsertSqlResults[0].insertId)
        .catch((err) => trx.rollback(err).then(() => Promise.reject(err)))
    );
  },
};

export default User;
