import bodyParser from "body-parser";
import cors from "cors";
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import GetAuthRouter from "./routes/AuthRouter/GetAuthRouter";
import GetUserRouter from "./routes/UserRouter/GetUserRouter";
import path from "path";
import fileUpload from "express-fileupload";
dotenv.config();

export const app = express();

let jsonBodyMiddleware = express.json();

app.use(
  cors({
    origin: process.env.FRONT_URL,
    credentials: true,
  })
);
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(jsonBodyMiddleware);
app.use(express.static(path.resolve(__dirname, "static")));
app.use(fileUpload({}));

const AuthRouter = GetAuthRouter();
const UserRouter = GetUserRouter();

app.use(AuthRouter);
app.use(UserRouter);
