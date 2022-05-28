const cors = require('cors')
const express = require('express');
const app = express();
const exec = require('child_process').execFile;           //executing the .exe file (program)
const bodyParser = require('body-parser');
const upload = require("express-fileupload");
const graph = require("./routes/graph");
const ecgController = require('./controller/ecgcomputer-controller');
const s3Controller = require('./controller/s3controller'); 
const s3Service = require("./services/s3service");
const res = require('express/lib/response');



app.use(upload());
app.use(express.static('uploadedFile'));                  // to access the files in public folder
app.use(cors());                                          // it enables all cors requests
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

//to get temporary download file from AWS S3 (due to credential reason)
app.get('/get-object-url/:key', s3Controller.getSignedUrl);
 
//use the graph.js file to handle
//endpoints that start with /graph
app.use('/graph', graph);

//need to improve for realtime measurement
app.route('/trial')
.get(function (req, res) {
  res.sendFile(__dirname + '/realtime.htm')
})

console.log(__dirname);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log('Server started on port '+ PORT));