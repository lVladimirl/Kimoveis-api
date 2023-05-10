import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import categoriesCreateService from "../../services/categories/categoriesCreate.service";


const categoriesCreateController = async (req: Request, res: Response) => {
  try {
    const categories = await categoriesCreateService(req.body);

    return res.status(201).json(categories);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    }
  }
};

export default categoriesCreateController;
