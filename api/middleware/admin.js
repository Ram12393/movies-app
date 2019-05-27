const HTTP = require('http-status')
const {User} = require('../models/auth.model');

async function isAdmin(req, res, next) {
  let user = await User.findOne({
      email:req.user.email
  })
 if(!user.isAdmin){
    return res.status(HTTP.FORBIDDEN).send({
        message: 'Access deneid'
     });
 }
 next();
}


module.exports =isAdmin;