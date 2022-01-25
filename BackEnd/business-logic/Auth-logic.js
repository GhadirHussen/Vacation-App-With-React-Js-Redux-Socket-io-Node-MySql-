const dal = require('../data-access-layer/Auth-dal');

async function addUser(user) {
   return await dal.addUser(user);
}

async function login(user) {
    const login = await dal.login(user);
    return login;
}

module.exports = { addUser, login }