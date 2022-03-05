import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();
const alerts = (message: any, type: string) => {
    
   

    const styles = {
        hideProgressBar: true,
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
        closeButton: false,
    }
 
    switch (type) {
        case type = 'success':
            toast.success(message, styles); 
            break; 

        case type = 'info':
            toast(message, styles); 
            break; 

        case type = 'error':  
            toast.error(message, styles); 
            break;

        default:
            toast(message , styles);
            break;
    }
}

export default alerts