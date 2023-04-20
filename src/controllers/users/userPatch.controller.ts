import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import userPatchService from "../../services/users/userPatch.service";

const userPatchController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { name, email, password, isAdm, isActive, id} = req.body;

    if ( isAdm == false || isAdm == true || isActive == true || isActive == false || id ) {
      return res.status(401).json({ message: "invalid input" });
    }

    const user = await userPatchService({ userId, name, email, password });

    if (user) {
      const { password, ...sendUser } = user;
      return res.status(200).json(sendUser);
    }
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    }
  }
};

export default userPatchController;
