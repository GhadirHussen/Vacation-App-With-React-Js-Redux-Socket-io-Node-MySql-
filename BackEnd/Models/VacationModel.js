class VacationModel {
    constructor(vacation){
        this.vacationID = vacation.vacationID;
        this.description = vacation.description;
        this.destination = vacation.destination;
        this.imageName = vacation.imageName;
        this.price = vacation.price;
        this.fromDate = vacation.fromDate;
        this.toDate = vacation.toDate;
    }
}

module.exports = VacationModel;