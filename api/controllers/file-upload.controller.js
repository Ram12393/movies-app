const multer = require('multer');
const aws = require('aws-sdk');

aws.config.update({
    accessKeyID: "AKIAI3ODUDIZN2YD46RQ",
    secretAccessKey: "OU66Emefu1T3vDCzJtFsCxf6hjFmautgvaBCQ / GX"
})

const s3 = aws.S3();