const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require("../models/users");
require("./utils");

//To Register a new User

router.post("/signup", (req, res, next) => {
  Users.find({ Email: req.body.Email })
    .exec()
    .then(users => {
      if (users.length >= 1) {
        return res.status(200).json({
          errorMessage: 'Mail Exists'
        });
      } else {
        bcrypt.hash(req.body.Password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const users = new Users({
              _id: new mongoose.Types.ObjectId(),
              Email: req.body.Email,
              Password: hash,
              UserName: req.body.UserName,
              BillingAddress: req.body.BillingAddress,
              UserType: req.body.UserType
            });
            users.save()
              .then(result => {
                console.log(result);
                res.status(201).json({
                  message: 'User Created'
                });
              }).catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    });
});


//To Login for already existing User

router.post('/login', (req, res, next) => {
  Users.find({ Email: req.body.Email })
    .exec()
    .then(users => {
      if (users.length < 1) {
        return res.status(200).json({
          status: false,
          message: 'Auth failed'
        });
      }
      bcrypt.compare(req.body.Password, users[0].Password, (err, result) => {
        if (err) {
          return res.status(200).json({
            status: false,
            message: 'Auth failed'
          });
        }
        if (result) {
          const token = jwt.sign({
            Email: users[0].Email,
            usersId: users[0]._id
          }, process.env.JWT_KEY,

          );
          Users.update({ _id: users[0]._id }, { $set: { "Token": token } })
            .exec()
            .then(result => {
              return res.status(200).json({
                status: true,
                userDetails: {
                  UserName: users[0].UserName,
                  BillingAddress: users[0].BillingAddress,
                  UserType: users[0].UserType
                },
                message: 'Auth Successful',
                token: token
              });

            })
            .catch(err => {
              console.log(err);
              res.status(500).json({
                error: err
              });
            });

        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

//To Logout 

router.post('/logout', (req, res, next) => {
  _id = parseToken(req.headers.authorization).usersId;
  Users.update({ _id: _id }, { $set: { "Token": null } })
    .exec()
    .then(result => {
      return res.status(200).json({
        status: true,
        message: 'Logged out',
      });
    })
})



//To Delete User based on UserID

router.delete('/:usersId', (req, res, next) => {
  Users.remove({ _id: req.params.usersid })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'User deleted'
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});



module.exports = router;
