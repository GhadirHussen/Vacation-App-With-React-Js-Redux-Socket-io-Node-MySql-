import axios from "axios";


const axiosJWT = axios.create({
        
    headers: {
        Authorization : `Bearer ${localStorage.getItem('token')}` 
    }
});

export default axiosJWT;