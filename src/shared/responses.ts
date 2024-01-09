import { Response } from "express";
import { cookieConfig } from "./configs";

export const badRequest = (res: Response, message: string) => {
  return res.status(400).json({ message }).end();
};

export const successWithCookie = (
  res: Response,
  RefreshToken: string,
  response: {
    message: string;
    AccessToken: string;
  }
) => {
  return res
    .status(201)
    .cookie("refresh_token", RefreshToken, cookieConfig)
    .json(response);
};

export const success = (res: Response, data: {}) => {
  return res.status(200).json({ data });
};

export const created = (res: Response, message: string, data: {}) => {
  return res
    .status(201)
    .json({
      message,
      data,
    })
    .end();
};
