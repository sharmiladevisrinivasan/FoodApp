const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require('multer');
require("./utils");
const storage = multer.diskStorage({
  destination: function(req, file, cb){
     cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});



const fileFilter = (req, file, cb) => {
    // reject a  file
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
    {
    cb(null, true);
} else {
    cb(null, false);
}
};
const upload = multer ({ 
    storage: storage,
     limits : {
    fileSize: 1024 * 1024 * 5
     },
     fileFilter: fileFilter
    });


const Restaurant = require("../models/restaurant");


 // To get restaurant details 
router.get("/", (req, res, next) => {
  Restaurant.find()
    .select('Name_of_the_Restaurant Cuisine _id restaurantImage user')    
    .exec()
    .then(docs => {
      const response = {
          count: docs.length,
          restaurant: docs.map(doc => {
              return {
                  Name_of_the_Restaurant: doc.Name_of_the_Restaurant,
                  Cuisine: doc.Cuisine,
                  restaurantImage: doc.restaurantImage,
                  _id: doc._id,
              }
            })
      };
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});


//To get restaurant details admin view---Manage Restaurant

router.get("/merchant", (req, res, next) => {

  user={"user":parseToken(req.headers.authorization).usersId};
  Restaurant.find(user)
    .select('Name_of_the_Restaurant Cuisine _id restaurantImage user')    
    .exec()
    .then(docs => {
      const response = {
          count: docs.length,
          restaurant: docs.map(doc => {
              return {
                  Name_of_the_Restaurant: doc.Name_of_the_Restaurant,
                  Cuisine: doc.Cuisine,
                  restaurantImage: doc.restaurantImage,
                  _id: doc._id,
              }
            })
      };
      res.status(200).json(response);
      
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});


//To Add new Restaurant

router.post("/new", upload.single('restaurantImage'), (req, res, next) => {
   let user;
   if((!req.headers.authorization) ||(req.headers.authorization === (null||"null")))
      res.status(500).json({
        error: "invalid token"
      });
   else 
 user=parseToken(req.headers.authorization).usersId;
  const restaurant = new Restaurant({
    _id: new mongoose.Types.ObjectId(),
    Name_of_the_Restaurant: req.body.Name_of_the_Restaurant,
    Cuisine: req.body.Cuisine,
    restaurantImage: req.file.path,
    user: user
  });
  restaurant
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created Restaurant sucessfully",
        createdRestaurant: {
            Name_of_the_Restaurant: result.name,
            Cuisine: result.price,
            _id: result._id,
            user:user
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



//To retrieve restaurant details based on ID

router.get("/:restaurantId", (req, res, next) => {
    const id = req.params.restaurantId;
    Restaurant.findById(id)
      .select('Name_of_the_Restaurant Cuisine _id restaurantImage')
      .exec()
      .then(doc => {
        if (doc) {
          res.status(200).json({
              restaurant: doc,
          });
        } else {
          res
            .status(404)
            .json({ message: "No valid entry found for provided ID" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  });



//To Update Restaurant details based on ID

router.patch("/:restaurantId", upload.single('restaurantImage'), (req, res, next) => {
  const id = req.params.restaurantId;

  if(req.file && req.file.path) {
    req.body.restaurantImage = req.file.path?req.file.path:req.body.restaurantImage;
  }
  const updateOps = {};
  for (const key of Object.keys(req.body)) {
    updateOps[key] = req.body[key];
  }
  Restaurant.updateOne({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'Restaurant updated',
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});



//To delete Restaurant details based on ID

router.delete("/:restaurantId", (req, res, next) => {
  const id = req.params.restaurantId;
  Restaurant.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'Restaurant deleted',
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