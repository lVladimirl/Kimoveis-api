import { Router } from "express";
import loginController from "../../controllers/login/loginCreate.controller";

const loginRoutes = Router();

loginRoutes.post("", loginController);

export default loginRoutes;
