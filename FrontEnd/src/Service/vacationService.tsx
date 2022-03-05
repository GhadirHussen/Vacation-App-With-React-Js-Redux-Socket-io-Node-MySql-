import Service from './service';
import VacationModel from '../models/vacation-model';


class VacationService extends Service {
  
    public vacationURL: string;
    constructor () {
        super();
        this.vacationURL = 'vacations';
    } 
    
 
    fetchVacation = async () => {

        this.path = `${this.vacationURL}`;
        const result = await this.createRequest(this.get, this.path , null);
        return result; 
    } 


          
    fetchVacationByID = async (vacationID: number) => {
      
        this.path = `${this.vacationURL}/${vacationID}`;
        const result = await this.createRequest(this.get, this.path , null);
        return result; 
    }
    
    
    updateVacation = async (vacation: VacationModel, vacationID: number) => {

      this.path = `${this.vacationURL}/update-vacation/${vacationID}`;
      const result = await this.createRequest(this.put, this.path , VacationModel.convertToFormData(vacation));
      return result; 

    }

    
    addNewVacation = async (vacation: VacationModel) => {

        this.path = `${this.vacationURL}/new-vacation`;
        const result = await this.createRequest(this.post, this.path , VacationModel.convertToFormData(vacation));
        return result; 
    }



    deleteVacation = async (vacation: VacationModel) => {

    
        this.path = `${this.vacationURL}/delete-vacation/${vacation.vacationID}`;
        const result = await this.createRequest(this.delete, this.path , vacation);
        return result;
    }

    getfollowVacation = async (userID: number) => { 
       
        this.path = `${this.vacationURL}/get-followed-vacations/${userID}`; 
        const result = await this.createRequest(this.get, this.path, null);
        return result; 
    }



    followVacation = async (sendInfo: object) => {

        this.path = `${this.vacationURL}/followVacation`; 
        return await this.createRequest(this.post, this.path, sendInfo);
    } 

    removeFollow = async (vacationID: number, userID: number) => {
        
        this.path = `${this.vacationURL}/delete/${vacationID}/${userID}`;
        return await this.createRequest(this.delete, this.path, null);
    }
 
}


export default new VacationService();
 
 