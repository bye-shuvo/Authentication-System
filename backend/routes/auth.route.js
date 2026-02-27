import express from 'express';

const router = express.Router();

router.post("/signup" , (req, res) => {
    res.send("Signup successful");
});

router.post("/login" , (req, res) => {
    res.send("Login successful");
});

router.post("/logout" , (req, res) => {
    res.send("Logout successful");
});

export default router;