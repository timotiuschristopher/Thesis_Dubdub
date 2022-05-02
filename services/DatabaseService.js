// const MongoClient = require( 'mongodb' ).MongoClient;
// const url = "mongodb://localhost:27017";

// var _db;

// module.exports = {

//   connectToServer: function( callback ) {
//     MongoClient.connect( url,  { useNewUrlParser: true }, function( err, client ) {
//       _db  = client.db('test_db');
//       return callback( err );
//     } );
//   },

//   getDb: function() {
//     return _db;
//   }
// };
// "use strict";
// const express = require("express");
// let router = express.Router();


const {MongoClient} = require('mongodb');

async function main(){
  /**
   * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
   * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
   */
  const uri = "mongodb+srv://christo:admin@clusterdubdub.ugzrc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  
  const client = new MongoClient(uri);

  try {
      // Connect to the MongoDB cluster
      await client.connect();

      // Make the appropriate DB calls
      await  listDatabases(client);

  } catch (e) {
      console.error(e);
  } finally {
      await client.close();
  }
}

main().catch(console.error);

async function listDatabases(client){
  databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};