const sqlConnect = require('../sql/sql');


async function addUser(user) {

    const checkUserName = `SELECT * from users WHERE userName = '${user.userName}'`;
    const userNameResult = await sqlConnect.executeAsync(checkUserName);
    if (userNameResult.length != 0) {
        return 0;
    }

    const sql = `INSERT INTO users(firstName ,lastName ,userName, password ,isAdmin)
    VALUES ('${user.firstName}','${user.lastName}','${user.userName}','${user.password}',false)`;
    const info = await sqlConnect.executeAsync(sql);
    delete user.password;
    user.userID = info.insertId;
    user.isAdmin = false ;
    return user;
}


async function login(user) {

    const sql = `SELECT * from users WHERE userName = "${user.userName}" and password = "${user.password}"`;;
    const login = await sqlConnect.executeAsync(sql);
    if (login.length === 0) {
        return 0;
    }
    return login;

}

module.exports = { addUser, login } 