//controllers/meal.js

import Meal from "../models/Meal.js"
import User from "../models/User.js"

export const createMeal = async (req, res, next) => {

    const newMeal = new Meal(req.body);
    try {
        const savedMeal = await newMeal.save();

        try {
            const user = await User.findById(savedMeal.author);
            user.meals.push(savedMeal._id);
            await user.save();
        }
        catch (err) {
            next(err)
        }
        res.status(200).json(savedMeal);
    } catch (err) {
        next(err);
    }
};

export const updateMeal = async (req, res, next) => {
    try {
        const meal = await Meal.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(meal);
    } catch (err) {
        next(err);
    }
};

export const deleteMeal = async (req, res, next) => {
    try {
        await Meal.findByIdAndDelete(req.params.id);
        res.status(200).json("the Meal has been deleted");
    } catch (err) {
        next(err);
    }
};



export const getMeals = async (req, res, next) => {
    const userId = req.params.userId;

    try {
        const meals = await Meal.find({ author: userId });
        res.status(200).json(meals);
    } catch (err) {
        next(err)
    }
}
