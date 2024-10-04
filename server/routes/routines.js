//routes/routines.js

import express from "express";
import {
    createRoutine,
    deleteRoutine,
    getRoutines, getTemplate,
    updateRoutine,
} from "../controllers/routine.js";

const router = express.Router();

router.post("/", createRoutine);
router.put("/:id", updateRoutine);
router.delete("/:id", deleteRoutine);
router.get("/:userId", getRoutines);
router.post("/template/getTemplate", getTemplate);

export default router;
