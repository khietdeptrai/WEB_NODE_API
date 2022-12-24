
const Product = require("../models/product.model");
const cloudinary = require("../config/cloudinary")


exports.getAllProducts = (req, res) =>{
    Product.find()
    .select('_id title desc img categories color price')
	.exec()
	.then(docs=>{
		const response = {
		   	count:docs.length,
		   	products:docs.map((doc)=>{
		   		return {
		   			id:doc.id,
		   			title:doc.title,
					color: doc.color,
					price:doc.price,
					desc:doc.desc,
					img: doc.img,
					categories: doc.categories,
		   		}
		   	})
		}
		res.status(200).json(response);
	})
	.catch(err=>{
		res.status(500).json({
		   	error:err
		});
	});
}

exports.postNewProduct = (req,res)=>{
	const product = new Product({
		title : req.body.title,
		color : req.body.color,
		price : req.body.price,		
		desc : req.body.desc,
		img : req.body.img,
		categories : req.body.categories,
	});

	product.save()
	.then(result => {
		res.status(201).json({
			message : 'Product Created Successfully!!',
			createdProduct:{
				id:result.id,
				color:result.color,
				title:result.title,
				price:result.price,               
                desc:result.desc,
				img:result.img,
				categories:result.categories,
			}
		});
	})
	.catch(err=>{
		res.status(500).json({
			error:err
		});
	});
};

exports.uploadImg = (req,res)=>{
	const id = req.params.productId;
	try{
		cloudinary.uploader.upload(req.file.path)
		.then(result=>{
			Product.findByIdAndUpdate(id, {Img_link: result.url}, {new:true})
			.exec()
			.then(result=>{
				res.status(200).json({
					message:"Product uploadImg Successfully",
					result
				})
			})
			.catch(err=>{
				res.status(500).json({
					error:err
				})
			})
		});
	}
	catch(err)
	{
		console(err)
	}
	
	
}
exports.getProduct = (req,res)=>{
	const id = req.params.productId;
	Product.findById(id)
	.select('_id title desc img categories color price')
	.exec()
	.then(doc=>{
		if(doc){
		   	res.status(200).json({

				product:{
					id:doc.id,
		   			title:doc.title,
					color: doc.color,					
		   			price:doc.price,
					desc:doc.desc,
					img: doc.img,
					categories: doc.categories,
				}
		   	});
		}
		else{
		   	res.status(404).json({
		   		message:"No such Product Found!!"
		   	});
		}
	})
	.catch(err=>{
		res.status(500).json({
		   	error:err
		});
	});
};

exports.updateProduct = (req,res)=>{
    const id = req.params.productId;

    Product.findByIdAndUpdate(id, req.body, {new:true})
    .exec()
    .then(result=>{
        res.status(200).json({
            message:"Product Updated Successfully",
            result
        })
    })
    .catch(err=>{
		res.status(500).json({
		   	error:err
		})
    })
}

exports.deleteProduct = (req, res)=>{
    const id = req.params.productId;
	
    Product.findByIdAndDelete(id)
    .exec()
    .then((result)=>{
        res.status(200).json({
			data:{
				_id:result._id,
			},
            message:"Product Deleted"
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
}