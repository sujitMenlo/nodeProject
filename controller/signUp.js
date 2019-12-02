let User = require('../model/user');
let History = require('../model/historyModel')
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

/**
 * Represents a book.
 * @constructor
 * @param {string} signUp - this method is used for sign UP.
 * @param {string} author - The author signUp method is sujit kumar.
 */

let signUp = async (req, res, next) => {
	req.body.password = passwordHash.generate(req.body.password)
	let newUser = new UserModel(req.body);
	try {
		let checkEmail = await UserModel.find({ email: req.body.email }).lean().exec();
		if(_.size(checkEmail)>0){
			return res.send('false')
		}
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

/**
 * Represents a book.
 * @constructor
 * @param {string} craeteHistory - this method is used for sign UP.
 * @param {string} author - The author craeteHistory method is sujit kumar.
 */

let craeteHistory = async (object, next)=>{
	var historyInfo = new HistoryClass(object);
	let newHistory = new HistoryModel(historyInfo);
	try{
		await newHistory.save();
		return true;
	} catch(e){
		return (e)
		//next(e);
	}
}

/**
 * Represents a book.
 * @constructor
 * @param {string} login - this method is used for sign UP.
 * @param {string} author - The author login method is sujit kumar.
 */

let login = async (req, res, next) => {
	try {
		var loginCredentials = new LoginCredentials(req);
		var userInfo = await UserModel.find({ email: loginCredentials.email }).lean().exec();
		var id  = userInfo[0]._id.toString();
		if(_.size(userInfo)== 0){
			return res.send('record not found');
		}
		if(passwordHash.verify(loginCredentials.password, userInfo[0].password) ){
			await craeteHistory(userInfo[0]);
			return res.send('Success');
		}
		return res.send('invalid password');
	} catch (e) {
		next(e);
	}

}

/**
 * Represents a book.
 * @constructor
 * @param {string} getHistory - this method is used for sign UP.
 * @param {string} author - The author getHistory method is sujit kumar.
 */


 let getHistory = async (req, res, next) => {
	try {
		// this is implemented without populate 
		var userDetails = await UserModel.find({ email: req.body.email });
		console.log(userDetails[0]._id.toString());
		var history = await HistoryModel.find({userId: new ObjectId(userDetails[0]._id.toString())})

		// need to implement with populate 

		return res.send({data:history});
	} catch (e) {
		next(e);
	}

}





module.exports = {
	signUp,
	login,
	getHistory
}


