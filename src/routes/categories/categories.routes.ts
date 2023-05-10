import { Router } from "express";
import userCreateController from "../../controllers/users/userCreate.controller";
import { isLoged } from "../../middlewares/isLoged.middleware";
import { isAdm } from "../../middlewares/isAdm.middleware";
import userListController from "../../controllers/users/userList.controller";
import userPatchController from "../../controllers/users/userPatch.controller";
import { isAdmOrOwner } from "../../middlewares/isAdmOrOwner.middleware";
import userDeleteController from "../../controllers/users/userDelete.controller";
import categoriesCreateController from "../../controllers/categories/categoriesCreate.controller";

const categoriesRoutes = Router();

categoriesRoutes.post("", isAdm, categoriesCreateController);

export default categoriesRoutes;
