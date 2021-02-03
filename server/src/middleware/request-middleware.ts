import { RequestHandler, Request, Response, NextFunction } from "express";
import Joi from "@hapi/joi";
import BadRequest from "../errors/bad-request";
import logger from "../logger";

const getMessageFromJoiError = (
  error: Joi.ValidationError
): string | undefined => {
  if (!error.details && error.message) {
    return error.message;
  }
  return error.details && error.details.length > 0 && error.details[0].message
    ? `PATH: [${error.details[0].path}] ;; MESSAGE: ${error.details[0].message}`
    : undefined;
};

interface HandlerOptions {
  validation?: {
    body?: Joi.ObjectSchema;
    query?: any;
  };
}

export const relogRequestHandler = (
  handler: RequestHandler,
  options?: HandlerOptions
): RequestHandler => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (options?.validation?.body) {
    const { error } = options?.validation?.body.validate(req.body);
    if (error != null) {
      return next(new BadRequest(getMessageFromJoiError(error)));
    }
  }

  return handler(req, res, next);
};

export default relogRequestHandler;
