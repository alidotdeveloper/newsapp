const express = require("express");
const post = require("../controllers/post-controller");
const router = express.Router();
const upload = require("../utilities/multer");
const verifyUser = require("../middleware/Verify-user");

//routes
router.post("/post/add", verifyUser,  upload.single("postImage"), post.addPost);
router.post("/contact",  post.Contact);
router.delete("/post/:id", verifyUser, post.deletePost);
router.put("/post/:id", verifyUser, upload.single("postImage"), post.editPost);
router.get('/all', post.getallposts);
router.post('/favourite', verifyUser,  post.favouritePost);
router.get('/favourite/:id', verifyUser,  post.getfavouritePost);
router.post('/post/serach', post.SearchPost);
router.get('/post/:id', post.postById);
router.get('/post/id/:id',  post.SinglePost);
router.delete("/admin/:id", post.adminPostDelete);
router.delete("/favourite/:id", post.deleteFavourite);


module.exports = router;
