import knexLib from "knex";
import config from "../config/config";
import logger from "../logger";

const knex = knexLib({
  client: config.database.client,
  connection: config.database.connection,
});

if (config.database.debugSQL === true) {
  knex.on("query", (queryData) => {
    if (queryData.bindings && queryData.bindings.length > 0) {
      logger.debug(
        "%s:\n%s\n",
        queryData.sql,
        JSON.stringify(queryData.bindings, null, 2)
      );
    } else {
      logger.debug("%s:\n", queryData.sql);
    }
  });
}

export default knex;
