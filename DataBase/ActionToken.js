const {model, Schema} = require('mongoose');

const ActionTokenSchema = new Schema({
    _user_id: {type: Schema.Types.ObjectId, required: 'user'},
    token: {type: String},
    tokenType: {type: String},

}, {
    timestamps: true
});

module.exports = model('Action_Token', ActionTokenSchema);