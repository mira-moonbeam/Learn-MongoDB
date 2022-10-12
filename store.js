const UserModel = require("./models/user.js")
const uri = process.env.MONGODB_URI;



module.exports = {
  createANewUser: function(username, password, callback) {
    const newUserDbDocument = new UserModel({
      username: username,
      password: password
    })

    newUserDbDocument.save(function(error) {
      if (error) {
        callback({error: true})
      } else {
        callback({success: true})
      }
    })
  }, 

  loginUser: function(username, password, callback) {
    UserModel.findOne({username: username}).exec(function(error, user) {
      if (error) {
        callback({error: true})
      } else if (!user) {
        callback({error: true})
      } else {
        user.comparePassword(password, function(matchError, isMatch) {
          if (matchError) {
            callback({error: true})
          } else if (!isMatch) {
            callback({error: true})
          } else {
            callback({success: true})
          }
        })
      }
    })
  }
}