import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import { IUserRequest } from "../../interfaces/users";

const bcrypt = require('bcrypt');

const userCreateService = async ({
  name,
  email,
  password,
  isAdm,
}: IUserRequest) => {
  const userRepository = AppDataSource.getRepository(User);

  const userAlredyExists = await userRepository.findOne({
    where: { email },
  });

  if (userAlredyExists) {
    throw new AppError(409, "email alredy registered");
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = new User();
  user.name = name;
  user.email = email;
  user.password = hash;
  user.isAdm = isAdm;
  user.isActive = true
  user.createdAt = Date();
  user.updatedAt = Date();

  userRepository.create(user);
  await userRepository.save(user);
  return user;
};

export default userCreateService;
