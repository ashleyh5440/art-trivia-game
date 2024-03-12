const db = require('../config/connection');
const { User, Score } = require('../models');
const userSeeds = require('./userSeeds.json');
const scoreSeeds = require('./scoreSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    await cleanDB('Score', 'scores');

    await cleanDB('User', 'users');

    await User.create(userSeeds);
    console.log('Users seeded');

    for (let i = 0; i < scoreSeeds.length; i++) {
      const scoreSeed = scoreSeeds[i];
      const user = await User.findOne({ username: scoreSeed.username });
      if (user) {
        const score = await Score.create({ ...scoreSeed, user: user._id });
        const updatedUser = await User.findByIdAndUpdate(user._id, {$push: {scores: score._id}} )
        console.log(`Score created for user: ${user.username} with ID ${score._id}`);
      } else {
        console.log(`User not found for score: ${scoreSeed.username}`);
      }
    }
    
    console.log('Scores seeded');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
