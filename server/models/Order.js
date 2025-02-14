const mongoose = require ('mongoose');

const OrderSchema = new mongoose.Schema({
    userId : String ,
    cartItems: [
        {
            productId : String,
            title : String ,
            image : String,
            price : String, 
            quantity : Number
        }
    ],
    addressInfo : {
        addressId : String,
        address : String,
        city : String ,
        pincode : String,
        phone : String,
        notes: String
    },
    OrderStatus : String,
    paymentMethods : String,
    paymentStatus : String,
    totalAmount : Number,
    orderDate : Date,
    orderUpdate : Date,
    paymentId : String,
    payerId : String
})

module.exports = mongoose.model('Order', OrderSchema);

