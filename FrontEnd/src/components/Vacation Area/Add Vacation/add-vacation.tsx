import React , {useState} from 'react'
import axios from "axios";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import store from '../../../Redux/store';
import VacationModel from "../../../models/vacation-model";
import { ActionType } from "../../../Redux/reducer";
import io from 'socket.io-client';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import SaveIcon from '@material-ui/icons/Save';
import './add-vacation.css';

 

function AddVacation(): JSX.Element {

 
    const history = useHistory();
    const { register, handleSubmit, formState} = useForm<VacationModel>({});
    const socket = io.connect("http://localhost:3001");
    const [preview , setPreview] = useState(null);
    const [errors , setErrors] = useState();
 

    function addVacation(vacation: VacationModel) {

        const authAxios = axios.create({
        
            baseURL:'http://localhost:3001/api',
            headers: {
                Authorization : `Bearer ${localStorage.getItem('token')}` 
            }
        });

        
        authAxios.post<VacationModel>('/vacations/new-vacation',VacationModel.convertToFormData(vacation))
        .then(response => {

            const addedVacation = response.data;

            if(addedVacation.vacationID === undefined || null) {
                alert('Missing something check the fields');
                return;
            } else{
                store.dispatch({
                    type: ActionType.addNewVacation,
                    payload: addedVacation
                });
                history.push("/");
                alert("Vacation has been added. ID: " + addedVacation.vacationID);
                socket.emit("get-all-vacations");
            }
        })
        .catch(err => {
            setErrors(err.response.data)
            console.log(err.response.data);
        });
    }

    const handelChange = (e:  React.ChangeEvent<HTMLInputElement>) => {
        const imageSelected = (e.target as HTMLInputElement).files[0];
        const filePreview = URL.createObjectURL(imageSelected);
        setPreview(filePreview)
    }
 

    return (

        <div className="add-container">
            {
                errors ? <h4 className='error'>{errors}</h4>
                :
                <h2>Add New Vacation</h2>
            } 
            
            <form onSubmit={handleSubmit(addVacation)}> 
                <table>

                    <tr>
                        <th>Destination</th>
                        <th>Price</th>
                    </tr>
            
                    <tr>
                        <td>
                            <Input type="text" name="destination"
                            {...register('destination', { required: true, minLength: 3 ,maxLength:15 })}/>  
                            {formState.errors.destination?.type === "required" &&
                            <span className='span'>Missing destination !</span>
                            }
                            {formState.errors.destination?.type === "minLength" &&
                            <span className='span'>Destination name too short !</span>
                            }
                            {formState.errors.destination?.type === "maxLength" &&
                            <span className='span'>Destination name is too long !</span>
                            }
                            
                        </td>
            
                        <td>
                            
                            <Input type="number"  name="price"
                            {...register("price", { required: true ,min:0, minLength: 3 ,maxLength: 4})}/>$
                            {formState.errors.price?.type === "min" &&
                            <span className='span'>Price can't be negative !</span>
                            }
                            {formState.errors.price?.type === "minLength" &&
                            <span className='span'>minimum 3 numbers !</span>
                            }
                            {formState.errors.price?.type === "maxLength" &&
                            <span className='span'>maximum 4 numbers !</span>
                            }
                        </td>
                    </tr>

                    <tr className='dis'>
                        <th colSpan={2}>Description</th>
                    </tr>

                    <tr>
                        <td colSpan={2}>
                            <textarea
                            placeholder="Write description about new vacation"
                            name="description"
                            {...register('description', { required: true, minLength:5 })} 
                            />
                            {formState.errors.description?.type === "required" &&
                            <span className='span'>Missing description !</span>}
                            {formState.errors.description?.type === "minLength" && <span>description too short.</span>}
                        </td>
                    </tr>

                    <tr>
                        <th>Depart</th>
                        <th>Return</th>
                    </tr>

                    <tr>
                        <td> 
                         
                        
                            <Input type="date" name="fromDate"  
                            {...register('fromDate', { required: true, min: 0 })}/> 
                            {formState.errors.fromDate?.type === "required" && 
                            <span className='span'>Missing depart date !</span>}
                                
                        </td>

                        <td>
                        
                            <Input type="date" name="toDate" 
                            {...register('toDate', { required: true, min: 0 })}/>
                        
                            {formState.errors.toDate?.type === "required" && 
                            <span className='span'>Missing return date !</span>}
                        </td>
                    </tr>

                    <tr>
                        <td className='adduploudbox'>

                            {preview ?  
                            <img src={preview} className="imgadd"
                            alt=''/>:null
                            }
                        </td>

                        <td className='adduploudbox'>   
                        <Button id='btnadd' size='small' color='secondary' variant="contained"> 
                            <input id='btninput' type="file" accept="image/*" name="image"
                            {...register('image', { required: true})}
                            onChange={e  => handelChange(e)}
                            /> 
                        </Button>
                        <Button  id='btnadd' type='submit' size='small' color='secondary' variant="contained">
                            Add <SaveIcon/>
                        </Button>
                        {formState.errors.image?.type === "required" && 
                        <span className='span'>Missing image !</span>} 
                        </td>
                    </tr>
                </table>
            </form> 
        </div>
    );
}

export default AddVacation;






























// async function addProduct(vacation: VacationModel) {

//     const authAxios = axios.create({
    
//         baseURL:'http://localhost:3001/api',
//         headers: {
//             Authorization : `Bearer ${localStorage.getItem('token')}` 
//         }
//     });

//     try {
//         const response = await authAxios.post<VacationModel>('/vacations/new-vacation',VacationModel.convertToFormData(vacation));
//         const addedVacation = response.data;
//         if(addedVacation.toDate < addedVacation.fromDate) {
//             alert('the depart date cannot be bigger than return date')
//         }
//         else if(addedVacation.vacationID === undefined || null) {
//             alert('Missing something check the fields') 
            
//         }else {
//             store.dispatch({
//                 type: ActionType.addNewVacation,
//                 payload: addedVacation
//             });
//             history.push("/");
//             alert("Vacation has been added. ID: " + addedVacation.vacationID);
//             socket.emit("get-all-vacations");
//         }
//     }
//     catch (err) {
//         console.log(err);
//     }
// }