import { Router } from "express";

import {
    Register,
    Login,
    Logout,
    Profile,
} from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

import { validateSchema } from "../middlewares/validator.middleware.js";
import { RegisterSchema, LoginSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post("/register", validateSchema(RegisterSchema), Register);

router.post("/login", validateSchema(LoginSchema), Login);

router.post("/logout", Logout);

router.get("/profile", authRequired, Profile);

export default router;
