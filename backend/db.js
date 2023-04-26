const mongoose = require('mongoose');

module.exports = async () => {
  try {
    const optionsParams = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    await mongoose.connect(
      'mongodb://127.0.0.1:27017/todo-app',
      optionsParams
    );
    console.log("Connected to database!");
  } catch (error) {
    throw new Error('Something went wrong... ', error);
  }
};