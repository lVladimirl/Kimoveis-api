import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import userListService from "../../services/users/userList.service";

const userListController = async (req: Request, res: Response) => {
  try {
    const users = await userListService();

    let usersArray = <any>[]
    users.map((elem)=>{
      const {password, ...clean} = elem
      usersArray.push(clean)
      
    })
    return res.status(200).json(usersArray);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    }
  }
};

export default userListController;
