import { NextFunction, Response } from "express";
import { doesUserExist, getUserByEmail } from "../../database/queries";
import { loginReq_T, signinReq_T } from "./utils/types";
import errorsHandler from "../../shared/controllerWrapper";
import { compareSync } from "bcrypt";
import { badRequest } from "../../shared/responses";

const isEmailFormat = (str: string) => {
  const regexExp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;

  return regexExp.test(str);
};

const checkPassword = (str: string) => {
  var re =
    /^(?=.*[a-zà-ÿ])(?=.*[A-ZÀ-ß])(?=.*\d)(?=.*[!@#$])[a-zà-ÿA-ZÀ-ß\d!@#$]{8,12}$/gm;
  return re.test(str);
};

export const signinValidation = async (
  req: signinReq_T,
  res: Response,
  next: NextFunction
) => {
  errorsHandler(res, async () => {
    const { email, password, name } = req.body;
    if (!email || !password || !name)
      return badRequest(res, "Заполнены не все поля");

    const isEmailTaken = await doesUserExist(email);
    if (isEmailTaken) return badRequest(res, "Почта уже зарегистрирована");

    if (!isEmailFormat(email) && email !== "admin")
      return badRequest(res, "Неверный формат почты");

    if (!checkPassword(password) || password.length < 5)
      return badRequest(
        res,
        "Пароль должен быть минимум 5 символов, содержать минимум 1 заглавный символ, 1 специальный символ и 1 цифру. Все в латинице "
      );

    res.locals = { ...res.locals, email, password, name };
    next();
  });
};

export const loginValidation = async (
  req: loginReq_T,
  res: Response,
  next: NextFunction
) => {
  errorsHandler(res, async () => {
    const { email, password } = req.body;
    if (!email || !password) return badRequest(res, "Заполнены не все поля");

    if (!isEmailFormat(email) && email !== "admin")
      return badRequest(res, "Неверный формат почты");

    const isEmailTaken = await doesUserExist(email);
    if (!isEmailTaken)
      return badRequest(
        res,
        "Пользователь с указанной почтой не зарегистрирован"
      );

    const user = await getUserByEmail(email);
    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) return badRequest(res, "Неверный пароль");
    res.locals.user = user;
    next();
  });
};
