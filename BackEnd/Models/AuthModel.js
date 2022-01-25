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

  validatePost() {
    const schema = {
      user_id: Joi.optional(),
      first_name: Joi.string().required().min(0).max(20),
      last_name: Joi.string().required().min(0).max(30),
      user_name: Joi.string().required().min(0).max(30),
      password: Joi.string().required().min(6).max(30),
      isAdmin: Joi.boolean().optional(),
    };
    const result = Joi.validate(this, schema, { abortEarly: false }); 
    return result.error ? result.error.details[0] : null; 

  }
}

module.exports = User;
