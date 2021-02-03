import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import apiSpec from "../openapi.json";

import * as AuthController from "./controllers/auth";

const swaggerUiOptions = {
  customCss: ".swagger-ui .topbar { display: none }",
};

const router = Router();

router.post("/login", AuthController.login);

router.post("/signup", AuthController.signup);
// Dev routes
if (process.env.NODE_ENV === "development") {
  router.use("/dev/api-docs", swaggerUi.serve);
  router.get("/dev/api-docs", swaggerUi.setup(apiSpec, swaggerUiOptions));
}

export default router;
