const dal = require('../data-access-layer/vacation-dal');

async function getAllVacations() {
    const vacations = await dal.getAllVacations();
    return vacations;
}

async function getOneVacation(id) {
    const vacation = await dal.getOneVacation(id);
    return vacation;
}

async function followVacation(data) {
    const vacation = await dal.followVacation(data);
    return vacation;
}

async function getFollowedVacations(id) {
    const vacations = await dal.getFollowedVacations(id);
    return vacations;
}

async function deleteFollowedVacation(user_id, vacation_id) {
    await dal.deleteFollowedVacation(user_id, vacation_id);
}

async function addNewVacation(vacation) {
    return await dal.addNewVacation(vacation);
}

async function deleteVacation(id) {
    const vacation = await dal.deleteVacation(id);
    return vacation;
}

async function updateVacation(vacation) {
    const info = await dal.updateVacation(vacation);
    return info
}


module.exports = {
    getAllVacations,
    followVacation,
    getFollowedVacations,
    deleteFollowedVacation,
    addNewVacation,
    deleteVacation,
    getOneVacation,
    updateVacation,
}