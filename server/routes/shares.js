import express from "express";

import{
    viewSharedRoutine,
    shareRoutine
} from "../controllers/share.js";

const router = express.Router();

//invalidate cache
router.use((req, res, next) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    next();
});

router.get("/routines/:link", viewSharedRoutine);
router.post("/routines/:id", shareRoutine);

export default router;