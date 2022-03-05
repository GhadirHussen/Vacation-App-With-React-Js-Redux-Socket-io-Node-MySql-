import Service from './service';
import alertService from '../Service/alertService';


class AuthService extends Service {
  
    public authURL: string;
    constructor () {
        super();
        this.authURL = 'auth';
    } 
    
 
    login = async (values: object) => {
        this.path = `${this.authURL}/login`;
        const result = await this.createRequest(this.post, this.path, values);
        localStorage.setItem('token', result[0].token);
        alertService(`Hi ${result[0].userName} How Are You !`, 'info');
        return result; 
    }  


    register = async (values: object) => { 
       
        this.path = `${this.authURL}/register`; 
        const result = await this.createRequest(this.post, this.path, values);
        if(result) {
            alertService('your register is successfully !', 'success');
            return result;
        } 
        return result; 
    } 


    getCurrentUser = async () => {

        this.path = `${this.authURL}/login`;
        const result = await this.createRequest(this.get, this.path, null);
        return result; 
    }
 
}


export default new AuthService();
 
 