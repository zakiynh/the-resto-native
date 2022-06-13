const { getDB } = require('../config/dbConfig');
const { ObjectId } = require('mongodb');

class Users {
    static async findAll() {
        try {
            const db = getDB();
            const users = await db.collection('users').find().toArray();
            return users;
        } catch (error) {
            console.log(error);
        }
    }

    static async create(user) {
        try {
            const db = getDB();
            const result = await db.collection('users').insertOne(user);
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    static async findOne(id) {
        try {
            const db = getDB();
            const user = await db.collection('users').findOne({ _id: ObjectId(id) });
            user.id = user._id.toString();
            return user;
        } catch (error) {
            console.log(error);
        }
    }

    static async deleteUser(id) {
        try {
            const db = getDB();
            const result = await db.collection('users').deleteOne({ _id: ObjectId(id) });
            return result;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Users;