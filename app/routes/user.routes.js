const { auth } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {

    /**
     * @api {GET} /api/user Get user
     * @apiVersion 1.0.0
     * @apiName getUser
     * @apiGroup User
     * @apiPermission every type of user
     * @apiHeader {String} x-access-token json web token to access to data
     *
     * @apiDescription Get user information
     * 
     *
     * @apiExample Example usage:
     * curl -i https://motorshop-85ou.onrender.com/api/user
     *
     * @apiSampleRequest https://motorshop-85ou.onrender.com/api/user
     */
    app.get("/api/user", auth.verifyToken, controller.getUser);

    /**
     * @api {PATCH} /api/user Update user
     * @apiVersion 1.0.0
     * @apiName updateProduct
     * @apiGroup User
     * @apiPermission every type of user
     * @apiHeader {String} x-access-token json web token to access to data
     *
     * @apiDescription update product
     *  
     *
     * @apiBody {String} [firstname] Firstame of user 
     * @apiBody {String} [lastname] Lastname of user 
     * @apiBody {String} [email] Email of user  
     * @apiBody {String} [address] Address of user   
     * @apiBody {String} [contact] Contact of user 
     *
     * @apiExample Example usage:
     * curl -H "x-access-token: abc"-i  https://motorshop-85ou.onrender.com/api/manage/products/63996fb5bf161442415fc18f
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
     * @apiSampleRequest https://motorshop-85ou.onrender.com/api/user
     */
    app.patch("/api/user", auth.verifyToken, controller.updateInformation);
}