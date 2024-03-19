import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { TaskSchema } from "../schemas/task.schema.js";

import {
    createTask,
    getAllTasks,
    getTask,
    updateTask,
    deleteTask,
} from "../controllers/tasks.controller.js";

const router = Router();

router.post("/tasks", authRequired, validateSchema(TaskSchema), createTask);

router.get("/tasks", authRequired, getAllTasks);

router.get("/tasks/:id", authRequired, getTask);

router.put("/tasks/:id", authRequired, updateTask);

router.delete("/tasks/:id", authRequired, deleteTask);

export default router;
