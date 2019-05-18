const express = require('express');
const upload = require('../middleware/file-helper');

const imageUpload = upload.single('image');

exports.fileUpload = async(req,res)=>{
    imageUpload(req, res, function(err, some) {
        if (err) {
          return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}] });
        }
        return res.json({'imageUrl': req.file.location});
      });
}