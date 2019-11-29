let User = require('../model/user');
const UserModel = mongoose.model('User', User.user);

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
