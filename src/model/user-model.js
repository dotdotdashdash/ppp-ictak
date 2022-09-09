const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var userSchema = new Schema({
    fullname : String,
    email: {
        type: String,
        unique: true,
        index: true
    },
    hash: String,
    salt: String,
    userType : String,
    adminapproved : Boolean,
    additionalqualification : String,
    address : String,
    gstnumber : String,
    heighestqualification: String,
    mobile : Number,
    pannumber : String,
    partnertype : String,
    workexperience  : String,
    skills : Array
});


// userSchema.methods.validatePassword = (password)=> {
//     var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
//     return this.hash === hash;
// };

// userSchema.methods.generateJwt = ()=> {
//   var expiry = new Date();
//   expiry.setDate(expiry.getDate() + 7);

//   return jwt.sign({
//     _id: this._id,
//     email: this.email,
//     name: this.name,
//     exp: parseInt(expiry.getTime() / 1000),
//   }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
// };

var userData = mongoose.model('UserData',userSchema);

module.exports = userData;
