import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import userPatchService from "../../services/users/userPatch.service";

const userPatchController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, password} = req.body

    const user = await userPatchService({id, name, email, password});

    if(user){
      const { password, ...sendUser } = user;
      return res.status(201).json(sendUser);
    }
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    }
  }
};

export default userPatchController;
