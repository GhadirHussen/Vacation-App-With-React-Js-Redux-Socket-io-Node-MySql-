const Joi = require("joi");

class User {

  constructor(user){

    this.user_id = user.user_id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.userName = user.userName;
    this.password = user.password;
    this.isAdmin = user.isAdmin;    
  }
}

module.exports = User;
