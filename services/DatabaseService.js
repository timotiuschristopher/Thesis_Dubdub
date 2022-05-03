// const {MongoClient} = require('mongodb');

// async function main(){
//   /**
//    * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
//    * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
//    */
//   const uri = "mongodb+srv://christo:admin@clusterdubdub.ugzrc.mongodb.net/ecg?retryWrites=true&w=majority";


//   const client = new MongoClient(uri);

//   try {
//       // Connect to the MongoDB cluster
//       await client.connect();

//       console.log("Connected to DubDub MongoDB Atlas!")
//       // Make the appropriate DB calls
//       // await  listDatabases(client);

//   } catch (e) {
//       console.error(e);
//   } finally {
//       await client.close();
//   }
// }

// main().catch(console.error);

// // async function listDatabases(client){
// //   databasesList = await client.db().admin().listDatabases();

// //   console.log("Databases:");
// //   databasesList.databases.forEach(db => console.log(` - ${db.name}`));
// // };
// "use strict";
// const express = require("express");
// let dbrouter = express.Router();

// const MongoClient = require( 'mongodb' ).MongoClient;
// const uri = "mongodb+srv://christo:admin@clusterdubdub.ugzrc.mongodb.net/ecg?retryWrites=true&w=majority";

// var _db;

// module.exports = {

//   connectToServer: function( callback ) {
//     MongoClient.connect( uri,  { useNewUrlParser: true }, function( err, client ) {
//       _db  = client.db('ecg');
//       return callback( err );
//     } );
//   },

//   getDb: function() {
//     return _db;
//   }
// };

// const {MongoClient} = require('mongodb')
// const uri = 'mongodb+srv://christo:admin@clusterdubdub.ugzrc.mongodb.net/ecg?retryWrites=true&w=majority'
// let _db

// const connectDB = async (callback) => {
//   const client = new MongoClient(uri);
//     try {
//       await client.connect();


//         MongoClient.connect(uri, (err, db) => {
//             _db = db('ecg');
//             return callback(err)
//         })
//     } catch (e) {
//         throw e
//     }
// }

// const getDB = () => _db

// const disconnectDB = () => _db.close()

// module.exports = { connectDB, getDB, disconnectDB }

const {MongoClient} = require('mongodb');
const url = 'mongodb+srv://christo:admin@clusterdubdub.ugzrc.mongodb.net/ecg?retryWrites=true&w=majority';

const insertDocuments = (db, callback) => {
  const collection = db.collection('patient');

  collection.insert(
    [{ name: 'Bob', volt:[10,60,200,100] }],
    (error, result) => {
      if (error) return process.exit(1);
      callback(result);
    }
  );
};

async function findDocuments(db, nameOfPatient) {
  const result = await db.collection("patient").findOne({name: nameOfPatient });
  if (result) {
      console.log(`Found Patient '${nameOfPatient}':`);
      console.log(result);
  } else {
      console.log(`No patients found with the name '${nameOfPatient}'`);
  }
}


MongoClient.connect(url, (error, client) => {
  if (error) return process.exit(1);
  console.log('Connection is okay');

  const db = client.db('ecg');

  // insertDocuments(db, () => {
  //   console.log('Insert successful');
  // });
  findDocuments(db, "John Doe");

  // findDocuments(db, "John Doe", () => {
  //   console.log('Data found!');
  //   console.log(`The data is '${result}'`);
  // })
});