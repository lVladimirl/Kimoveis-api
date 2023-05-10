import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import { IUserDelete } from "../../interfaces/users";


const userDeleteService = async ({ id }: IUserDelete) => {
  const userRepository = AppDataSource.getRepository(User);

  const account = await userRepository.findOne({
    where: { id },
  });

  if (!account) {
    throw new AppError(404, "account does not exist");
  }

  if(account.isActive==false){
    throw new AppError(400, "This user is not active");

  }
  const userUpdater = {
    ...account,
    ...{ isActive: false },
  };

  await userRepository.save(userUpdater);

  return userUpdater;
};

export default userDeleteService;
