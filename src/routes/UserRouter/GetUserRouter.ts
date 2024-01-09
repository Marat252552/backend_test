import { Router } from "express";
import Controllers from "./Controllers";
import { updateUserValidation } from "./validators";
import checkUserAccess from "../../shared/middlewares/checkUserAccess";
import checkAdminAccess from "../../shared/middlewares/checkAdminAccess";

const GetUserRouter = () => {
  const router = Router();
  router.put(
    "/profile",
    checkUserAccess,
    updateUserValidation,
    Controllers.updateUser
  );
  router.get("/profile", checkUserAccess, Controllers.getUser);
  router.get("/profiles", checkAdminAccess, Controllers.getUsers);
  return router;
};

export default GetUserRouter;
