import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import loginCreateService from "../../services/login/loginCreate.service";

const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const token = await loginCreateService({ email, password });

    return res.status(201).json({ token });
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    }
  }
};

export default loginController;
