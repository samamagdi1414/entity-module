const movieController = require("../controller/movie-controller");
const authenticate = require("../middleware/authentication-middleware");
const restrictTo = require("../middleware/authorization-middlleware");

const express = require("express");
const router = express.Router();
const fs= require("fs");
const path = require("path");
const multer = require("multer");

const uploadDir = path.join(__dirname,"..", "uploads", "movies");
fs.mkdirSync(uploadDir,{recursive: true});


const storage = multer.diskStorage({
   destination: function (req, file, cb) {
    const dest = "uploads/movies";
    cb(null, uploadDir);
  },
    filename: function(req, file, cb){
        const extension = file.mimetype.split("/")[1];
        const filename= `movie-${Date.now()}.${extension}`;
        cb(null,filename);
    },
});

const fileFilter = (req,file , cb)=>{
    const fileType = file.mimetype.split("/")[0];
    if (fileType === "image"){
        cb(null, true);
    }else{
        cb(new Error("Only image are allowed"),false);
    }
};

const upload = multer({storage, fileFilter});
router
.route("/")
.get(movieController.getAllMovies)
.post(authenticate, restrictTo("admin"), upload.single("imageUrl"),movieController.createMovie);

router
.route("/:id")
.get(movieController.getMovieById)
.put(authenticate, restrictTo("admin"), upload.single("imageUrl"),movieController.updateMovie)
.delete(authenticate,restrictTo("admin"), movieController.deleteMovie);

module.exports = router;