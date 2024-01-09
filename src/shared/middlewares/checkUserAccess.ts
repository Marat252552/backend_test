import jwt from "jsonwebtoken";
import { Roles, TokenPayload_T } from "../types";
import { doesUserExist } from "../../database/queries";
import { NextFunction, Request, Response } from "express";

interface Req_T extends Request {
  headers: {
    authorization?: string;
  };
}

const checkUserAccess = async (
  req: Req_T,
  res: Response,
  next: NextFunction
) => {
  try {
    let AccessToken = req.headers.authorization?.split(" ")[1];
    if (!AccessToken) return res.sendStatus(403).end();

    jwt.verify(AccessToken, process.env.JWT_ACCESS_KEY!);

    let TokenPayload = jwt.decode(AccessToken) as TokenPayload_T;

    const exists = await doesUserExist(TokenPayload.email);
    if (!exists)
      return res.sendStatus(401).json({ message: "Пользователь не найден" });

    res.locals.TokenPayload = TokenPayload;
    next();
  } catch (e) {
    console.log(e);
    res.sendStatus(403).end();
  }
};

export default checkUserAccess;
