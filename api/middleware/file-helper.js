const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

aws.config.update({
        accessKeyId:'AKIAJUYVGRADWQN3OOOQ',    
        secretAccessKey:'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',
        region:'ap-south-1'
});

const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type, only JPEG and PNG is allowed!'), false);
    }
  }

const upload = multer({
    fileFilter,
    storage: multerS3({
      s3,
      bucket: 'demo.movies.com',
    //   acl: 'public-read',
    //   metadata: function (req, file, cb) {
    //     cb(null, {fieldName: file.fieldname});
    //   },
      key: function (req, file, cb) {
          console.log("***************************",file);
        cb(null, Date.now().toString())
      }
    })
  })
  
  module.exports = upload;