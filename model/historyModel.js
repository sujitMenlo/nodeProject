const Schema = mongoose.Schema;

const history = new Schema({
    name: {
		type: String,
		required: 'Enter a first name'
	},
	email: {
		type: String,
		required: 'Enter a last name'
    },
    userId:{
        type: String,
		required: "Password is required",
    },
	created_date: {
		type: Date,
		default: Date.now
    }
});

module.exports = {
	history
}