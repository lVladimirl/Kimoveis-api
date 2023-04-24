import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import userDeleteService from "../../services/users/userDelete.service";

const userDeleteController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await userDeleteService({id})

    if (user) {
      const { password, ...sendUser } = user;
      return res.status(204).json(sendUser);
    }
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    }
  }
};

export default userDeleteController;
