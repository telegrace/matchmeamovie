const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
const csrf = require("csurf");
const path = require("path");
const db = require("./utils/db");
const authRoutes = require("./auth_routes");
const editRoutes = require("./edit_routes");
const themoviedb = require("./themoviedb");

////////////////////////////////////////
/////socket.io boilerplate cookies//////
////////////////////////////////////////

const server = require("http").Server(app);
const io = require("socket.io")(server, {
    allowRequest: (req, callback) =>
        callback(null, req.headers.referer.startsWith("http://localhost:3000")),
});

app.use(compression());
app.use(express.static(path.join(__dirname, "..", "client", "public")));

let { secret } = require("./config/cookiesecret.json");

const cookieSessionMiddleware = cookieSession({
    secret: secret,
    maxAge: 1000 * 60 * 60 * 24 * 90,
});

app.use(cookieSessionMiddleware);
io.use(function (socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(csrf());
app.use(function (req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

app.use(authRoutes.router);

///////////////////////////////
/////Logged Out in experience//
///////////////////////////////

app.get("/welcome", (req, res) => {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        // send back HTML, which will then trigger start.js to render Welcome in DOM
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

app.get("/logout", (req, res) => {
    console.log("Get /logout");
    req.session = null;
    res.redirect("/");
});

///////////////////////////////
/////Logged in experience//////
///////////////////////////////

app.use(editRoutes.router);

/////////////////////
/////themoviedb//////
/////////////////////

app.use(themoviedb.router);

///////////////////////
/////Find Friends//////
///////////////////////

app.get("/api/user", (req, res) => {
    db.getUser(req.session.userId).then(({ rows }) => {
        // console.log("GRACE", rows);
        res.json({
            user: rows[0],
            success: true,
        });
    });
});

/////////////////////////OTHER PROFILES BELOW/////////////////////////

//user types user/12 in url AND THAT triggers the axios get
app.get("/api/user/:id", (req, res) => {
    if (req.params.id == req.session.userId) {
        res.redirect("/");
        return;
    }
    db.getUser(req.params.id).then(({ rows }) => {
        if (rows.length == 0) {
            res.redirect("/");
            return;
        }
        res.json({
            user: rows[0],
            success: true,
        });
    });
});

app.get("/users/most-recent", (req, res) => {
    db.newestUsers().then(({ rows }) => {
        res.json({
            user: rows,
            success: true,
        });
    });
});

app.get("/find-user/:search", (req, res) => {
    db.findUsers(req.params.search).then(({ rows }) => {
        res.json({
            user: rows,
            success: true,
        });
    });
});

/////////////////////////OTHER PROFILES ABOVE///////////////////////

/////////////////////////FRIENDSHIPS BELOW///////////////////////////////
// if db.getfriendshipStatus is length zero, sender can make a request
// sender can send a request creates a row and accept is default false
// if accept is false sender can cancel, which will delete the row db.deleteFriendship status
// if accept it false reciever can accept which will db.acceptFriendRequest or deny which will db.deleteFriendship status
// if db.getfriendshipStatus accepted is true both sides can db.deleteFriendship

app.get("/api/friendship-status/:id", (req, res) => {
    db.getFriendshipStatus(req.session.userId, req.params.id).then(
        ({ rows }) => {
            console.log("Grace", rows);
            if (!rows.length) {
                console.log("Sender can make a request");
                res.send("SEND REQUEST");
            } else if (!rows[0].accepted) {
                if (req.session.userId == rows[0].sender_id) {
                    res.send("CANCEL REQUEST");
                } else {
                    res.send("ACCEPT REQUEST");
                }
            } else {
                res.send("UNFRIEND");
            }
        }
    );
});

app.post("/friend-button/:id", (req, res) => {
    if ("SEND REQUEST" in req.body) {
        //create a row in the db
        db.sendFriendRequest(req.session.userId, req.params.id).then(
            ({ rows }) => {
                console.log(rows);
                res.send("CANCEL REQUEST");
            }
        );
    } else if ("CANCEL REQUEST" in req.body) {
        db.deleteFriendshipStatus(req.session.userId, req.params.id).then(
            ({ rows }) => {
                console.log(rows);
                res.send("SEND REQUEST");
            }
        );
    } else if ("ACCEPT REQUEST" in req.body) {
        db.acceptFriendRequest(req.session.userId, req.params.id).then(
            ({ rows }) => {
                console.log(rows);
                res.send("UNFRIEND");
            }
        );
    } else {
        db.deleteFriendshipStatus(req.session.userId, req.params.id).then(
            ({ rows }) => {
                console.log(rows);
                res.send("SEND REQUEST");
            }
        );
    }
});

/////////////////////////FRIENDSHIPS ABOVE///////////////////////////////

//////////////////////////FRIENDLIST BELOW//////////////////////

// add three routes, get-friends, accept-friend, unfriend

app.get("/api/get-friendslist", (req, res) => {
    db.getFriendsList(req.session.userId).then(({ rows }) => {
        res.json({
            user: rows,
            success: true,
        });
    });
});

app.post("/accept-request/:id", (req, res) => {
    db.acceptFriendRequest(req.session.userId, req.params.id).then(
        ({ rows }) => {
            console.log("GRACE POST /accept-friend", rows);
            res.json({
                user: rows,
                success: true,
            });
        }
    );
});

app.post("/unfriend/:id", (req, res) => {
    console.log("POST /unfriend");
    db.deleteFriendshipStatus(req.session.userId, req.params.id).then(
        ({ rows }) => {
            console.log("GRACE POST /accept-friend", rows);
            res.json({
                user: rows,
                success: true,
            });
        }
    );
});

///////////////////////DON'T MOVE BEL0W////////////////
app.get("*", function (req, res) {
    //we need to see
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        // console.log("app.get*", req.session.userId);
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

server.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening :) ...");
});

//NOTES
//socket is an obj and represents the connection between client and server, has unique iq
//all of socket code needs to be inside and on the client's side too!
//pair socket id to user id

let onlineUsers = {};

io.on("connection", (socket) => {
    if (!socket.request.session.userId) {
        return socket.disconnect(true);
    }
    const userId = socket.request.session.userId;
    console.log("CONNECTED userId", userId);

    //give's chat messages from db to the client (emit)
    db.getLastTenMessages().then(({ rows }) => {
        const msgs = rows.reverse();
        //console.log("Emiting", msgs);
        socket.emit("chatMessages", msgs);
    });
    onlineUsers[socket.id] = userId;

    //needs to listen for chatMessage (new message) and then emit it

    socket.on("chatMessage", function (msg) {
        // console.log("data inside server chat message", msg);
        db.postMessage(userId, msg).then(
            db.getLastTenMessages().then(({ rows }) => {
                const msgs = rows.reverse();
                socket.emit("chatMessages", msgs);
            })
        );
    });

    socket.on("disconnect", function () {
        console.log("DISCONNECTED userId", userId);
        delete onlineUsers[socket.id];
    });
});

//BONUS FEATURES ABOUT WHO'S ONLINE IN SPICED NOTES
/* 
USER CONNECTS 
    // new person needs to get message whos online
    // everybody else know who the new person is
    //check if the key repeats itself
   


USERS DISCONNECTS
    //remove the person from online, deletes the key and value
    delete onlineUsers[socket.id];
    //need to emit messages so that online users know
    //only when ALL tabs are closed so check in the array if their user id no longer appears in the array
});
*/
