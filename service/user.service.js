const User = require('../DataBase/user')

module.exports = {
    findByParams: async (filter = {}) => {
        return  User.find(filter);
    },

    findOneByParams: async (filter = {}) => {
        return  User.findOne(filter);
    },

    findById: async (userId) => {
        return  User.findById(userId);
    },

    updateOne: async (userId, newInfo) => {
        return User.findByIdAndUpdate(userId, newInfo, {new: true});
    },

    create: async (userInfo) => {
        return User.create(userInfo);
    },

    delete: async (userId) => {
        return User.deleteOne({_id: userId});
    }

}