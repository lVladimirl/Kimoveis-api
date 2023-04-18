import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import { IUserUpdate } from "../../interfaces/users";

const bcrypt = require("bcrypt");

const userPatchService = async ({
  id,
  name,
  email,
  password,
}: IUserUpdate) => {

  const userRepository = AppDataSource.getRepository(User);

  const account = await userRepository.findOne({
    where: { id },
  });

  if (!account) {
    throw new AppError(409, "account does not exist");
  } else if (account.id !== id && account.isAdm == false) {
    throw new AppError(401, "You dont have permission");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const userUpdater = {
    ...account,
    ...{ name, email, hash },
  };

  await userRepository.save(userUpdater);

  const result = await userRepository.findOne({
    where: { id },
  });

    return result;
};

export default userPatchService;
