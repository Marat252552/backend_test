import { Response } from "express";
import { TokenPayload_T } from "../../shared/types";
import jwt from "jsonwebtoken";
import { addUser } from "../../database/queries";
import { hashSync } from "bcrypt";
import { loginReq_T, loginRes_T, signinReq_T } from "./utils/types";
import { cookieConfig } from "../../shared/configs";
import errorsHandler from "../../shared/controllerWrapper";
import { generateTokens } from "./utils/helpers";
import { successWithCookie } from "../../shared/responses";

class Controllers {
  async signin(req: signinReq_T, res: Response) {
    errorsHandler(res, async () => {
      const { email, password, name } = res.locals;
      const role = email === "admin" ? "ADMIN" : "USER";

      const hashedPassword = hashSync(password, 5);
      const user = await addUser({
        email,
        password: hashedPassword,
        name,
        role,
      });

      const { AccessToken, RefreshToken } = generateTokens({
        email,
        user_id: user.id.toString(),
        role,
      });

      const response = {
        message: "Пользователь успешно зарегистрирован",
        AccessToken,
      };

      successWithCookie(res, RefreshToken, response);
    });
  }
  async login(req: loginReq_T, res: loginRes_T) {
    errorsHandler(res, async () => {
      const { id, email, role } = res.locals.user;

      const { AccessToken, RefreshToken } = generateTokens({
        email,
        user_id: id.toString(),
        role,
      });

      const response = {
        message: "Вход выполнен успешно",
        AccessToken,
      };

      successWithCookie(res, RefreshToken, response);
    });
  }
}

export default new Controllers();
