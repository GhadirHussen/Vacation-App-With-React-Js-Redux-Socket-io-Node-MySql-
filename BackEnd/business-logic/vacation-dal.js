const sqlConnect = require('../data-access-layer/sql');

async function getAllVacations() {
    const sql = `SELECT vacations.vacationID, vacations.description, vacations.destination, vacations.imageName,
    DATE_FORMAT(fromDate, "%d-%m-%Y") as "fromDate", 
    DATE_FORMAT(toDate, "%d-%m-%Y") as "toDate", 
    vacations.price, COUNT(followvacations.vacationID) AS numFollowers
    FROM vacations 
    LEFT JOIN followvacations 
    ON vacations.vacationID = followvacations.vacationID
    GROUP BY vacationID`
    const vacations = await sqlConnect.executeAsync(sql);
    return vacations;
}


async function getOneVacation(id) {
    const sql = `SELECT * from vacations WHERE vacationID = ${id}`;
    const vacation = await sqlConnect.executeAsync(sql);
    return vacation;
}


async function followVacation(data) {
    const sql = `INSERT INTO followvacations(userID,vacationID)
    VALUES(${data.user} ,${data.vacation})`;
    const vacation = await sqlConnect.executeAsync(sql);
    return vacation;
}

async function getFollowedVacations(userID) { 
    const sql = `SELECT vacationID FROM followvacations 
    where userID = ${userID} `;
    const vacations = await sqlConnect.executeAsync(sql);
    return vacations;
}

async function deleteFollowedVacation(userID, vacationID) {
    const sql = `DELETE FROM followvacations WHERE userID = ${userID} and vacationID = ${vacationID}`;
    await sqlConnect.executeAsync(sql);
}


async function addNewVacation(vacation) {
    const sql = `INSERT INTO vacations(description,destination,imageName,fromDate,toDate,price)
    VALUES('${vacation.description}','${vacation.destination}','${vacation.imageName}',
    '${dateFormat(vacation.fromDate)}','${dateFormat(vacation.toDate)}',${vacation.price})`;
    const info = await sqlConnect.executeAsync(sql);
    vacation.vacationID = info.insertId;
    return vacation;
}


async function deleteVacation(id) {
    const sql = `DELETE FROM vacations WHERE vacationID = ${id}`;
    const vacation = await sqlConnect.executeAsync(sql);
    return vacation;
}


async function updateVacation(vacation) { 

    const sql = `
        UPDATE vacations SET
        destination = '${vacation.destination}', 
        description = '${vacation.description}',
        fromDate = '${dateFormat(vacation.fromDate)}',
        toDate = '${dateFormat(vacation.toDate)}',
        imageName = '${vacation.imageName}',
        price = ${vacation.price}
        WHERE vacationID = ${vacation.vacationID}`;

    const info = await sqlConnect.executeAsync(sql);
    return info.affectedRows === 0 ? null : vacation;
}


const dateFormat = (data) => { 
    const newDate = new Date(data);
    const year = newDate.getFullYear(); 
    const month = newDate.getMonth() + 1;
    const day = newDate.getDate();
    return `${year}-${month}-${day}`;
}   

module.exports = {
    getAllVacations,
    followVacation,
    getFollowedVacations,
    deleteFollowedVacation,
    addNewVacation,
    deleteVacation,
    getOneVacation,
    updateVacation
}