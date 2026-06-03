const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.hashPassword = async (password) => {
  return bcrypt.hash(password, 10);
};

exports.comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

exports.findUserByEmail = async (email) => {
  return User.findOne({ email });
};
