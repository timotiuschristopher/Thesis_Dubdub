//Load credentials
require('dotenv').config({path:'./credentials/secrets.env'})
// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'ap-southeast-1'});

// Create S3 service object
var BucketURI= "arn:aws:s3:::datalake-puskesmas/";
var Bucketname = "datalake-puskesmas";

const s3 = new AWS.S3({
    accessKeyId: process.env.IAM_USER_KEY,                  //required # Put your iam user key
    secretAccessKey: process.env.IAM_USER_SECRET,           //required # Put your iam user secret key
    Bucket: BucketURI                           //required *# Put your bucket name
  });

// // Call S3 to list the buckets
// s3.listBuckets(function(err, data) {
//   if (err) {
//     console.log("Error", err);
//   } else {
//     console.log("Success", data.Buckets);
//   }
// });

const s3uploadFile = (file,folder) =>{
    // call S3 to retrieve upload file to specified bucket
    var uploadParams = {Bucket:Bucketname, Key: '', Body: ''};
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
    s3.upload(uploadParams, function (err, data) {
        if (err) {
            console.log("Error", err);
        } if (data) {
            console.log("Upload Success", data.Location);
        }
    });
};

module.exports = { s3uploadFile }