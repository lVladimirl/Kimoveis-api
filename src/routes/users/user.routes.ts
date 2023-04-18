import { Router } from "express";
import userCreateController from "../../controllers/users/userCreate.controller";
import { isLoged } from "../../middlewares/isLoged.middleware";
import { isAdm } from "../../middlewares/isAdm.middleware";
import userListController from "../../controllers/users/userList.controller";
import userPatchController from "../../controllers/users/userPatch.controller";

const userRoutes = Router();

userRoutes.post("", userCreateController);
userRoutes.get("", isLoged, isAdm, userListController);
userRoutes.patch("/:id", isLoged, userPatchController);

export default userRoutes;
