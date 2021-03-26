const express = require("express");
const router = express.Router();
const db = require("./utils/db");
const bcrypt = require("bcryptjs");
const { sendEmail } = require("./utils/ses");
const cryptoRandomString = require("crypto-random-string");

router.post("/registration", (req, res) => {
    //console.log("post /registration");
    const { name, surname, email, password } = req.body;
    let complete = true;
    Object.values(req.body).forEach((val) => {
        if (val.length === 0) {
            complete = false;
        }
    });
    if (complete) {
        var password_hash = bcrypt.hashSync(password, 10);
        db.registerUser(name, surname, email, password_hash)
            .then(({ rows }) => {
                req.session.userId = rows[0].id;
                res.json({
                    success: true,
                });
            })
            .catch((error) => {
                //console.log("Error with db.registerUser:", error);
                res.json({
                    success: false,
                });
            });
    } else {
        //console.log("Not fully filled in");
        res.json({
            success: false,
        });
    }
});

router.post("/login", (req, res) => {
    //console.log("post /login", req.body);
    const { email, password } = req.body;
    let complete = true;
    Object.values(req.body).forEach((val) => {
        if (val.length === 0) {
            complete = false;
        }
    });
    if (complete) {
        db.loginUser(email)
            .then(({ rows }) => {
                req.session.userId = rows[0].id;
                passwordHash = rows[0].password_hash;
                bcrypt.compare(password, passwordHash);
                // no need for if/else?
                res.json({
                    success: true,
                });
            })
            .catch((error) => {
                //console.log("Error with db.loginUser:", error);
                res.json({
                    success: false,
                });
            });
    } else {
        //console.log("Not fully filled in");
        res.json({
            success: false,
        });
    }
});

router.post("/reset/start", (req, res) => {
    // console.log("post /reset/start");
    const { email } = req.body;
    //check email exists
    if (email !== "") {
        db.loginUser(email)
            .then(() => {
                const secretCode = cryptoRandomString({
                    length: 6,
                });
                //console.log(email, secretCode);
                db.insertCode(email, secretCode);
                sendEmail(email, secretCode);
                res.json({
                    success: true,
                    //step 2 you code successfully sent, please enter
                });
            })
            .catch((error) => {
                //console.log("Email not in database", error);
                res.json({
                    success: false,
                });
            });
    } else {
        //console.log("Email input is empty");
        res.json({
            success: false,
        });
    }
});

router.post("/reset/verify", (req, res) => {
    //console.log("post /reset/verify ");
    const { email, code } = req.body;
    if (code !== "") {
        db.checkCode(email)
            .then(({ rows }) => {
                //console.log("email and code", email, code);
                console.log(rows);
                if (code === rows[0].code) {
                    console.log("code matches");
                    res.json({
                        success: true,
                    });
                } else {
                    res.json({
                        success: false,
                    });
                }
            })
            .catch((error) => {
                console.log("Email not in database", error);
                res.json({
                    success: false,
                });
            });
    } else {
        //console.log("Code input is empty");
        res.json({
            success: false,
        });
    }
});

router.post("/reset/change", (req, res) => {
    //console.log("post /reset/change ");
    const { email, password } = req.body;
    if (password !== "") {
        var password_hash = bcrypt.hashSync(password, 10);
        db.updatePassword(password_hash, email).then(() => {
            res.json({
                success: true,
            });
        });
    } else {
        //console.log("Code input is empty");
        res.json({
            success: false,
        });
    }
});

exports.router = router;
