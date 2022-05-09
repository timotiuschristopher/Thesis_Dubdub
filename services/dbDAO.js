const ObjectID = require('mongodb').ObjectID

 // Notice how the users collection is passed into the models
 const createPatient = async (collection, patient) => {
     try {
         const results = await collection.insertOne(patient)
         return results
     } catch (e) {
         throw e
     }
 }

 const getPatients = async (collection) => {
     try {
         const results = await collection.find().toArray()
         return results
     } catch (e) {
         throw e
     }
 }

//  const findUserById = async (users, id) => {
//      try {
//          if (!ObjectID.isValid(id)) throw 'Invalid MongoDB ID.'
//          const results = await users.findOne(ObjectID(id))
//          return results
//      } catch (e) {
//          throw e
//      }
//  }

 // Export garbage as methods on the Users object
//  module.exports = { createUser, getUsers, findUserById }
module.exports = { createPatient, getPatients }