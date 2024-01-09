import { Request, Response } from "express";
import { getUsersReq_T, updateUserReq_T, updateUserRes_T } from "./utils/types";
import { getUserById, getUsers, updateUserById } from "../../database/queries";
import { clearEmptyQueries } from "./utils/helpers";
import errorsHandler from "../../shared/controllerWrapper";
import { created, success } from "../../shared/responses";

class Controllers {
  async updateUser(req: updateUserReq_T, res: updateUserRes_T) {
    errorsHandler(res, async () => {
      const { user_id } = res.locals.TokenPayload;
      const { image_name } = res.locals;
      const { email, fullname, name, sex } = req.body;

      const options = { email, fullname, name, sex };
      const user = await updateUserById(
        user_id,
        clearEmptyQueries({ ...options, image_name })
      );

      created(res, "Пользователь успешно обновлен", { user });
    });
  }
  async getUser(req: Request, res: Response) {
    errorsHandler(res, async () => {
      const { user_id } = res.locals.TokenPayload;

      const user = await getUserById(user_id);
      let image_url: string | undefined;
      if (user.image_name) {
        image_url =
          req.protocol + "://" + req.get("host") + "/" + user.image_name;
      }

      success(res, {
        user: {
          ...user,
          image_url,
        },
      });
    });
  }
  async getUsers(req: getUsersReq_T, res: Response) {
    errorsHandler(res, async () => {
      const { page = 1 } = req.query;

      const users = await getUsers({ offset: (page - 1) * 10 });

      success(res, { users });
    });
  }
}

export default new Controllers();
