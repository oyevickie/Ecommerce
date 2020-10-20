const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Order = require('../models/order');
const config = require('../config');
const checkJWT = require('../middlewares/check-jwt')
const bcrypt = require("bcrypt")

router.post('/signup', (req,res, next) => {
    let user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    user.picture = user.gravatar();
    user.isSeller = req.body.isSeller;

    User.findOne({ email: req.body.email }, (err, existingUser) => {
        if(existingUser) {
            res.json({
                success: false,
                message: 'Account already exists'
            });
        } else {
            user.save();

            var token = jwt.sign({
              user: user  
            }, config.secret, {
                expiresIn: '1d'
            });

            res.json({
                success: true,
                message: 'Enjoy your token',
                token: token
            })
        }
    });
});

router.post('/login', (req,res, next) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if(err) throw err;

        if(!user){
            res.json({
                success: false,
                message: 'User Not Found'
            })
        } else if (user) {
            var validPassword = bcrypt.compareSync(req.body.password, user.password)
            // var validPassword = user.comparePassword(req.body.password)
            if(!validPassword) {
                res.json({
                    success: false,
                    message: 'Wrong password'
                })
            } else {
                var token = jwt.sign({
                  user: user
                }, config.secret, {
                  expiresIn: '1d'
                });
        
                res.json({
                  success: true,
                  mesage: "Enjoy your token",
                  token: token
                });
              }
        }
    });
});



// module.exports.login = (req,res)=> {

//     console.log(req.body.email);

//     User.findOne({ email: req.body.email }, (err, user) => {
//         if (err) return res.status(500).send('Error on the server.');
//         if (!user) return res.status(404).send('No user found.');
//       })
//       .then(user => {
//           var passwordIsValid = bcrypt.compareSync(req.body.password, user.password)
//           if(!passwordIsValid) return res.status(401).send({ error : "password not match"})

//           if(user) {
//               const payload= {
//                   _id: user._id,
//                   firstname: user.firstname,
//                   lastname: user.lastname,
//                   email: user.email,
//                   isSeller: user.isSeller
//               }
//               let token = jwt.sign(payload, process.env.SECRET_KEY, {
//                   expiresIn: '7d'
//               })
//               res.json({
//                           success: true,
//                           mesage: "Enjoy your token",
//                           token: token
//                         });
//           }
//           else {
//               res.json({ error : 'User Does not Exist' })
//           }
//       })
//       .catch(err => {
//           res.send('error: ' + err)
//       })
    
//       };




router.route('/profile')
    .get(checkJWT, (req, res, next) => {
        User.findOne({ _id: req.decoded.user._id }, (err, user) => {
            res.json({
                success: true,
                user: user,
                message: "Successful"
            })
        })
    })

    .post(checkJWT, (req,res, next) => {
        User.findOne({ _id: req.decoded.user._id }, (err, user) => {
            if(err) return next(err)

            if(req.body.name) user.name = req.body.name;
            if(req.body.email) user.email = req.body.email;
            if(req.body.password) user.password = req.body.password;

            user.isSeller = req.body.isSeller;

            user.save();
            res.json({
                success: true,
                message: 'Successfully edited your profile'
            })
        })
    })

    router.route('/address')
    .get(checkJWT, (req, res, next) => {
      User.findOne({ _id: req.decoded.user._id }, (err, user) => {
        res.json({
          success: true,
          address: user.address,
          message: "Successful"
        });
      });
    })
    .post(checkJWT, (req, res, next) => {
      User.findOne({ _id: req.decoded.user._id }, (err, user) => {
        if (err) return next(err);
  

        if (req.body.addr) user.address.addr = req.body.addr;
        if (req.body.addrr) user.address.addrr = req.body.addrr;
        if (req.body.city) user.address.city = req.body.city;
        if (req.body.state) user.address.state = req.body.state;
        if (req.body.country) user.address.country = req.body.country;
        if (req.body.postalCode) user.address.postalCode = req.body.postalCode;
        
      console.log(user);
       
        user.save();
        res.json({
          success: true,
          message: 'Successfully edited your address'
        });
      });
    });

    router.get('/orders', checkJWT, (req,res, next) => {
        Order.find({ owner: req.decoded.user._id })
        .populate('products.product')
        .populate('owner')

        .exec((err, order) => {
            if(err) {
                res.json({
                    success: false,
                    message: "couldn't find your order"
                });
            }else {
                res.json({
                    success: true,
                    order: order,
                    message: "Successful"
                });
            }
        })
    })

    router.get('/orders/:id', checkJWT, (req, res, next) => {
        Order.findOne({ _id: req.params.id })
        .deepPopulate('products.product.owner')
        .populate('owner')

        .exec((err, order) => {
            if(err) {
                res.json({
                    success: false,
                    message: "couldn't find your order"
                });
            }else {
                res.json({
                    success: true,
                    order: order,
                    message: "Successful"
                });
            }
        })
    })

    module.exports = router;