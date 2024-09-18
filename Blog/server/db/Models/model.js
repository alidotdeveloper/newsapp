const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("mysql://root:admin@localhost:3306/blog");
const user = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
const post = sequelize.define("post", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: user,
      key: "id",
    },
    allowNull: false,
  },
  favouriteItem: {
    type: DataTypes.BOOLEAN
  },
});

const favourites = sequelize.define("Favourite", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  favId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: user,
      key: "id",
    },
    allowNull: false,
  },
});

user.hasMany(post, { foreignKey: "userId" });
post.belongsTo(user, { foreignKey: "userId" });
user.hasMany(favourites, { foreignKey: "userId" });
favourites.belongsTo(user, { foreignKey: "userId" });
post.hasMany(favourites, { foreignKey: "userId" });
favourites.belongsTo(post, { foreignKey: "userId" });

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log(" table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table : ", error);
  });

module.exports = { user, post, favourites };
