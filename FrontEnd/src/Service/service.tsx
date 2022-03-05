import axios from "axios";
import globalPort from './globals';
import alertService from '../Service/alertService';



export default class Service {

    public post: string;
    public get: string;
    public delete: string;
    public put: string;
    public path: string;
    public option : object;
    public err : any;

    constructor () {

        this.post = "POST"; 
        this.get = "GET";
        this.delete = "DELETE";
        this.put = "PUT";
        this.path = '';
        this.option = {};
    }


    createRequest = async (method: string, url: string, values: any)  => {

        this.option = { 
            method: method,
            url: `${globalPort.baseURL}/${url}`,
            data: values
        } 

        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

        try {
          const result = await axios(this.option);
          return result.data;
        } catch (err) {
            this.err = err;
           return alertService(this.err.response.data, 'error')
        } 

 
    } 
}
 

