import express from 'express';

const router = express.Router();

router.post("/signup" , (req, res) => {
    res.send("Signup successful");
});

export default router;