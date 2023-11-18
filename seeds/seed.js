const sequelize = require('../config/connection');
const { User, BlogPost } = require('../models');

const userData = require('./userData');
const blogPostData = require('./blogPostData');

const seedDatabase = async () => {
    console.log('----- SEEDING DATABASE STARTED -----\n');

    await sequelize.sync({ force: true });
    console.log('----- DATABASE SYNCED -----\n');

    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });
    console.log(`----- ${users.length} USERS SEEDED -----\n`);
  
    for (const blog of blogPostData) {
      await BlogPost.create({
        ...blog,
        user_id: users[Math.floor(Math.random() * users.length)].id,
      });
    }
    console.log(`----- ${blogPostData.length} BLOG POSTS SEEDED -----\n`);
  
    console.log('----- SEEDING DATABASE COMPLETED -----\n');
    process.exit(0);
};

seedDatabase();