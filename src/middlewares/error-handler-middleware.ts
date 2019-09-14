import { ErrorRequestHandler } from "express";

export const handleError: ErrorRequestHandler = (err, _req, res, _next) => {
  res.status(err.status || 500);

  res.send(err);
}