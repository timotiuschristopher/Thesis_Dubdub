// AWS S3 controller back-end code
// by: T.C. Tantokusumo
// 2022

//Load credentials
require('dotenv').config({path:'./credentials/secrets.env'})
const s3Service = require("../services/s3service");

async function s3Get (req, res){
    try{
        const bucketData = await s3Service.s3getBucketList(process.env.RAW_DATA_BUCKET);
        const {Contents = []} = bucketData;
        res.send(Contents.map(content => {
            return{
                key: content.Key,
                size: (content.Size/1024).toFixed(1)+' KB',
                lastModified: content.LastModified
            }
        }));
    } catch(ex){
        res.send([]);
    }
}

async function getSignedUrl (req, res){
    try{
        const {key} = req.params;
        console.log(key)
        const url = await s3Service.getPresignedURL(process.env.RAW_DATA_BUCKET, key);
        res.send(url);

    }catch(ex){
        res.send('');
    }
}

module.exports = { s3Get, getSignedUrl }