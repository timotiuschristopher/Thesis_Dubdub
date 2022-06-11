// AWS S3 service back-end code
// by: T.C. Tantokusumo
// 2022

//Load credentials
require('dotenv').config({path:'./credentials/secrets.env'})
// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// const { promiseCallback } = require('express-fileupload/lib/utilities');
// Set the region 
AWS.config.update({
    accessKeyId: process.env.IAM_USER_KEY,          //required # Put your iam user key
    secretAccessKey: process.env.IAM_USER_SECRET,   //required # Put your iam user secret key
    region: 'ap-southeast-1'
});

// Create S3 service object
var BucketRawURI= process.env.RAW_DATA_BUCKET_URI;
var BucketRawName = process.env.RAW_DATA_BUCKET;

var BucketComputedURI = process.env.COMPUTED_DATA_BUCKET_URI;
var BucketComputedName = process.env.COMPUTED_DATA_BUCKET;


const s3 = new AWS.S3({
  Bucket: BucketRawURI                                       //required # Put your bucket name
});

const s3Download = new AWS.S3({
    Bucket:BucketComputedURI
})

const s3uploader = async (file) =>{
    // call S3 to retrieve upload file to specified bucket
    var uploadParams = {Bucket:BucketComputedName, Key: '', Body: ''};

    // Configure the file stream and obtain the upload parameters
    var fs = require('fs');
    var fileStream = fs.createReadStream(file);
    fileStream.on('error', function(err) {
    console.log('File Error', err);
    });
    uploadParams.Body = fileStream;
    var path = require('path');
    uploadParams.Key = (path.basename(file));        //code to create folder: `${folder}/` + path.basename(file)

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
    const a = await s3uploader('./uploadedFile/'+noExt+".csv");          
    // console.log('1.',a);                                         //for debugging
    const b = await s3uploader('./uploadedFile/'+noExt+"LPF.csv");   
    // console.log('2.',b); 
    const c = await s3uploader('./uploadedFile/'+noExt+"QRS.csv");
    // console.log('3.',c);
    const d = await s3uploader('./uploadedFile/'+noExt+"Peak.csv"); 
    // console.log('4.',d);
    const e = await s3uploader('./uploadedFile/'+noExt+"PeakTrack.csv");
    // console.log('5.',e);
    const f = await s3uploader('./uploadedFile/'+noExt+"P.csv"); 
    // console.log('6.',f);
    const g = await s3uploader('./uploadedFile/'+noExt+"RLPF.csv");
    // console.log('7.',g);
    const h = await s3uploader('./uploadedFile/'+noExt+"RLPFp.csv"); 
    // console.log('8.',h);
    const i = await s3uploader('./uploadedFile/'+noExt+"RR.csv");
    // console.log('9.',i);
    const j = await s3uploader('./uploadedFile/'+noExt+"inRR.csv"); 
    // console.log('10.',j);
    const k = await s3uploader('./uploadedFile/'+noExt+"log.csv");
    // console.log('11.',k);
    const l = await s3uploader('./uploadedFile/'+noExt+"QS.csv");  
    // console.log('12.',l);
    const m = await s3uploader('./uploadedFile/'+noExt+"Pre.csv");
    // console.log('13.',m);
    const n = await s3uploader('./uploadedFile/'+noExt+"PWave.csv"); 
    // console.log('14.',n);
}

async function s3getBucketList(BucketRawName){
  var listParams = {Bucket:BucketRawName, MaxKeys:100};
  const BucketObjectList = s3Download.listObjects(listParams).promise();
  return BucketObjectList || {};
}

async function getPresignedURL(BucketRawName, key){
    const params = {
        Bucket:BucketRawName, 
        Key:key,
        Expires: 60
    }

    const preSignedURL = await s3Download.getSignedUrl('getObject', params);
    return preSignedURL;

}
module.exports = { s3uploadFile, s3getBucketList, getPresignedURL }