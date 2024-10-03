//controllers/entry.js

import Entry from "../models/Entry.js"
import User from "../models/User.js"
import Routine from "../models/Routine.js"
import Meal from "../models/Meal.js"

export const createEntry = async (req, res, next) => {

    const newEntry = new Entry(req.body);
    try {
        const savedEntry = await newEntry.save();

        try {
            const user = await User.findById(savedEntry.author);
            user.entries.push(savedEntry._id);
            await user.save();
        }
        catch (err) {
            next(err)
        }
        res.status(200).json(savedEntry);
    } catch (err) {
        next(err);
    }
};

export const updateEntry = async (req, res, next) => {
    try {
        const entry = await Entry.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(entry);
    } catch (err) {
        next(err);
    }
};

export const deleteEntry = async (req, res, next) => {
    try {
        await Entry.findByIdAndDelete(req.params.id);

        try {

            await User.findOneAndUpdate(
                { entries: req.params.id }, 
                { $pull: { entries: req.params.id } },
                { new: true }
            );
        }

        catch (err) {
            next(err)
        }

        res.status(200).json("the entry has been deleted");
    } catch (err) {
        next(err);
    }
};


export const getEntries = async (req, res, next) => {
    const userId = req.params.userId;
    try {
        const entries = await Entry.find({ author: userId })
            .populate('meals', 'name')
            .populate('routines', 'name')
        res.status(200).json(entries);
    } catch (err) {
        next(err)
    }
}

export const getMealsAndRoutines = async (req, res, next) => {
    const userId = req.params.id
    let userRoutines, userMeals;
    try {
        userRoutines = await Routine.find({ author: userId }).select('name _id').exec();
    }
    catch (err) {
        next(err)
    }
    try {
        userMeals = await Meal.find({ author: userId }).select('name _id').exec();
    }
    catch (error) {
        next(err)
    }
    const result = {
        routines: userRoutines,
        meals: userMeals
    }
    res.status(200).json(result);
}
