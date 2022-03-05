const sqlConnect = require('../data-access-layer/sql');
const bcrypt = require('bcrypt');

async function addUser(user) {

    const passHash = await bcrypt.hash(user.password, 10);

    const checkUserName = `SELECT * from users WHERE userName = '${user.userName}'`;
    const userNameResult = await sqlConnect.executeAsync(checkUserName);
    if (userNameResult.length != 0) {
        return 0;
    }

    const sql = `INSERT INTO users(firstName ,lastName ,userName, password ,isAdmin)
    VALUES ('${capitalize(user.firstName)}','${capitalize(user.lastName)}','${capitalize(user.userName)}','${passHash}',false)`;
    const result = await sqlConnect.executeAsync(sql);
    delete user.password;
    user.userID = result.insertId;
    user.isAdmin = false ;
    return user;
}


async function login(user) { 

    const sql = `SELECT * from users WHERE userName = "${user.userName}"`;
    const result = await sqlConnect.executeAsync(sql);
    if(result.length > 0) {
        return result;
    } 
    
    return 0;

}

const capitalize = (s) => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1)
}

module.exports = { addUser, login }  