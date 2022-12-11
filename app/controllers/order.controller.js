const Order = require("../models/order.model");
const Product = require("../models/product.model");

exports.getOrders = (req, res)=>{
    Order.find({buyer: req.userId})
    .select("productId quantity _id buyer")
    .populate("productId", "_id name price productImage")
    .exec()
    .then(docs=>{
        const response = {
            count: docs.length,
            orders: docs.map(doc=>{
                return{
                    _id: doc._id,
                    product: doc.productId,
                    quantity: doc.quantity,
                    buyer: doc.buyer,
                } 
            })
        }
    
        res.status(200).json(response)
    })
    .catch(err=>{
        res.status(500).json({error:err})
    })
    
}

exports.postOrder = (req, res)=>{
    Product.findById(req.body.productId)
    .exec()
    .then(product =>{
        if(!product){
            return res.status(404).json({
                message: "Product not found"
            })
        }
        const order = new Order({
            productId: req.body.productId,
            quantity: req.body.quantity,
            buyer: req.userId
        })
        return order.save()
    })
    .then(result=>{
        res.status(201).json({
            currentOrder:{
                _id: result._id,
                productId: result.productId,
                quantity: result.quantity
            },
            message:"Order Stored",
        })
    })
    .catch(err=>{
        res.status(500).json({error: err});
    })
}

exports.getOrder = (req, res) =>{
    const id = req.params.orderId;

    Order.find({_id: id, buyer:req.userId})
    .select("productId quantity _id")
    .populate("productId", "_id ProName Price")
    .exec()
    .then(doc=>{
        if(doc){
            res.status(200).json(doc)
        }else{
            res.status(404).json({message: "Order not found"});
        }
    })
    .catch(err=>{
        res.status(500).json({error:err});
    })
}

exports.updateOrder = (req, res)=>{
    const id = req.params.orderId
    Order.findByIdAndUpdate(id, req.body, {new:true})
    .exec()
    .then(result=>{
        res.status(200).json({
            message:"Order Updated Successfully",
            result
        })
    })
    .catch(err=>{
		res.status(500).json({
		   	error:err
		})
    })
}
exports.deleteOrder = (req, res )=>{
    const id = req.params.orderId

    Order.deleteOne({_id: id, buyer:req.userId})
    .exec()
    .then((result)=>{
        res.status(200).json({   
            data:{
                _id: id
            },
            message:"Order deleted"
        });
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
     
}
