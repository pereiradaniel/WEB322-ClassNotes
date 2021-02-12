const path = require("path");
const exp = require("express");
const app = exp();

const multer = require("multer");
// const uploadImg = multer({dest: "./public/photos"});


const storage = multer.diskStorage({
    destination: "./public/photos",
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const uploadImg = multer({storage: storage});

app.use(exp.static('public'));

const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
    res.send("<a href='/sign-up'> Sign up page</a>");
});

app.get("/sign-up", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/userregister.html"));
});

const imgFiles = uploadImg.fields([
    {name: "profile_img1", maxount: 1},
    {name: "profile_img2", maxcount: 5},
    {name: "profile_img3", maxcount: 1}
]);

app.post("/user-register", imgFiles, (req, res) => {
    console.log("User name: " + req.body.username);
    
    for (var i = 0; i < req.files["profile_img1"].length; i++) {
        console.log("File name: " + req.files["profile_img1"][i].filename);
    }
    
    for (var i = 0; i < req.files["profile_img2"].length; i++) {
        console.log("File name: " + req.files["profile_img2"][i].filename);
    }
    
    
    for (var i = 0; i < req.files["profile_img3"].length; i++) {
        console.log("File name: " + req.files["profile_img3"][i].filename);
    }

    res.end();
});

app.listen(port);