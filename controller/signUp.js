let User = require('../model/user');
const UserModel = mongoose.model('User', User.user);
const HistoryModel = mongoose.model('history', History.history)
var ObjectId = require('mongoose').Types.ObjectId; 

var testModel = require('../model/test');

const UserModels = mongoose.model('Usr', testModel.UserSchema);
const PostModels = mongoose.model('Post', testModel.PostSchema)

class LoginCredentials {
	constructor(req) {
		this.email = req.body.email,
			this.password = req.body.password
	}

}

var user1 ={
	username :'sujit'
}
var user2 ={
	username :'kumar'
}
var contact ={
	content :'sujit@gmail.com'
}


let Test = async ()=>{
	await new UserModels(user1).save();
	await new UserModels(user2).save();
	await new PostModels(contact).save();

}
//Test();

let checkPopuleate = async ()=>{
		return testModel.User11.findOne({ username: 'sujit' })
		  .populate('posts').exec((err, posts) => {
			console.log("Populated User " + posts);
		  })
}

//checkPopuleate();

class HistoryClass {
	constructor(userinfo){
		this.name = userinfo.firstName+userinfo.lastName,
		this.email = userinfo.email,
		this.userId= userinfo._id.toString();
	}
}

let signUp = async (req, res, next) => {
	req.body.password = passwordHash.generate(req.body.password)
	let newUser = new UserModel(req.body);
	try {
		await newUser.save();
		return res.send('success')
	} catch (err) {
		var errorArray = [];
		_.forEach(Object.keys(err.errors), (row) => {
			errorArray.push({ "field": err.errors[row].message ? err.errors[row].message : "please check input" });
		});
		if (_.size(Object.keys(err.errors)) == _.size(errorArray)) {
			return res.send({ message: "error in save", errorType: errorArray });
		}
	}
}

module.exports = {
	signUp
}


// commit 1
