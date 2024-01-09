import { Request, Response } from "express";
import { User_T } from "../../../shared/types";

export type signinReq_T = Request<
  {},
  {},
  {
    name?: string;
    email?: string;
    password?: string;
  }
>;

export type signinRes_T = Response<
  {},
  {
    name: string;
    email: string;
    password: string;
  }
>;

export type loginReq_T = Request<
  {},
  {},
  {
    email?: string;
    password?: string;
  }
>;

export type loginRes_T = Response<
  {},
  {
    user: User_T;
  }
>;
