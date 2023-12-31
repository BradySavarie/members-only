const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    isMember: Boolean,
});

module.exports = mongoose.model('User', userSchema);
