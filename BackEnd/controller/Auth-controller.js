const express = require('express');
const router = express.Router();
const authLogic = require('../business-logic/Auth-dal');
const jwt = require('jsonwebtoken');
const verifyLogged = require('../middleware/verify-logged-in');
const userModel = require('../Models/AuthModel');
const { addUserValidation } = require('../validation/validation');
const bcrypt = require('bcrypt');
const middleware =  require('../middleware/verify-logged-in');



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

  

// Login /// 
router.post('/login', async (request, response) => { 
    try {
      

        const user  = new userModel(request.body);
        const userLogin = await authLogic.login(user);

        if (!userLogin) {
            return response.status(400).send("This user name does not exist !");
        }

        const passComp = await bcrypt.compare(user.password, userLogin[0].password);


        if(!passComp) return response.status(401).send("The password is wrong !");

        const User = userLogin[0];
        userLogin[0].token = middleware.getToken({user: User});
        response.status(200).json(userLogin);
   
         
    } catch (error) {
        response.status(500).send(error);
    }
});   

  
router.get('/login', verifyLogged.verifyToken , (request, response) => {
  
    jwt.verify(request.token, process.env.JWT, (err, user) => {
        if (err) {
            response.json(err);
        } else {
            response.json(user);
        } 
    });
}); 
 


module.exports = router;
