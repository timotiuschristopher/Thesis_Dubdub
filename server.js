const cors = require('cors')
const express = require('express');
const app = express();
const exec = require('child_process').execFile; //executing the .exe file (program)
const bodyParser = require('body-parser');
const upload = require("express-fileupload");
const graph = require("./routes/graph");
const ecgController = require('./controller/ecgcomputer-controller');
const s3Controller = require('./controller/s3controller'); 

// const DBService = require("./services/DatabaseService")
// const dbDAO = require("./services/dbDAO")
const s3Service = require("./services/s3service");
const res = require('express/lib/response');

// Connect to MongoDB and put server instantiation code inside
// because we start the connection first

// const seedPatient = {
//   name:"Irene",
//   volt:"cars",
// }

// DBService.connectDB(async (err) => {
//   if (err) throw err
//   // Load db & collections
//   const db = DBService.getDB()
//   const Patients = db.collection('patient')

//   try {
//       // // Run some sample operations
//       // // and pass users collection into models
//       // const newPatient = await dbDAO.createPatient(Patients, seedPatient)
//       const listPatients = await dbDAO.getPatients(Patients)
//       // const findUser = await Users.findUserById(users, newUser._id)
//       console.log('Connection is established');

//       // console.log('CREATE PATIENT');
//       // console.log(newPatient);
//       console.log('GET ALL PATIENTS');
//       console.log(listPatients);
//       // console.log('FIND USER');
//       // console.log(findUser);
//   } catch (e) {
//       throw e
//   }

//   // const desired = true
//   // if (desired) {
//   //     // Use disconnectDB for clean driver disconnect
//   //     DBService.disconnectDB()
//   //     process.exit(0)
//   // }
//   // Server code anywhere above here inside connectDB()
// })

app.use(upload());
app.use(express.static('uploadedFile')); // to access the files in public folder
app.use(cors());                        // it enables all cors requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index2.htm");
})

// app.post('/uploadedFile', (req, res) => {
//   // if(req.files){
//   if (!req.files) {
//     return res.status(500).send({ msg: "file is not found" })
//   }
//   const myFile = req.files.myFile;
//   // filename = file.name;
//   myFile.mv('uploadedFile/' + myFile.name, (err) =>{
//     if(err){
//       console.log(err)
//       //res.send("YOOO theres an error")
//       return res.status(500).send({ msg: "Server error" });
//     } return res.send({name: myFile.name, path: `/${myFile.name}`});
//     // { res.send("File uploaded bruh!")}
//   });
//   //}
// })
//export function 

//move the calculation to ecgController.ecgCompute
app.post('/upload',ecgController.ecgCompute);

//to show all of the objects in AWS S3 bucket on the Web application UI
app.get('/all-files',s3Controller.s3Get);

app.get('/get-object-url/:key', s3Controller.getSignedUrl);
 
//use the graph.js file to handle
//endpoints that start with /graph
app.use('/graph', graph);

app.route('/trial')
.get(function (req, res) {
  res.sendFile(__dirname + '/realtime.htm')
})

// app.route('/puttoAWSS3')
// .get(function(req, res){
  
//   res.send('Done! Uploaded Files to AWS S3!')
// })

console.log(__dirname);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log('Server started on port '+ PORT));