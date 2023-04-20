import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError, handleError } from "../errors/appError";
import userListService from "../services/users/userList.service";

export const isAdmOrOwner = async (
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
          throw new AppError(401, "Invalid Token");
        }
        const userEmail = decoded.email;
        const isAdmOrOwner = users.find(
          (user) => user.email === userEmail && user.isAdm === true || user.email === userEmail && user.id === req.params.id
        );
        if (!isAdmOrOwner) {
          throw new AppError(401, "You do not have permission");
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
