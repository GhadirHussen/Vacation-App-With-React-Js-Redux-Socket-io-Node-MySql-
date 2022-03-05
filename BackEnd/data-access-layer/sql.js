const mysql = require('mysql');

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.NAME,
});
connection.connect(err => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('You are connected to vacation DB');
});

function executeAsync(sql) {
    return new Promise((resolve, reject) => {
        connection.query(sql ,(err , result) => {
            if(err){
                reject(err);
                return;
            }
            resolve(result);
        });
    });
}

module.exports = {
    executeAsync
}