global.config = require(process.env.NODE_ENV === "production" ? "./config-prod.json" : "./config-dev.json");
const express = require('express');
const server = express();
const cors = require('cors');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const socketIO = require('socket.io');

const port = 3001;
const local = `http://localhost:${port}`;

const vacationController = require('./controller/vacation-controller');
const vacationsLogic = require('./business-logic/vacation-logic');
const authController = require('./controller/Auth-controller');

server.use(fileUpload());
server.use(cors());
server.use(express.json());

if (!fs.existsSync('../FrontEnd/public/assets/images/vacations')) {
    fs.mkdirSync('../FrontEnd/public/assets/images/vacations');
}

server.use('/api/auth' , authController)
server.use('/api/vacations', vacationController);


const listener = server.listen(port, () => console.log(`Listening.... ${local}`));


//socket //
const socketsManager = socketIO(listener);
socketsManager.sockets.on("connection", async socket => {
    socket.on('get-all-vacations', async () => {
        socketsManager.sockets.emit("get-all-vacations", await vacationsLogic.getAllVacations());
    });
    socket.on("msg-from-client", msg => console.log(msg));
});



  