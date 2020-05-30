const express =require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Orders = require('../models/order');
const Food = require('../models/food');
const Restaurant = require("../models/restaurant");
const users = require('../models/users');
require("./utils");

//To get Order details 

router.get('/', (req, res, next) => {
    Orders.find()
    .select('orderDetails _id')
    .exec()
    .then(docs => {
        res.status(200).json({
            count: docs.length,
            order: docs.map ( doc => {
                return {
                    _id: doc._id,
                    userId: doc.userId,
                    orderDetails: doc.orderDetails
                }
            })
        })
    })
    .catch(err => {
        res.status(500).json ({
            error: err
        });
    });
});


//To get Order details for Admin View

router.get("/manageOrders", (req, res, next) => {
user={"user":parseToken(req.headers.authorization).usersId};
Restaurant.find(user).exec().then((restaurantObj)=>{
   let resIds=[];
    resIds=restaurantObj.map(obj => {
        return obj._id
    });
    Orders.find({"restaurantId":{ $in: resIds }})
    .populate('restaurantId')
    .exec()
    .then(docs => {
      const response = {
          count: docs.length,
           order: docs.map(doc => {
              return {
                  orderDetails: doc.orderDetails,
                  restaurantId: doc.restaurantId._id,
                  restaurantName: doc.restaurantId.Name_of_the_Restaurant,
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
})
});


//To get Order details for Customer view
router.get("/myOrders", (req, res, next) => {

 user={"userId":parseToken(req.headers.authorization).usersId};
 Food.find({'restaurant': req.params.resId})

  Orders.find(user)
    .populate('restaurantId')    
    .select(' _id orderDetails  Name_of_the_Restaurant user')   
    .exec()
    .then(docs => {
      const response = {
          count: docs.length,
           order: docs.map(doc => {
              return {
                  orderDetails: doc.orderDetails,
                  restaurantName: doc.restaurantId.Name_of_the_Restaurant,
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

//To Store a new Order
router.post('/', (req, res, next)=> {  
 const user=parseToken(req.headers.authorization).usersId;
 const order =  new Orders({
            _id: new mongoose.Types.ObjectId(),
            userId: user,
            restaurantId: req.body.order.restaurantId,
            orderDetails:req.body.order
    }); 
     return order
    .save()
    .then(result => {
        res.status(201).json({
            message: 'Order stored',
            createdOrder: {
               _id: result._id,
              orderDetails: result.orderDetails,
               restaurantId: result.restaurantId
               },
             });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error:err
            });
        });
     });
          

     //To get an order based on OrderID

        router.get('/:orderId', (req, res, next)=> {
            Orders.findById(req.params.orderId)
            .populate('food')
            .exec()
            .then(order => {
                if (!order) {
                    return res.status(404).json({
                        message: "order not found"
                    });
                }
                res.status(200).json({
                    order: order
                });
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                })
            });
        });
                 
        // To Delete an order based on OrderID

        router.delete('/:orderId', (req, res, next)=> {
            Orders.remove( { _id: req.params.orderId})
            .exec()
            .then(result => {
                res.status(200).json({
                   message: 'Order deleted',
            });
            })
            .catch(err => {
      res.status(500).json({
        error: err
      });
    });
        });

        module.exports = router;