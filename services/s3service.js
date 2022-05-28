//Load credentials
require('dotenv').config({path:'./credentials/secrets.env'})
// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
const { promiseCallback } = require('express-fileupload/lib/utilities');
// Set the region 
AWS.config.update({
    region: 'ap-southeast-1'
});

// Create S3 service object
var BucketURI= "arn:aws:s3:::datalake-puskesmas/";
var BucketName = "datalake-puskesmas";

const s3 = new AWS.S3({
  accessKeyId: process.env.IAM_USER_KEY,                  //required # Put your iam user key
  secretAccessKey: process.env.IAM_USER_SECRET,           //required # Put your iam user secret key
  Bucket: BucketURI                                       //required *# Put your bucket name
});


const s3uploader = async (file,folder) =>{
    // call S3 to retrieve upload file to specified bucket
    var uploadParams = {Bucket:BucketName, Key: '', Body: ''};
    // var file = process.argv[2];
    // uploadParams.Bucket = `${BucketURI}`;

    // Configure the file stream and obtain the upload parameters
    var fs = require('fs');
    var fileStream = fs.createReadStream(file);
    fileStream.on('error', function(err) {
    console.log('File Error', err);
    });
    uploadParams.Body = fileStream;
    var path = require('path');
    uploadParams.Key = (`${folder}/` + path.basename(file)); 

    // call S3 to retrieve upload file to specified bucket
    await s3.upload(uploadParams, function (err, data) {
        if (err) {
            console.log("Error", err);
        } if (data) {
            console.log("Upload Success", data.Location);
        }
    });
};

const s3uploadFile = async (noExt) => {
    const a = await s3uploader('./uploadedFile/'+noExt+".csv",`${noExt}`);
    console.log('1.',a);
    const b = await s3uploader('./uploadedFile/'+noExt+"LPF.csv",`${noExt}`);   
    console.log('2.',b); 
    const c = await s3uploader('./uploadedFile/'+noExt+"QRS.csv",`${noExt}`);
    console.log('3.',c);
    const d = await s3uploader('./uploadedFile/'+noExt+"Peak.csv",`${noExt}`); 
    console.log('4.',d);
    const e = await s3uploader('./uploadedFile/'+noExt+"PeakTrack.csv",`${noExt}`);
    console.log('5.',e);
    const f = await s3uploader('./uploadedFile/'+noExt+"P.csv",`${noExt}`); 
    console.log('6.',f);
    const g = await s3uploader('./uploadedFile/'+noExt+"RLPF.csv",`${noExt}`);
    console.log('7.',g);
    const h = await s3uploader('./uploadedFile/'+noExt+"RLPFp.csv",`${noExt}`); 
    console.log('8.',h);
    const i = await s3uploader('./uploadedFile/'+noExt+"RR.csv",`${noExt}`);
    console.log('9.',i);
    const j = await s3uploader('./uploadedFile/'+noExt+"inRR.csv",`${noExt}`); 
    console.log('10.',j);
    const k = await s3uploader('./uploadedFile/'+noExt+"log.csv",`${noExt}`);
    console.log('11.',k);
    const l = await s3uploader('./uploadedFile/'+noExt+"QS.csv",`${noExt}`);  
    console.log('12.',l);
    const m = await s3uploader('./uploadedFile/'+noExt+"Pre.csv",`${noExt}`);
    console.log('13.',m);
    const n = await s3uploader('./uploadedFile/'+noExt+"Pwave.csv",`${noExt}`); 
    console.log('14.',n);
}

async function s3getBucketList(BucketName){
  var listParams = {Bucket:BucketName, MaxKeys:100};
  const BucketObjectList = s3.listObjects(listParams).promise();
  return BucketObjectList || {};
}

async function getPresignedURL(BucketName, key){
    const params = {
        Bucket:BucketName, 
        Key:key,
        Expires: 60
    }

    const preSignedURL = await s3.getSignedUrl('getObject', params);
    return preSignedURL;

}
module.exports = { s3uploadFile, s3getBucketList, getPresignedURL }