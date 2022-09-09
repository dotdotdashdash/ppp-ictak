const express = require(`express`);
const passport = require(`passport`)
const UserData = require(`../model/user-model`);
const authController = require('../contoller/auth-controller');

const crypto = require('crypto');
const jwt = require('jsonwebtoken')
// const User = require('../model/user-model');

const authRouter = express.Router();

authRouter.get(`/`, (req, res)=> {
  res.send(`Hi I'm listening at /auth`);
});

authRouter.post(`/signin`, (req, res)=> {

  authController.loginUser(req)
    .then((succ)=> {
      if(succ.success) {
        res.status(200).json(succ);
      } else {
        res.status(401).json(succ);
      }
    }).catch((err)=> {
      console.log("auth-router.js ~ line 27 ~ .then ~ err", err.message)
      console.log('Error while trying to log in!', err.message);
      res.status(401).json({
        success: false,
        message: 'Unknown error while signing in'
      });
    });

  // passport.authenticate('local', (err, user, info)=> {
    
  //   if(err) { //If there is an error with passport
  //     console.log('Error thrown with passport', err.message);
  //     res.status(404).json(err)
  //     return;
  //   }
  //   if(user) {
  //     console.log(user);
  //     token = user.generateJwt();
  //     res.status(200).json({
  //       token: token
  //     });
  //   } else {
  //     console.log(info);
  //     res.status(401).json(info);
  //   }

  // });

  // var email = req.body.email.trim();
  // var password = req.body.password.trim();

  // UserData.find({"email":email})
  //   .then((user)=> {
  //     if(user.length == 0) {
  //       res.status(200).json({
  //         success: false,
  //         message: 'User Not found'
  //       });
  //     } else if(user[0].password != password) {
  //       res.status(200).json({
  //         success: false,
  //         message: `Invalid Password`        
  //       });
  //     } else {
  //       res.status(200).json({
  //         success: true,
  //         message: `Authenticated User` ,
  //         user: user[0]
  //       });
  //     }
  //   }).catch((err)=> {
  //     console.log('auth-router.js:16 - err', err);
  //   });
});

authRouter.post('/signup', (req,res)=> {
  
  authController.addNewUser(req)
    .then((succ)=> {
      if(succ.success) {
        res.status(200).json(succ);
      } else {
        res.status(409).json(succ);
      }
    }).catch((err)=> {
      console.log('Some unknown error', err.message);
      res.status(500).json({
        success: false,
        message: 'Unknown error while signing up'
      });
    });

});

authRouter.post('/updateProfile',function(req,res) {  
  id=req.body._id;
//userType

additionalqualification = req.body.additionalqualification,
address =  req.body.address,
gstnumber = req.body.gstnumber,
heighestqualification = req.body.heighestqualification,
mobile = req.body.mobile,
pannumber  = req.body.pannumber,
partnertype = req.body.partnertype,
skills = req.body.skills,
workexperience = req.body.workexperience,

UserData.findByIdAndUpdate({"_id":id},
  {$set:{"additionalqualification":additionalqualification,
    "address":address,
    "gstnumber":gstnumber,
    "heighestqualification":heighestqualification,
    "mobile":mobile,
    "pannumber":pannumber,
    "partnertype":partnertype,
    "skills":skills,
    "workexperience" : workexperience
}}, { new: true })
.then((success)=> {
  res.status(200).json({
    success: true,
    userType: req.body.userType,
    message: 'Profile Updated Successfully'
  });
})
.catch((err)=> {
  res.json({
    success: false,
    message: 'Profile Updated failed',
  });
});
});

authRouter.get('/findprofile/:id', (req,res) =>{  
  const id = req.params.id;
  UserData.findOne({"_id":id}) 
  .then((user)=>{
    res.send(user);
  })
  .catch((err)=> {
    res.json({
      success: false,
      message: "Some error occurred",
    });
  });
});


module.exports = authRouter;



// passport.authenticate('local', function(err, user, info){
//   var token;

//   // If Passport throws/catches an error
//   if (err) {
//     res.status(404).json(err);
//     return;
//   }

//   // If a user is found
//   if(user){
//     token = user.generateJwt();
//     res.status(200);
//     res.json({
//       "token" : token
//     });
//   } else {
//     // If user is not found
//     res.status(401).json(info);
//   }
// })(req, res);