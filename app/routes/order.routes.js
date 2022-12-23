const controller = require("../controllers/order.controller");
const { auth } = require("../middlewares");

module.exports = function(app){
    

    /**
     * @api {GET} /api/orders Get Orders
     * @apiVersion 1.0.0
     * @apiName getOrders
     * @apiGroup Order
     * @apiPermission Every type of user
     * @apiHeader {String} x-access-token json web token to access to data
     *
     * @apiDescription get all of orders
     *
     *
     * @apiExample Example usage:
     * curl -H "x-access-token:abc" -i  https://motorshop-85ou.onrender.com/api/orders
     *
     * @apiSuccess {Number} count number of orders
     * @apiSuccess {Array} orders list product of orders
     * @apiSuccess {String} _id the ID of orders
     * @apiSuccess {Object} product product data
     * @apiSuccess {Number} quantity quantity of product
     * @apiSuccess {String} buyer Id of buyer's oreders
     * 
     * 
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     *     {
     *       "count": 1,
     *       "orders":[
     *            {
     *              "_id": "637b2bc1eded7fc7049721cb",
     *              "product": {
     *                  "_id":"637a36104fd1ba490ff68fdc",
     *                  "name": "pro6",
     *                  "price": 100000
     *               }
     *              "quantity": "3",
     *              "buyer": 637a354d4fd1ba490ff68fd0,
     *           },
     *       ]
     *     }
     *
     *
     * @apiError invalid input data
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 400 Bad Request
     *     {
     *       "result":"fail",
     *       "message": "invalid input"
     *     }
     * 
     * @apiSampleRequest https://motorshop-85ou.onrender.com/api/orders
     */
    app.get("/api/orders", auth.verifyToken, controller.getOrders)

    /**
     * @api {GET} /api/orders/:orderId Get Order
     * @apiVersion 1.0.0
     * @apiName getOrder
     * @apiGroup Order
     * @apiPermission Every type of user
     * @apiHeader {String} x-access-token json web token to access to data
     *
     * @apiDescription get a orders
     *
     * @apiParam {string} orderId ID of order, on params
     * 
     * @apiExample Example usage:
     * curl -H "x-access-token:abc" -i https://motorshop-85ou.onrender.com/api/orders/637b88bbe3e57de695500898
     *
     * @apiSuccess {String} _id the ID of orders
     * @apiSuccess {Object} product product data
     * @apiSuccess {Number} quantity quantity of product
     * @apiSuccess {String} buyer Id of buyer's oreders
     * 
     * 
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     *     {
     *       "orders":[
     *            {
     *              "_id": "637b2bc1eded7fc7049721cb",
     *              "product": {
     *                  "_id":"637a36104fd1ba490ff68fdc",
     *                  "name": "pro6",
     *                  "price": 100000
     *               }
     *           },
     *       ]
     *     }
     *
     *
     * @apiError invalid input data
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 400 Bad Request
     *     {
     *       "result":"fail",
     *       "message": "invalid input"
     *     }
     * 
     * @apiSampleRequest https://motorshop-85ou.onrender.com/api/orders/:orderId
     */
    
    app.get("/api/orders/:orderId", auth.verifyToken, controller.getOrder)

    
    
    /**
     * @api {POST} /api/orders post Order
     * @apiVersion 1.0.0
     * @apiName postOrder
     * @apiGroup Order
     * @apiPermission Every type of user
     * @apiHeader {String} x-access-token json web token to access to data
     *
     * @apiDescription create a orders
     *
     * @apiBody {String} productId ID of product
     * @apiBody {Number} quantity quantity of the product
     * 
     * @apiExample Example usage:
     * curl -H "x-access-token:abc"-i  https://motorshop-85ou.onrender.com/api/orders/
     *
     * @apiSuccess {String} _id the ID of orders
     * @apiSuccess {String} productId the ID of product
     * @apiSuccess {Number} quantity quantity of product
     * 
     * 
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     *     {
     *       "currentOrder":{
     *              "_id": "637b2bc1eded7fc7049721cb",
     *              "productId": "637a3174457d58c281b4bb3e",
     *              "quantity": 2
     *        }
     *        "message": "Order Stored",
     *     }
     *
     *
     * @apiError invalid input data
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 400 Bad Request
     *     {
     *       "result":"fail",
     *       "message": "invalid input"
     *     }
     * 
     * @apiSampleRequest https://motorshop-85ou.onrender.com/api/orders
     */
    app.post("/api/orders", auth.verifyToken, controller.postOrder)
    
    /**
     * @api {PATCH} /api/orders/:orderId Update
     * @apiVersion 1.0.0
     * @apiName updateOrder
     * @apiGroup Order
     * @apiPermission Every type of user
     * @apiHeader {String} x-access-token json web token to access to data
     *
     * @apiDescription Update order
     *
     * @apiParam {String} orderId Order ID
     * 
     * @apiBody {Number} quantity Number of product
     *
     * @apiExample Example usage:
     * curl -H "x-access-token: abc"-i  https://motorshop-85ou.onrender.com/api/api/orders/637a316c457d58c281b4bb3a
     *
     * @apiError invalid input data
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 400 Bad Request
     *     {
     *       "result":"fail",
     *       "message": "invalid input"
     *     }
     * 
     * @apiSampleRequest https://motorshop-85ou.onrender.com/api/orders/:orderId
     */
    app.patch("/api/orders/:orderId", auth.verifyToken, controller.updateOrder)
    
    /**
     * @api {DELETE} /api/orders/:orderId delete Order
     * @apiVersion 1.0.0
     * @apiName deleteOrder
     * @apiGroup Order
     * @apiPermission Every type of user
     * @apiHeader {String} x-access-token json web token to access to data
     *
     * @apiDescription delete a orders
     *
     * @apiParam {string} orderId ID of order, on params
     * 
     * @apiExample Example usage:
     * curl -H "x-access-token:abc" -i  https://motorshop-85ou.onrender.com/api/orders/
     *
     * @apiSuccess {String} _id the ID of orders
     * 
     * 
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     *     {
     *       "data":{
     *          "_id": "637b88c2e3e57de6955008a1"
     *       }
     *       "message": "Order deleted"
     *     }
     *
     *
     * @apiError invalid input data
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 400 Bad Request
     *     {
     *       "result":"fail",
     *       "message": "invalid input"
     *     }
     * @apiSampleRequest https://motorshop-85ou.onrender.com/api/orders/:orderId
     */
    app.delete("/api/orders/:orderId", auth.verifyToken, controller.deleteOrder)
}