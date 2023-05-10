import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import { IUserLogin } from "../../interfaces/users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const loginCreateService = async ({ email, password }: IUserLogin) => {
    const userRepository = AppDataSource.getRepository(User) 
    const users = await userRepository.find()
    const account = users.find(user => user.email === email && user.isActive===true)
    if (!account) {
        throw new AppError(404, "Account not found")
    }

    if(!bcrypt.compareSync(password, account.password)){
        throw new AppError(403, "Invalid credentials")
    } 

    const token = jwt.sign( {email: email}, String(process.env.SECRET_KEY), {expiresIn: '1d'} )

    return token
};
export default loginCreateService;
