const S3 = require('aws-sdk/clients/s3');
const path = require('node:path');
const uuid = require('uuid').v1;


const {S3_BUCKET_REGION, S3_ACCESS_KEY, S3_SECURITY_KEY, S3_BUCKET_NAME} = require("../config/config");

const s3Bucket = new S3({
    region: S3_BUCKET_REGION,
    accessKeyId: S3_ACCESS_KEY,
    secretAccessKey: S3_SECURITY_KEY,
});

async function uploadPublicFile(fileUpload, itemType, itemId){
   return s3Bucket.upload({
       ContentType: fileUpload.mimetype,
        ACL: "public-read",
        Body: fileUpload.data,
        Bucket: S3_BUCKET_NAME,
        Key: builderFileName(fileUpload.name, itemType, itemId)
    }).promise()
}

function builderFileName(fileName, itemType, itemId) {
    const ext = path.extname(fileName);

    return `${itemType}/${itemId}/${uuid()}${ext}`
}

module.exports = {
    uploadPublicFile
}