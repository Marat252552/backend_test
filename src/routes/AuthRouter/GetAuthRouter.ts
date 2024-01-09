import { Router } from "express";
import Controllers from "./Controllers";
import { loginValidation, signinValidation } from "./validators";

const GetAuthRouter = () => {
  const router = Router();
  router.post("/signin", signinValidation, Controllers.signin);
  router.post("/login", loginValidation, Controllers.login);
  return router;
};

export default GetAuthRouter;
