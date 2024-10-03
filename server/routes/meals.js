//routes/meals.js

import express from "express";
import {
    createMeal,
    deleteMeal,
    getMeals,
    updateMeal,
} from "../controllers/meal.js";

const router = express.Router();

router.post("/", createMeal);
router.put("/:id", updateMeal);
router.delete("/:id", deleteMeal);
router.get("/:userId", getMeals);

export default router;
