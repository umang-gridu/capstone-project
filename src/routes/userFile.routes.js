import { Router } from "express";
import { userFile } from "../controllers/userFile.controller.js";

const router = Router();

router.get("/", userFile);

export default router;
