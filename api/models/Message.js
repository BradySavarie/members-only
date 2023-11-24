const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const messageSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    time: Date,
    body: String,
});

module.exports = mongoose.model('Message', messageSchema);
