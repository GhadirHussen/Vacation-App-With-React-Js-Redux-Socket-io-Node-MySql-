const jwt = require('jsonwebtoken');


function verifyToken(req, res, next) {
   
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.send('your are not login')
    }

} 

function getToken(payload) {

    const token = jwt.sign(payload, process.env.JWT, { expiresIn: "30m" });
    return token;
}


module.exports = {verifyToken, getToken}  



