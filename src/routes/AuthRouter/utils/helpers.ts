import { TokenPayload_T } from "../../../shared/types";
import jwt from "jsonwebtoken";

export const generateTokens = (payload: TokenPayload_T) => {
  let AccessKey = process.env.JWT_ACCESS_KEY!;
  let RefreshKey = process.env.JWT_REFRESH_KEY!;

  let AccessToken = jwt.sign(payload, AccessKey, { expiresIn: "30m" });
  let RefreshToken = jwt.sign(payload, RefreshKey, { expiresIn: "30d" });

  return { AccessToken, RefreshToken };
};
