const {model, Schema} = require('mongoose');

const OAuthSchema = new Schema({
    _user_id: {type: Schema.Types.ObjectId, required: 'user'},
    accessToken: {type: String},
    refreshToken: {type: String},

}, {
    timestamps: true
});

module.exports = model('O_Auth', OAuthSchema);