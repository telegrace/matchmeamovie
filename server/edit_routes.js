const express = require("express");
const router = express.Router();
const db = require("./utils/db");
const path = require("path");
const multer = require("multer");
const uidSafe = require("uid-safe");
const s3 = require("./utils/s3");

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
});

router.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    const userId = req.session.userId;
    // const { filename } = req.file;
    if (req.file) {
        //check if user has profile_pic
        db.hasProfilePic(userId).then(({ rows }) => {
            if (rows[0].profile_pic !== null) {
                s3.delete(rows[0].profile_pic);
            }
            db.updateProfilePic(req.session.userId, req.file.filename).then(
                function (dbResponse) {
                    let { rows } = dbResponse;
                    res.json({
                        image: rows[0].profile_pic,
                        success: true,
                    });
                }
            );
        });
    } else {
        res.json({
            success: false,
        });
    }
});

router.post("/savebio", (req, res) => {
    //need to get the bio
    console.log("POST /savebio req.body", req.body.bioDraft);
    db.updateBio(req.session.userId, req.body.bioDraft).then(({ rows }) => {
        console.log(rows[0].bio_info);
        res.json({
            bio: rows[0].bio_info,
            success: true,
        });
    });
});
exports.router = router;
