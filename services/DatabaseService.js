const MongoClient = require( 'mongodb' ).MongoClient;
const uri = 'mongodb+srv://christo:admin@clusterdubdub.ugzrc.mongodb.net/ecg?retryWrites=true&w=majority'
let _db

const connectDB = async (callback) => {
    try {
        MongoClient.connect(uri, { useNewUrlParser: true }, function( err, client ) {
            _db = client.db('ecg');
            return callback(err)
        })
    } catch (e) {
        throw e
    }
}

const getDB = () => _db

// const disconnectDB = () => _db.close()

module.exports = { connectDB, getDB }

// const {MongoClient} = require('mongodb');
// const url = 'mongodb+srv://christo:admin@clusterdubdub.ugzrc.mongodb.net/ecg?retryWrites=true&w=majority';

// const insertDocuments = (db, callback) => {
//   const collection = db.collection('patient');

//   collection.insert(
//     [{ name: 'Bob', volt:[10,60,200,100] }],
//     (error, result) => {
//       if (error) return process.exit(1);
//       callback(result);
//     }
//   );
// };

// async function findDocuments(db,nameOfPatient) {
//   const result = await db.collection("patient").find({"name":nameOfPatient},{projection:{_id:0,volt:1}}).toArray();
//   if (result) {
//       console.log(`Found Patient: '${nameOfPatient}'`);
//       console.log(result);

//       // Convert JSON into Array
//       // const array = [];
//       // const ObjResult = JSON.parse(result);


//       // // for(var i in result) {
//       // //   array.push([i,result[i]]);
//       // // }
//       // console.log(ObjResult.volt[])

//   } else {
//       console.log(`No patients found with the name '${nameOfPatient}'`);
//   }
// }

// MongoClient.connect(url, (error, client) => {
//   if (error) return process.exit(1);
//   console.log('Connection is okay');

//   const db = client.db('ecg');

//   // insertDocuments(db, () => {
//   //   console.log('Insert successful');
//   // });
//   findDocuments(db, "John Doe");
// });