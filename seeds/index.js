const { Post, Comment, User } = require('../models');


const sequelize = require('../config/connection');

const seedPostData = require('./postSeedData.json');
const seedCommentData = require('./commentSeedData.json');
const seedUserData = require('./userSeedData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(seedUserData);

  const posts = await Post.bulkCreate(seedPostData);

  for (comment of seedCommentData) {
    const newComment = await Comment.create({
      ...comment,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();