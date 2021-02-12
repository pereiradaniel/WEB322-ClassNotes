const path = require("path");
const exp = require("express");
const app = exp();

const multer = require("multer");
const uploadImg = multer({dest: "./public/photos"});


// const storage = multer.diskStorage({
//     destination: "./public/photos",
//     filename: function(req, file, cb) {
//         cb(null, Date.now() + path.extname(file.originalname));
//     }
// });
// const uploadImg = multer({storage: storage});

app.use(exp.static('public'));

const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
    res.send("<a href='/sign-up'> Sign up page</a>");
});

app.get("/sign-up", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/userregister.html"));
});

app.post("/user-register", uploadImg.single("profile_img"), (req, res) => {
    console.log("User name: " + req.body.username);
    console.log("File name: " + req.file.filename);
});

app.listen(port);