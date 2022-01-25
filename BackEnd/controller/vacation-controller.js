const express = require('express');
const router = express.Router();
const vacationLogic = require('../business-logic/vacation-logic')
const verifyLogged = require('../middleware/verify-logged-in');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const uuid = require('uuid');
const VacationModel = require('../Models/VacationModel');
const { addVacationValidation } = require('../validation/validation');


//get all vacation 
router.get('/', async (request, response) => {
    try {
        const vacations = await vacationLogic.getAllVacations();
        response.json(vacations);
    } catch (error) {
        response.status(500).send(error);
    }
});

//get vaccation by id
router.get('/:id', async (request, response) => {
    try {
        const id = +request.params.id;
        const vacation = await vacationLogic.getOneVacation(id);
        response.json(vacation[0]);
    } catch (error) {
        response.status(500).send(error);

    }
});

//insert follow vacation
router.post('/followVacation', async (request, response) => {
    try {
        const info = request.body;
        const sendInfo = await vacationLogic.followVacation(info);
        response.json(sendInfo);
    } catch (error) {
        response.status(500).send(error);
    }
});

//get all follow vacation of the user
router.get('/get-followed-vacations/:id', async (request, response) => {
    try {
        const id = request.params.id;
        const vacations = await vacationLogic.getFollowedVacations(id);
        response.json(vacations);
    } catch (error) {
        response.status(500).send(error);
    }
});

// remove followed vacation 
router.delete('/delete/:vacationID/:userID', async (request, response) => {
    try {
        const userID = +request.params.userID;
        const vacationID = +request.params.vacationID;
        await vacationLogic.deleteFollowedVacation(userID, vacationID);
        response.sendStatus(204);
    } catch (error) {
        response.status(500).send(error);

    }
});

//create new vacation **valid only for the admin
router.post('/new-vacation' , addVacationValidation, verifyLogged.verifyToken, async (request, response) => {

    try {
        
        jwt.verify(request.token, 'secretkey', (err, authData) => {
            if (authData.user.isAdmin !== 1) {
                throw "Error !"
            }
        });

        const vacation = new VacationModel(request.body);
        
        if (!request.files) {
            response.status(400).send('No File Sent !');
            return;
        } 
        ///check if the depart date bigger than return date//
        if(vacation.fromDate >= vacation.toDate || vacation.toDate <= vacation.fromDate){
            response.status(400).send('The Depart date cannot be bigger than Return date !');
            return;
        }

        const file = request.files.image;
        const randomName = uuid.v4();
        const extension = file.name.substr(file.name.lastIndexOf('.'));
        const fileName = randomName + extension;
        vacation.imageName = fileName;
        file.mv('../FrontEnd/public/assets/images/vacations/' + fileName);
        // vacation.imageName = randomName + extension;


        const newVacation = await vacationLogic.addNewVacation(vacation);

        response.status(201).json(newVacation);
    } catch (error) {
        response.status(500).send(error);
    }
});


 
//delete vacation **valid only for the admin
router.delete("/delete-vacation/:id", verifyLogged.verifyToken, async (request, response) => {
    try {
        jwt.verify(request.token, 'secretkey', (err, authData) => {
            if (authData.user.isAdmin !== 1) {
                throw "Error !"
            }
        });

        const id = +request.params.id;
        const vacation = new VacationModel(request.body);
        vacation.vacationID = id;
        
        await vacationLogic.deleteVacation(id);
        fs.unlinkSync(`../FrontEnd/public/assets/images/vacations/${vacation.imageName}`);
        response.sendStatus(204)
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

//edit the data of the vacation **valid only for the admin
router.put('/update-vacation/:id', addVacationValidation, verifyLogged.verifyToken,
    async (request, response) => {

        try {
            jwt.verify(request.token, 'secretkey', (err, authData) => {
                if (authData.user.isAdmin !== 1) {
                    throw "Error !"
                }
            });
            
            const id = +request.params.id; 
            const randomName = uuid.v4();
            const vacation =  new VacationModel(request.body);
            vacation.vacationID = id;

            if(vacation.fromDate >= vacation.toDate || vacation.toDate <= vacation.fromDate){
                response.status(400).send('The Depart date cannot be bigger than Return date !');
                return;
            }
        
             if (request.files) {
                const file = request.files.image;
                const extension = file.name.substr(file.name.lastIndexOf('.'));
                const fileName = randomName + extension;
                vacation.imageName = fileName;
                file.mv('../FrontEnd/public/assets/images/vacations/' + fileName);
                // vacation.imageName = randomName + extension;
            }

            const updatedVacation = await vacationLogic.updateVacation(vacation);
            response.json(updatedVacation);

            if (updatedVacation === null) {
                response.sendStatus(404);
                return;
            } 
        } catch (error) {
            response.status(500).send(error);
        }
});



 
module.exports = router;