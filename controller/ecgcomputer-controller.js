const exec = require('child_process').execFile; //executing the .exe file (program)
const s3Service = require("../services/s3service");
const path = require('path');

function execPromise(amps,freqs,noExt) {
    return new Promise(function(resolve, reject) { 
      exec('./uploadedFile/x1', [amps, freqs, './uploadedFile/'+ noExt], (err, data) => {
          if (err) {
                reject(err);
                return;
          }
            resolve(data);
      });
    });
  }

async function ecgCompute(req,res){
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
        const uploadpath = path.join(__dirname, '..', 'uploadedFile', name);      //__dirname + '../uploadedFile/' + name;
        file.mv(uploadpath,(err) =>{
        if(err){
            console.log("File Upload Failed",name,err);
            res.send("Error Occured!")
        }
        else {
            console.log("File Uploaded",name);
            console.log(uploadpath);
            console.log("no ext", noExt);
            console.log(amps);
            console.log(freqs);

            execPromise(amps,freqs,noExt).then(async function (result){    //executing the computing program in C language
            console.log(result);
            await s3Service.s3uploadFile(noExt)
            res.send('Done! Uploading files & Calculated') 
            }).catch(function(e) {
            console.error(e.message);
            });

        //   exec('./uploadedFile/x1', [amps, freqs, './uploadedfile/'+ noExt], function (err, data) {  
        //     if(err){
        //       console.log(err)
        //     }
        //     else{
        //       console.log('ini buat lihat data');
        //       console.log(data.toString());     
        //     }       
        //   }); 
            // res.send('Done! Uploading files & Calculated') 
        }
        });
    }
    else {
        res.send("No File selected !");
        res.end();
    };
}

module.exports ={ ecgCompute }
  