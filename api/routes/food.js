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


const Food = require("../models/food");
const Restaurant = require("../models/restaurant");


//To get Food details 
router.get("/", (req, res, next) => {
  Food.find()
    .select("Name Description Cuisine foodImage Price Quantity _id")
    .populate('restaurant','restaurantId')
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        food: docs.map(doc => {
          return {
            _id: doc._id,
            Name: doc.Name,
            Description: doc.Description,
            Cuisine: doc.Cuisine,
            foodImage: doc.foodImage,
            Price: doc.Price,
            Quantity: doc.Quantity,
            restaurant: Restaurant.restaurantId,
          };
        })
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});


//To get Food details based on Admin view -- Manage foods

router.get("/merchant", (req, res, next) => {

  user={"user":parseToken(req.headers.authorization).usersId};
  Food.find(user)
  .populate('restaurant')
    .select('Name Description Cuisine _id foodImage restaurant Name_of_the_Restaurant Price Quantity user')   
    .exec()
    .then(docs => {
      const response = {
          count: docs.length,
          food: docs.map(doc => {
              return { 
                  Name: doc.Name,
                  Description: doc.Description,
                  Cuisine: doc.Cuisine,
                  foodImage: doc.foodImage,
                  Price: doc.Price,
                  Quantity: doc.Quantity,
                  restaurant: (doc.restaurant)?doc.restaurant._id:null,
                  restaurantName: (doc.restaurant && doc.restaurant.Name_of_the_Restaurant)?doc.restaurant.Name_of_the_Restaurant:null,
                  user: doc.user,
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

//To post a new food
 
router.post("/new", upload.single('foodImage'),(req, res, next) => {
  user= parseToken(req.headers.authorization).usersId;
  const food = new Food({
    _id: new mongoose.Types.ObjectId(),
    Name: req.body.Name,
    Description: req.body.Description,
    Cuisine: req.body.Cuisine,
    foodImage: req.file.path?req.file.path:req.body.foodImage,
    restaurant: req.body.restaurant,
    Quantity: req.body.Quantity,
    Price: req.body.Price,
    user: user
  });
  
  food
     .save()
     .then(result => {
           res.status(201).json({
           message: "Created Food Item sucessfully",
           createdFood: {
               Name: result.Name,
               Description: result.Description,
               Cuisine: result.Cuisine,
              _id: result._id,
              restaurant: result.restaurantId,
              price: result.price,
              Quantity: result.Quantity,
              user: result.user
          }
         });
       })
     .catch(err => {
       console.log(err);
       res.status(500).json({
         error: err
       });
     });
    })


 //To get food details based on restaurantID
router.get("/resFoods/:resId", (req, res, next) => {
  Food.find({'restaurant': req.params.resId})
  .exec() 
  .then( docs => {
if (!docs) {
        return res.status(200).json({
          message: "food not found"
        });
      }
      else{
      const response = {
          food: docs.map(doc => {
              return {
                  Name: doc.Name,
                  Description: doc.Description,
                  Cuisine: doc.Cuisine,
                  foodImage: doc.foodImage,
                  Price: doc.Price,
                  restaurant: doc.restaurant,
                  _id: doc._id,
              }
            })
      };
      res.status(200).json(response);
    }
    })
     .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  })


//To get food details based on foodID
router.get("/:foodId", (req, res, next) => {
  Food.findById(req.params.foodId)
    .populate('restaurant')
    .exec()
    .then(food => {
      if (!food) {
        return res.status(404).json({
          message: "food not found"
        });
      }
      res.status(200).json({
        food: food,
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});


//To Update a food based on foodID

router.patch("/:foodId", upload.single('foodImage'),(req, res, next) => {
  const id = req.params.foodId;
  if(req.file && req.file.path){
    req.body.foodImage= req.file.path?req.file.path:req.body.foodImage;
  }
  const updateOps = {};
  for (const key of Object.keys(req.body)) {
    updateOps[key] = req.body[key];
  }

  Food.updateOne({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'Food updated Successfully', 
      }); 
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});


//To Delete a food based on Food ID

router.delete("/:foodId", (req, res, next) => {
  Food.remove({ _id: req.params.foodId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Food deleted",
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;