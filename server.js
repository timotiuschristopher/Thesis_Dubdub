const cors = require('cors')
const express = require('express');
const app = express();
const exec = require('child_process').execFile; //executing the .exe file (program)
const bodyParser = require('body-parser');
const upload = require("express-fileupload");
// const fetch = require("node-fetch");
// const http = require("http");


app.use(upload());
app.use(express.static('uploadedFile')); // to access the files in public folder
app.use(cors()); // it enables all cors requests
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

app.post('/upload',(req,res) =>{
  let amps = req.body.amp;
  let freqs = req.body.freq;
  console.log(amps);
  console.log(freqs);
  console.log(req.files);
  if(req.files.upfile){
    const file = req.files.upfile,
    name = file.name,
    noExt = name.split('.').slice(0, -1).join('.'),
    type = file.mimetype;
    const uploadpath = __dirname + '/uploadedFile/' + name;
    file.mv(uploadpath,(err) =>{
      if(err){
        console.log("File Upload Failed",name,err);
        res.send("Error Occured!")
      }
      else {
        console.log("File Uploaded",name);
        console.log(amps);
        console.log(freqs);
        res.send('Done! Uploading files')
        exec('./uploadedFile/x1', [amps, freqs, './uploadedfile/'+ noExt],function(err, data) {  
          console.log(err)
          console.log(data.toString());                       
        });  
      }
    });
  }
  else {
    res.send("No File selected !");
    res.end();
  };
})

app.route('/graph')
.get(function (req, res) {
  res.sendFile(__dirname + '/graph.htm')
})

app.route('/trial')
.get(function (req, res) {
  res.sendFile(__dirname + '/realtime.htm')
})

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log('Server started on port '+ PORT));