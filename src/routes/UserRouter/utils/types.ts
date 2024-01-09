import { Request, Response } from "express";
import { TokenPayload_T } from "../../../shared/types";
import { AllowedKeys_T } from "../../../shared/types";

export interface updateUserReq_T extends Request<{}, {}, AllowedKeys_T> {
  files?: any;
}

export type updateUserRes_T = Response<
  {},
  {
    TokenPayload: TokenPayload_T;
    image_name?: string;
  }
>;

export type getUsersReq_T = Request<
  {},
  {},
  {},
  {
    page?: number;
  }
>;
