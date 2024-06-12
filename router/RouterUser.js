import express from "express";
import * as UserController from '../controllers/ContrUser.js'

const router = express.Router();


router.post("/api/user/login", UserController.loginUser);
router.post("/api/user/register", UserController.registerUser);
router.post("/api/user/logout", UserController.logoutUser);

router.post("/api/user/create", UserController.createUser);
router.get("/api/user/get", UserController.getUser);
router.get("/api/user/:id", UserController.getOneUser);
router.put("/api/user/:id", UserController.updateUser);
router.delete("/api/user/:id", UserController.deleteUser);


export { router };