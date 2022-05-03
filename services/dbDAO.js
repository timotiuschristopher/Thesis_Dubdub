const ObjectID = require('mongodb').ObjectID
// const createUser = async (users, user) => {
//     try {
//         const results = await users.insertOne(user)
//         return results.ops[0]
//     } catch (e) {
//         throw e
//     }
// }

const getPatients = async (patients) => {
    try {
        const results = await patients.find().toArray()
        return results
    } catch (e) {
        throw e
    }
}

// const findUserById = async (users, id) => {
//     try {
//         if (!ObjectID.isValid(id)) throw 'Invalid MongoDB ID.'
//         const results = await users.findOne(ObjectID(id))
//         return results
//     } catch (e) {
//         throw e
//     }
// }

// module.exports = { createUser, getUsers, findUserById }
module.exports = { getPatients }