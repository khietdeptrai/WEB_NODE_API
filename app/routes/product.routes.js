const controller = require("../controllers/product.controller");
const { auth } = require("../middlewares");

module.exports = function(app){  
    

    /**
     * @api {GET} /api/products/:productId Get a product
     * @apiVersion 1.0.0
     * @apiName getProduct
     * @apiGroup Product
     * @apiPermission Every one
     *
     * @apiDescription Get one product
     * 
     * @apiParam {string} productId ID of product, on params
     *
     * @apiExample Example usage:
     * curl -i https://motorshop-85ou.onrender.com/api/products/63996fb5bf161442415fc18f
     *
     * @apiSuccess {String} _id the id of product
     * @apiSuccess {String} title title of product
     * @apiSuccess {String} color color of product
     * @apiSuccess {Number} price price of product
     * @apiSuccess {String} desc desc of product
     * @apiSuccess {String} img image of product
     * @apiSuccess {Array} categories categories of product
     *
     * 
     * @apiErrorExample Error-Response:
     *    HTTP/1.1 404 Not Found
     *    {
     *      "message": "No such Product Found!!"
     *    }
     * 
     * @apiError invalid input data
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 400 Bad Request
     *     {
     *       "result": "fail",
     *       "message": "",
     *     }
     * 
     * @apiSampleRequest https://motorshop-85ou.onrender.com/api/products/:productId
     */
    app.get("/api/products/:productId", controller.getProduct);

    /**
     * @api {GET} /api/products Get all products
     * @apiVersion 1.0.0
     * @apiName getAllProducts
     * @apiGroup Product
     * @apiPermission Every one
     *
     * @apiDescription List all of product
     *
     * @apiExample Example usage:
     * curl -i https://motorshop-85ou.onrender.com/api/products
     *
     * @apiSuccess {Number} count the number of product
     * @apiSuccess {Array} products list data of product
     *
     * @apiError invalid input data
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 400 Bad Request
     *     {
     *       "result": "fail",
     *       "message": "",
     *     }
     * 
     *  @apiSampleRequest https://motorshop-85ou.onrender.com/api/products
     */
    app.get("/api/products",controller.getAllProducts);

    /**
     * @api {POST} /api/manage/products Add one
     * @apiVersion 1.0.0
     * @apiName addProduct
     * @apiGroup Product
     * @apiPermission just moderator user
     * @apiHeader {String} x-access-token json web token to access to data
     *
     * @apiDescription add product
     *
     * @apiBody {String} [title] Title of product 
     * @apiBody {String} [color] Color of Product 
     * @apiBody {Number} [price] Price of product      * 
     * @apiBody {String} [desc] desc of product 
     * @apiBody {String} [img] img of product
     * @apiBody {Array} [categories] categories of product
     * 
     * 
     * @apiError Not found product
     * 
     * @apiExample Example usage:
     * curl -H "x-access-token: abc" -i  https://motorshop-85ou.onrender.com/api/manage/products
     *
     * @apiSuccess {Object} createdProduct information of product
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
     * @apiSampleRequest https://motorshop-85ou.onrender.com/api/manage/products
     */
    app.post("/api/manage/products",controller.postNewProduct);
    
    /**
     * @api {PATCH} /api/manage/products/:productId Update
     * @apiVersion 1.0.0
     * @apiName updateProduct
     * @apiGroup Product
     * @apiPermission just moderator user
     * @apiHeader {String} x-access-token json web token to access to data
     *
     * @apiDescription update product
     *
     * @apiParam {string} productId ID of product, on params
     * 
     * @apiBody {String} [title] Title of product 
     * @apiBody {String} [color] Color of Product
     * @apiBody {Number} [price] Price of product      *  
     * @apiBody {String} [desc] desc of product 
     * @apiBody {String} [img] img of product
     * @apiSuccess {Array} [categories] categories of product
     * 
     *  
     * 
     * @apiExample Example usage:
     * curl -H "x-access-token: abc"-i  https://motorshop-85ou.onrender.com/api/manage/products/63996fb5bf161442415fc18f
     *
     * @apiSuccess {Object} createdProduct information of product
     * @apiError invalid input data
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 400 Bad Request
     *     {
     *       "result":"fail",
     *       "message": "invalid input"
     *     }
     * 
     * @apiSampleRequest https://motorshop-85ou.onrender.com/api/manage/products/:productId
     */
    app.patch("/api/manage/products/:productId",[auth.verifyToken, auth.isModerator], controller.updateProduct);


    /**
     * @api {PATCH} /api/manage/products/img/:productId Add image
     * @apiVersion 1.0.0
     * @apiName addImg
     * @apiGroup Product
     * @apiPermission just moderator user
     * @apiHeader {String} x-access-token json web token to access to data
     *
     * @apiDescription add image of product
     *
     * @apiParam {string} productId ID of product, on params
     * 
     * @apiBody {File} [img] image of product 
     *
     * @apiExample Example usage:
     * curl -H "x-access-token: abc"-i  https://motorshop-85ou.onrender.com/api/manage/products/img/63996fb5bf161442415fc18f
     *
     * @apiSuccess {Object} createdProduct information of product
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
     * @apiSampleRequest https://motorshop-85ou.onrender.com/api/manage/products/img/:productId
     */
    const multer = require('multer');
    const storage = multer.diskStorage({});
    const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb('invalid image file!', false);
    }
    };
    const uploads = multer({ storage, fileFilter });
    app.patch("/api/manage/products/img/:productId",[auth.verifyToken, auth.isModerator],uploads.single('img'), controller.uploadImg);
    

    /**
     * @api {DELETE} /api/manage/products/:productId Delete
     * @apiVersion 1.0.0
     * @apiName deleteProduct
     * @apiGroup Product
     * @apiPermission just moderator user
     * @apiHeader {String} x-access-token json web token to access to data
     *
     * @apiDescription delete product
     *
     * @apiParam {string} productId ID of product, on params
     *
     * @apiExample Example usage:
     * curl -H "x-access-token:abc" -i  https://motorshop-85ou.onrender.com/api/manage/products/63996fb5bf161442415fc18f
     *
     * @apiSuccess {String} _id Id of deleted product
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *          "data"{
     *                "_id": "63996fb5bf161442415fc18f",
     *          }
     *          "message":"Product Delete Successfully"
     *     }
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
     *  @apiSampleRequest https://motorshop-85ou.onrender.com/api/manage/products/:productId
     */
    app.delete("/api/manage/products/:productId",[auth.verifyToken, auth.isModerator], controller.deleteProduct);
};