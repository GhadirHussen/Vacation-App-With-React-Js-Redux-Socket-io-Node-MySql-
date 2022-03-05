import React, {useState, useEffect} from 'react';
import { useForm } from "react-hook-form";
import { RouteComponentProps ,useHistory } from "react-router";
import store from '../../../Redux/store';
import VacationModel from "../../../models/vacation-model";
import VacationService from '../../../Service/vacationService';
import { ActionType } from "../../../Redux/reducer";
import Input  from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import io from 'socket.io-client';
import alertService from '../../../Service/alertService';
import './update-vacation.scss';


  
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
    let history = useHistory();


    useEffect(() => {
        (async function() {
           const id = +match.params.id;

        try {
            const vacations = await VacationService.fetchVacationByID(id);
            setData(vacations);
            setImageName(vacations.imageName);

        } catch(err) {
            return err;
        }
        })();
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
        


    const updateVacation = async (vacation: VacationModel) => {

        const id = +match.params.id;
       
        try {
            const vacationToUpdate = await VacationService.updateVacation(vacation, id);
            if(vacationToUpdate.vacationID === undefined || null) {
                alertService('Missing something check the fields', 'error');
            }
            else{
                alertService("Vacation has been updated", 'success');
                store.dispatch({
                    type: ActionType.updateVacation,
                    payload: vacationToUpdate
                }); 
                history.push("/");
                socket.emit("get-all-vacations"); 
            }
        } catch(err) {
            return err;
        }
    }


    const handelChange = (e:  React.ChangeEvent<HTMLInputElement>) => {
        const filePreview = URL.createObjectURL(e.target.files[0]);
        setPreview(filePreview);    
    }
 


    return (

        <div className="update-container">

            <h2>Update Your Vacation</h2>
            
            <form onSubmit={handleSubmit(updateVacation)}> 
                <div className='detailBox'>
            
                        <div className='inputBox'>
                            <Input type="text" name="destination" 
                            {...register('destination', { required: true, minLength: 3 ,maxLength:15 })}/>

                            <div className='err'>
                                {formState.errors.destination?.type === "required" &&
                                <span className='span'>Missing destination !</span>
                                }
                                {formState.errors.destination?.type === "minLength" &&
                                <span className='span'>Destination name too short !</span>
                                }
                                {formState.errors.destination?.type === "maxLength" &&
                                <span className='span'>Destination name is too long !</span>
                                }
                            </div>
                        </div>

                        <div className='inputBox' >
                            <Input type="number"  name="price" placeholder='$'
                            {...register("price", { required: true ,min:0, minLength: 3 ,maxLength: 4})}/>
                            
                            <div className='err'>
                                {formState.errors.price?.type === "required" && 
                                <span className='span'>Missing Price</span>}
                                {formState.errors.price?.type === "min" &&
                                <span className='span'>Price can't be negative !</span>
                                }
                                {formState.errors.price?.type === "minLength" &&
                                <span className='span'>minimum 3 numbers !</span>
                                }
                                {formState.errors.price?.type === "maxLength" &&
                                <span className='span'>maximum 4 numbers !</span>
                            }
                            </div> 
                        </div>

                        <div className='description'>
                            <textarea
                            placeholder="Write description about new vacation"
                            name="description"  className='input'
                            {...register('description', { required: true, minLength:5 })} 
                            />
                            <div className='err'>
                                {formState.errors.description?.type === "required" &&
                                <span className='span'>Missing description !</span>}
                                {formState.errors.description?.type === "minLength" && <span>description too short.</span>}
                            </div>
                        </div>

                        <div className='inputBox'>
                            <Input type="date" name="fromDate"  
                            {...register('fromDate', { required: true, min: 0 })}/> 
                            <div className='err'>
                                {formState.errors.fromDate?.type === "required" &&
                                <span className='span'>Missing depart date !</span>}
                            </div>
                        </div>

                        <div className='inputBox'>
                            <Input type="date" name="toDate"
                            {...register('toDate', { required: true, min: 0 })}/>
                            <div className='err'>
                                {formState.errors.toDate?.type === "required" && 
                                <span className='span'>Missing return date !</span>}
                            </div>
                        </div>

                        <div className='adduploudbox'>    
                            <Button id='btnadd' size='small' color='secondary' variant="contained"> 
                                <input id='btninput' type="file" accept="image/*" name="image"
                                {...register('image', { required: false})}
                                onChange={e  => handelChange(e)}
                                /> 
                            </Button> 

                            <Button  id='btnadd' type='submit' size='small' color='secondary' variant="contained">
                                Add <SaveIcon/>
                            </Button>

                            <div>
                                { 
                                    preview
                                    ?
                                    <img src={preview}/> 
                                    :
                                    <img src={`/assets/images/vacations/${imageName}`} alt='' />
                                } 
                            </div> 
 
                        </div>
                </div>
            </form> 
        </div>
    );
}

export default UpdateVacation; 


