const { user, post, favourites } = require("../db/Models/model");

const uploadImageToCloudinary = require("../middleware/cloudinary");
const nodemailer = require("nodemailer");
const { Op, Error } = require("sequelize");

//get all posts
const getallposts = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const total = (await post.findAll()).length;

  const pages = Math.ceil(total / limit);

  const allPosts = await post.findAll({
    offset: skip,
    limit: limit,
  });
  if (!allPosts) {
    return res.status(400).json({ message: "error while fecthing " });
  }

  return res
    .status(200)
    .json({ message: "successfully get all posts", allPosts, pages });
};

//add post
const addPost = async (req, res) => {
  const { title, description, userId } = req.body;

  console.log(title, description, userId);
  const file = req.file;

  console.log(file);
  if (!title || !description) {
    return res.status(400).json({ message: "fields are required" });
  }
  const imageURL = await uploadImageToCloudinary(file.path);

  const addPost = await post.create({
    title: title,
    description: description,
    userId: userId,
    image: imageURL,
    favouriteItem: false,
  });
  console.log(addPost);
  return res.status(200).json({ message: "post created successully", addPost });
};

//delete
const deletePost = async (req, res) => {
  const postId = req.params;

  const postExist = await post.findOne(postId);
  console.log(postExist);
  if (!postExist) {
    return res.status(400).json({ message: "post not found" });
  }

  const deletePost = await post.destroy({
    where: {
      id: postId.id,
    },
  });
  if (!deletePost) {
    return res.status(400).json({ message: "error while deleting" });
  }
  return res.status(200).json({ message: "deleted successfully" });
};

//edit

const editPost = async (req, res) => {
  const postId = req.params;
  const { title, description } = req.body;
  const file = req.file;
  console.log("iamge here", file);

  const postExist = await post.findOne(postId);
  if (!postExist) {
    return res.status(400).json({ message: "post not found" });
  }

  let imageURL = postExist.image;
  if (file) {
    imageURL = await uploadImageToCloudinary(file.path);
    console.log(imageURL);
  }
  console.log(imageURL);
  const updatePost = await post.update(
    {
      title: title,
      description: description,
      image: imageURL,
    },
    {
      where: {
        id: postId.id,
      },
    }
  );

  return res.status(200).json({ message: "update successfully", updatePost });
};

const postById = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  const userInfo = await user.findByPk(id, {
    include: post,
  });

  if (!userInfo) {
    return res.status(401).json({ message: "erro while getting post" });
  }
  return res
    .status(200)
    .json({ message: "post fecthed successfully", userInfo });
};

//post
const SinglePost = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  const findPost = await post.findOne({
    where: {
      id: id
    }
  })
  
  if (!findPost) {
    return res.status(401).json({ message: "erro while getting post" });
  }
  return res
    .status(200)
    .json({ message: "post fecthed successfully", findPost });
};

//admin delete
const adminPostDelete = async (req, res) => {
  const { id } = req.params;

  const deletePost = await post.destroy({
    where: {
      id: id,
    },
  });

  if (!deletePost) {
    return res.status(401).json({ message: "error while deleting" });
  }
  return res.status(200).json({ message: "deleted succeessfully" });
};

// favourite post

const favouritePost = async (req, res) => {
  const data = req.body;
  console.log(data);

  const favItem = await favourites.create({
    userId: data.user,
    favId: data.postId,
  });
  if (favItem) {
    await post.update(
      { favouriteItem: true },
      {
        where: {
          id: data.postId,
        },
      }
    );
  }

  if (!favItem) {
    return res.status(401).json({ message: "error while deleting" });
  }
  return res.status(200).json({ message: "add succeessfully" });
};

// get favourite
const getfavouritePost = async (req, res) => {
  try {
    const { id } = req.params;
    const favouriteList = await favourites.findAll({
      where: {
        userId: id,
      },
    });

    const favId = favouriteList.map((f) => f.favId);
    const getPosts = await post.findAll({
      where: {
        id: favId,
      },
    });

    if (!getPosts) {
      return res.status(404).json({ message: "posts not found" });
    }

    return res
      .status(200)
      .json({ message: "Favorites retrieved successfully", getPosts });
  } catch (error) {
    console.error("Error retrieving favorites:", error);
    return res
      .status(500)
      .json({ message: "Error retrieving favorites", error });
  }
};

//delete favourite

const deleteFavourite = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    if (!id) {
      return res.status(404).json({ message: "id not found" });
    }

    const removeFav = await favourites.destroy({
      where: {
        favId: id,
      },
    });
    if (removeFav === 0) {
      return res
        .status(400)
        .json({ message: "No favourite item found to delete" });
    }

    await post.update(
      { favouriteItem: false },
      {
        where: {
          id: id,
        },
      }
    );
    return res.status(200).json({ message: " deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "internal server error", error });
  }
};

//search post
const SearchPost = async (req, res) => {
  const title = req.query.title;
  if (!title) {
    return res.status(400).json({ message: "title required" });
  }
  const posts = await post.findAll({
    where: {
      title: {
        [Op.like]: `%${title}%`,
      },
    },
  });

  if (posts) {
    return res.status(200).json({ message: "results here", posts });
  }
  return res.status(400).json({ message: "results not here" });
};

// contact
const Contact = (req, res) => {
  const { email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "ali.hassnain.atrule@gmail.com",
      pass: "zlsjmtymmztwcdsd",
    },
  });

  const mailOptions = {
    from: email,
    to: "ali.hassnain.atrule@gmail.com",
    subject: `Contact form submission`,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json({ message: "Message sent successfully!" });
  });
};

module.exports = {
  SinglePost,
  addPost,
  deletePost,
  editPost,
  adminPostDelete,
  getallposts,
  postById,
  Contact,
  favouritePost,
  SearchPost,
  getfavouritePost,
  deleteFavourite,
};
