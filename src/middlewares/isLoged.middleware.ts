import { NextFunction, Request, Response } from "express";
import userListService from "../services/users/userList.service";
import { AppError, handleError } from "../errors/appError";
import jwt from "jsonwebtoken";

export const isLoged = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await userListService();
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new AppError(401, "No token found");
    }

    jwt.verify(
      token as string,
      process.env.SECRET_KEY as string,
      (err: any, decoded: any) => {
        if (err) {
          throw new AppError(401, "invalid Token");
        }
        const userEmail = decoded.email;
        const valid = users.find((user) => user.email === userEmail);
        if (!valid) {
          throw new AppError(403, "You do not have permission");
        }
      }
    );
    next();
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    }
  }
};
