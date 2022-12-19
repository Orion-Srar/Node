const {model, Schema} = require('mongoose');

const OldPasswordSchema = new Schema({
    _user_id: {type: Schema.Types.ObjectId, required: 'user'},
    password: {type: String},

}, {
    timestamps: true,
    versionKey: false
});

module.exports = model('OldPassword', OldPasswordSchema);