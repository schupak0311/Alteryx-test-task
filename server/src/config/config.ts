const config = {
  domain: process.env.API_DOMAIN,
  port: process.env.API_SERVER_PORT,
  ipaddr: process.env.API_IP_ADDRESS,
  database: {
    debugSQL: false,
    client: "mysql",
    connection: {
      host: process.env.API_MYSQL_HOST,
      port: process.env.API_MYSQL_PORT,
      user: process.env.API_MYSQL_USER,
      password: process.env.API_MYSQL_PASSWORD,
      database: process.env.API_MYSQL_DATABASE,
      charset: "utf8",
    },
  },
};

export default config;
