import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useForm ,Controller } from "react-hook-form";
import { RouteComponentProps ,useHistory } from "react-router";
import store from '../../../Redux/store';
import VacationModel from "../../../models/vacation-model";
import { ActionType } from "../../../Redux/reducer";
import Input  from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import io from 'socket.io-client';
import './update-vacation.css';


  
interface RouterProps {
    id: string;
  }
  
interface MatchIdProps extends RouteComponentProps<RouterProps>{}

const UpdateVacation: React.FC<MatchIdProps> = ({match})  => {



    const { register, handleSubmit, formState ,reset } = useForm<VacationModel>({}); 

    const socket = io.connect("http://localhost:3001");
    const [data, setData] = useState<VacationModel>();
    const [preview , setPreview] = useState(null);
    const [imageName, setImageName] = useState(null);
    const [image, setImage] = useState(null);
    let history = useHistory();



      
    let fechVacationData = async () => {
   
        const id = +match.params.id;
        const result = await axios.get<VacationModel>(`http://localhost:3001/api/vacations/${id}`);
        setData(result.data);
        setImageName(result.data.imageName);
    }
  

    useEffect(() => { 
        fechVacationData();
      }, []); 

  
    const dateFormat = (data :string) => { 
        const newDate = new Date(data);
        const year = newDate.getFullYear(); 
        const month = newDate.getMonth() + 1;
        const day = newDate.getDate();
        return `${year}-${month}-${day}`;
    }   

      useEffect(() => { 
        if (data) {
          reset({
            destination: data.destination,
            description: data.description,
            price: data.price, 
            fromDate: dateFormat(data.fromDate.toString()),
            toDate: dateFormat(data.toDate.toString()),
            imageName: data.imageName  
          });
        } 
      }, [data]);
        

    const updateVacation = (vacation: VacationModel) => {

        const id = +match.params.id;
        const authAxios = axios.create({
          headers: {
              Authorization : `Bearer ${localStorage.getItem('token')}` 
          }
      });

      const url = 'http://localhost:3001/api/vacations/update-vacation/'

       

        authAxios.put<VacationModel>(url+id,VacationModel.convertToFormData(vacation))
        .then(response => {
        const vacationToUpdate = response.data;

        if(vacationToUpdate.vacationID === undefined || null) {
            alert('Missing something check the fields');
        }
        else{
            store.dispatch({
                type: ActionType.updateVacation,
                payload: vacationToUpdate
            }); 
            history.push("/");
            alert("Vacation has been updated. ID: " + vacationToUpdate.vacationID);
            socket.emit("get-all-vacations"); 
        }
        })
        .catch(err => {
            alert(err.response.data);
            console.log(err.response.data);
        });
    }

    const handelChange = (e:  React.ChangeEvent<HTMLInputElement>) => {
        const filePreview = URL.createObjectURL(e.target.files[0]);
        setPreview(filePreview);    
    }
 

    return ( 
        <div className="edit-container">

            <h2>Update Your Vacation</h2>

                <form onSubmit={handleSubmit(updateVacation)}> 
   
                    <table>
                        <tr>
                            <th>Destination</th>
                            <th>Price</th>
                        </tr> 

                        <tr>  
                            <td>
                            <Input type="text" name="destination" 
                             {...register('destination', { required: true, minLength: 3 , maxLength:15 })}/>  
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
                                {...register("price", { required: true , min: 0 , minLength: 3 ,maxLength:4})}/>$ 
                                {formState.errors.price?.type === "required" &&
                                <span className='span'>Missing price !</span>
                                }
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
                                {...register('description', { required: true, min: 5 })} 
                                />
                                {formState.errors.description?.type === "required" &&
                                    <span className='span'>Missing description !</span>
                                }
                                {formState.errors.description?.type === "minLength" &&
                                <span className='span'>Description too short.</span>}
                            </td>
                        </tr>

                        <tr>
                            <th>Depart</th> 
                            <th>Return</th>
                        </tr>

                        <tr>
                            <td>
                                <Input type="dateFormat" name="fromDate" disabled
                                 {...register('fromDate')}/>
                                {/* {formState.errors.fromDate?.type === "required" && 
                                <span className='span'>Missing depart date !</span>} */}

                                <Input type="date" name="fromDate" 
                                {...register('fromDate', { required: true})}/> 
                                {formState.errors.toDate?.type === "required" && 
                                <span className='span'>Missing return date !</span>}
                            </td>

                            <td> 
                                <Input type="dateFormat" name="toDate" disabled
                                {...register('toDate', { required: false})}/>
                             

                                <Input type="date" name="toDate" defaultValue={dateFormat}
                                {...register('toDate', { required: true})}/> 
                                {formState.errors.toDate?.type === "required" && 
                                <span className='span'>Missing return date !</span>}
                            </td>
                        </tr>
 
                        <tr>
                            <td className='adduploudbox'>
                            { 
                        preview
                        ?
                        <img src={preview}/> 
                        :
                        <img src={`/assets/images/vacations/${imageName}`} alt='' />
                        
                        } 
                            </td> 

                            <td className='adduploudbox'>   
                            {formState.errors.image?.type === "required" && 
                                <span className='span'>Please choose image !</span>}
                                <Button id='btnadd' size='small' color='secondary' variant="contained">
                                    <input id='btninput' type="file" accept="image/*" name="image"
                                    {...register('image')} 
                                    onChange={handelChange}
                                    />
                            </Button>
                
                                <Button type='submit' size='small' color='secondary' variant="contained">
                                    Add <SaveIcon/>
                                </Button>
                            </td> 
                        </tr>
                    </table>
                   
            </form>

        </div>
    );
}

export default UpdateVacation; 







// const updateVacation = async (vacation: VacationModel) => {

//     const id = +match.params.id;
//     const authAxios = axios.create({
//       headers: {
//           Authorization : `Bearer ${localStorage.getItem('token')}` 
//       }
//   });

//   const url = 'http://localhost:3001/api/vacations/update-vacation/'

//     try {

//         const response = await authAxios.put(url+id,VacationModel.convertToFormData(vacation));
//         const Vacation = response.data;

//         if(Vacation.toDate < Vacation.fromDate) {
//             alert('the depart date cannot be bigger than return date')
//         }
//         else if(Vacation.vacationID === undefined || null) {
//             alert('Missing something check the fields');
//         }
//         store.dispatch({
//             type: ActionType.updateVacation,
//             payload: Vacation
//         });
//         history.push("/");
//         alert("Vacation has been updated. ID: " + Vacation.vacationID);
//         socket.emit("get-all-vacations"); 
//     }
//     catch (error) {
//          console.log(error);
//     }

// }