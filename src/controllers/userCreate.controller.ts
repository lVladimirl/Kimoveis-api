import { Request, Response } from "express";
import { AppError, handleError } from "../errors/appError";
import userCreateService from "../services/users/userCreate.service";

const userCreateController = async (req: Request, res: Response) => {
  try {
    const user = await userCreateService(req.body);

    const { password, ...sendUser } = user;
    return res.status(201).json(sendUser);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    }
  }
};

export default userCreateController;
