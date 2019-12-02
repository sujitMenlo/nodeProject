const UserSchema = new mongoose.Schema({
    username: String,
    postLists: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    }]
  })
const PostSchema = new mongoose.Schema({
    content: String,
    listOfUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usr'
    }
  })

module.exports = {
    PostSchema, UserSchema,
  }