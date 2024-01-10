import { Router } from "express";
import { exercises } from "../controllers/exercises.controller.js";
import { getUser } from "../controllers/getUser.controller.js";
import { logs } from "../controllers/logs.controller.js";
import { user } from "../controllers/user.controller.js";

const router = Router();

router.post("/", user);
router.get("/", getUser);
router.post("/:_id/exercises", exercises);
router.get("/:_id/logs", logs);

export default router;
