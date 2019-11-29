const Schema = mongoose.Schema;

const user = new Schema({
	firstName: {
		type: String,
		required: 'Enter a first name'
	},
	lastName: {
		type: String,
		required: 'Enter a last name'
    },
    password:{
        type: String,
		required: "Password is required",
    },
	email: {
		type: String,
		required: "Enter a  email",
		validate: {
			validator: function (text) {
				return _.includes(text, '@')
			},
			message: 'Please enter a valid email'
		}
	},
	phone: {
		type: Number
	},
	created_date: {
		type: Date,
		default: Date.now
	}
});

module.exports = {
	user
}
