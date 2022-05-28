// const formidable = require('formidable');
const s3Service = require("../services/s3service");

async function s3Get (req, res){
    try{
        const bucketData = await s3Service.s3getBucketList('datalake-puskesmas');
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
        const url = await s3Service.getPresignedURL('datalake-puskesmas', key);
        res.send(url);

    }catch(ex){
        res.send('');
    }
}

module.exports = { s3Get, getSignedUrl }