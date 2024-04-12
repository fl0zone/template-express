import express from "express";
import * as PersonController from '../controllers/ContrPersona.js'
import * as jwsAuth from "../config/jwt.config.js"

const router = express.Router();

router.post("/api/persona/create", jwsAuth.authenticate, PersonController.createPersona);
router.get("/api/persona/get", jwsAuth.authenticate, PersonController.getPersona);
router.get("/api/persona/:id", jwsAuth.authenticate, PersonController.getOnePersona);
router.put("/api/persona/:id", jwsAuth.authenticate, PersonController.updatePersona);
router.delete("/api/persona/:id", jwsAuth.authenticate, PersonController.deletePersona);


export { router };