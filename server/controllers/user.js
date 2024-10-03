//controllers/user.js

import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const insertUser = async (req, res, next) => {
    try {
        const { username, email, password, profilePicture, routines, entries, meals } = req.body;

        // Check if a user with the same email or username already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }

        // Hash the password before saving it
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user object
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            profilePicture: profilePicture || "",  // optional
            routines: routines || [],             // optional
            entries: entries || [],               // optional
            meals: meals || []                    // optional
        });

        // Save the user to the database
        const savedUser = await newUser.save();
        return res.status(201).json(savedUser);

    } catch (error) {
        next(error);  // Pass error to the error-handling middleware
    }
};

export const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        next(err);
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted.");
    } catch (err) {
        next(err);
    }
};

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).populate('posts');

        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};

export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
};

export const findUserByName = async (req, res, next) => {
    const username = req.params.name;
    console.log("Username: ", username);
    try {
        const user = await User.findOne({username : username});
        if(user){
            return res.status(200).json(user);
        }

        return res.status(400).json({message: "Username not found!"});
    }
    catch (err){
        next(err);
    }
}