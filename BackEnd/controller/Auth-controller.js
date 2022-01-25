const express = require('express');
const router = express.Router();
const authLogic = require('../business-logic/Auth-logic');
const jwt = require('jsonwebtoken');
const verifyLogged = require('../middleware/verify-logged-in');
const userModel = require('../Models/AuthModel');
const { addUserValidation } = require('../validation/validation');



/// Register ///
router.post('/register', addUserValidation , async (request, response) => {
    try {
        const user  = new userModel(request.body);
        const newUser  = await authLogic.addUser(user);
       
        if(newUser === 0) {
                
            return response.status(400).send("Username already exists choose another one !")
        }

        if(newUser) {

            return response.status(201).json(newUser)
        }
 
    } 
    catch (error) {
        response.status(500).send(error);
    }
});


/// Login /// 
router.post('/login', async (request, response) => { 
    try {
      
        const user = new userModel(request.body);
        const userLogin = await authLogic.login(user);
        if (userLogin === 0) {
            response.status(401).send("User name / Password is wrong");
        }
     
        response.status(201).json(userLogin);
    } catch (error) {
        response.status(500).send(error);
    }
});
  
///get the token ///
router.get('/login', verifyLogged.verifyToken , (request, response) => {
  
    jwt.verify(request.token, 'secretkey', (err, user) => {
        if (err) {
            response.json(err);
        } else {
            response.json(user);
        } 
    });
}); 

///save the token///
router.post('/login-save', (request, response) => {
    const user = request.body;
    jwt.sign({ user }, 'secretkey', (err, token) => {
        response.json({  token:token });
    });
});
 


module.exports = router;
