const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  // Имя пользователя
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
    match: /^[A-Z]\w+$/i,
  },
  // Мы не храним пароль, а только его хэш
  password: {
    type: String,
    required: true,
    minlength: 4,
  },
  // Email
  email: {
    type: String,
    required: true,
    minlength: 3,
    match: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
	},
	role: {
		type: String,
		default: 'user'
	 },
});

const User = mongoose.model('User', userSchema)

module.exports = User

