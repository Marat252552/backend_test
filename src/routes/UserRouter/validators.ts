import { NextFunction, Response } from "express";
import { updateUserReq_T } from "./utils/types";
import errorsHandler from "../../shared/controllerWrapper";
import getPathToOperativeFolder from "./utils/getPathToOperativeFolder";
import { v4 } from "uuid";
import { badRequest } from "../../shared/responses";
import clearEmptyQueries from "./utils/helpers";

const TEN_MEGABYTES = 10000000;

export const updateUserValidation = async (
  req: updateUserReq_T,
  res: Response,
  next: NextFunction
) => {
  errorsHandler(res, async () => {
    const { email, fullname, name, sex } = req.body;
    const options = clearEmptyQueries({ email, fullname, name, sex });

    const image = req.files?.image;

    if (!Object.values(options).length && !image)
      return badRequest(res, "Укажите допустимые поля для изменений");

    if (sex !== "female" && sex !== "male" && sex)
      return badRequest(res, "Неверно указан пол");

    if (image) {
      if (image.size > TEN_MEGABYTES) {
        return badRequest(res, "Размер файла не может быть больше 10 Мбайт");
      }

      if (image.mimetype.split("/")[0] !== "image") {
        return badRequest(res, "Поддерживаются только изображения");
      }
      const image_name = v4() + "." + image.mimetype.split("/")[1];

      image.mv(getPathToOperativeFolder() + image_name);
      res.locals.image_name = image_name;
    }
    next();
  });
};
