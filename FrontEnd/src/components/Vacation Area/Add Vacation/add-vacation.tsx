import React , {useState} from 'react'
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import store from '../../../Redux/store';
import VacationService from '../../../Service/vacationService';
import VacationModel from "../../../models/vacation-model";
import { ActionType } from "../../../Redux/reducer";
import io from 'socket.io-client';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import SaveIcon from '@material-ui/icons/Save';
import alertService from '../../../Service/alertService';
import './add-vacation.scss';

 

function AddVacation(): JSX.Element {

 
    const history = useHistory();
    const { register, handleSubmit, formState} = useForm<VacationModel>({});
    const socket = io.connect("http://localhost:3001");
    const [preview , setPreview] = useState(null);
 

    const addNewVacation = async(vacation: VacationModel) => {

        try {
            const newVacation = await VacationService.addNewVacation(vacation);

            if(newVacation.vacationID === undefined || null) {

                alert('Missing something check the fields');
                return;
            } else{ 
                alertService("Vacation has been added", 'success');
                store.dispatch({
                type: ActionType.addNewVacation,
                payload: newVacation
                });
                history.push("/");
                socket.emit("get-all-vacations");
            }
        } catch(err) {
            return err;
        }     
    }


    const handelChange = (e:  React.ChangeEvent<HTMLInputElement>) => {
        const imageSelected = (e.target as HTMLInputElement).files[0];
        const filePreview = URL.createObjectURL(imageSelected);
        setPreview(filePreview)
    }
 

    return (

        <div className="add-container">
            

            <h2>Add New Vacation</h2>
            
            
            <form onSubmit={handleSubmit(addNewVacation)}> 
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

                            {preview ?  
                            <img src={preview} className="imgadd"
                            alt=''/>:null
                            }
                        </div>

                        <div className='adduploudbox'>    
                            <Button id='btnadd' size='small' color='secondary' variant="contained"> 
                                <input id='btninput' type="file" accept="image/*" name="image"
                                {...register('image', { required: true})}
                                onChange={e  => handelChange(e)}
                                /> 
                            </Button>

                            <Button  id='btnadd' type='submit' size='small' color='secondary' variant="contained">
                                Add <SaveIcon/>
                            </Button>
                            <div className='err'>
                                {formState.errors.image?.type === "required" && 
                                <span className='span'>Missing image !</span>}
                            </div>
                        </div>
                </div>
            </form> 
        </div>
    );
}

export default AddVacation;




