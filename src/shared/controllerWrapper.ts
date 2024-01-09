import { Response } from "express";

const errorsHandler = (res: Response, func: () => Promise<any>) => {
  func().catch((e) => {
    console.log(e);
    res.sendStatus(500).end();
  });
};

export default errorsHandler;
