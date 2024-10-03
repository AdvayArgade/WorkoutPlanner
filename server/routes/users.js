//routes/users.js

import express from "express";
import {
    deleteUser, findUserByName,
    getUser,
    getUsers, insertUser,
    updateUser,
} from "../controllers/user.js";

const router = express.Router();

router.post("/:id", insertUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/id/:id", getUser);
router.get("/", getUsers);
router.get("/name/:name", findUserByName);

export default router;
