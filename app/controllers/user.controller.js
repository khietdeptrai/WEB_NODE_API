const db = require("../models");
const User = db.user;

exports.updateInformation = (req,res)=>{
    const id = req.userId;
    User.findByIdAndUpdate(id, req.body, {new:true})
    .exec()
    .then((doc)=>{
        res.status(200).json({
            message:"Information Updated Successfully",
			doc:doc
        })
    })
    .catch(err=>{
		res.status(500).json({
		   	error:err
		})
    })
}

exports.getUser=(req,res)=>{
    const id = req.userId;
	User.findById(id)
	.select('_id username firstname lastname email address contact')
	.exec()	
	.then(doc=>{
		res.status(200).json({
		   	user:doc,
		});
		
	})
	.catch(err=>{
		res.status(500).json({
		   	error:err
		});
	});
}