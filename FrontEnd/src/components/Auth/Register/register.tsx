import React from 'react'
import { useForm } from "react-hook-form";
import UserModel from "../../../models/user-model";
import { useHistory } from "react-router";
import { TextField, Button} from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import AuthService from '../../../Service/authService';

import './register.scss';

const RegisterPage = ()  => {
    

    const { register, handleSubmit , formState  } = useForm<UserModel>();
    const history = useHistory();


    const sginUp = async (user: UserModel) => {

        try {
           const result = await AuthService.register(user);
           if(result) return history.push('/');
        } catch (err) {
            return err;
        }
    }  



    return (
        
        <div className='registerPage'>
        <form onSubmit={handleSubmit(sginUp)}>
        
            <h2>Register Now !</h2>
            <div className='lableBox'>
   
                    <div className='box'>
                        <TextField 
                        label="First Name"
                        variant="filled"
                        size="small"
                        {...register('firstName', { required: true, minLength: 3 ,maxLength: 10 })}
                        />
                        <div className='errBox'>
                            {formState.errors.firstName?.type === "required" &&
                            <span>Missing name !</span>}
                            {formState.errors.firstName?.type === "minLength" && 
                            <span>First name too short minimun 3 laters !</span>}
                            {formState.errors.userName?.type === "maxLength" &&
                            <span>First Name too short maximum 10 laters !</span>}
                        </div>
                    </div>
                    <div className='box'> 
                        <TextField

                        label="Last Name"
                        variant="filled" 
                        size="small"
                        {...register('lastName', { required: true ,minLength: 3  ,maxLength: 10  })}
                        />
                         <div className='errBox'>
                            {formState.errors.lastName?.type === "required" && 
                            <span>This field is required !</span>}
                            {formState.errors.lastName?.type === "minLength" &&
                            <span>Last Name too short minimun 3 laters !</span>} 
                            {formState.errors.userName?.type === "maxLength" &&
                            <span>Last Name too short maximum 10 laters !</span>} 
                        </div>
                    </div>
  
                    <div className='box'>
                        <TextField
                        label="User Name"
                        variant="filled"
                        size="small"
                        {...register('userName', { required: true, minLength: 4  ,maxLength: 10  })}
                        />
                         <div className='errBox'>
                            {formState.errors.userName?.type === "required" && 
                            <span>This field is required !</span>}
                            {formState.errors.userName?.type === "minLength" &&
                            <span>User Name too short minimun 3 laters !</span>} 
                            {formState.errors.userName?.type === "maxLength" &&
                            <span>User Name too short maximum 10 laters !</span>} 
                        </div>
                    </div>
                    <div className='box'>
                        <TextField 
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        variant="filled"
                        size="small"
                        {...register('password', { required: true, min: 0 ,minLength :4 , maxLength:30 })}
                        />
                         <div className='errBox'>
                            {formState.errors.password?.type === "required" && 
                            <span>This field is required !</span>}
                            {formState.errors.password?.type === "min" &&
                            <span>Password can't be negative  !</span>}
                            {formState.errors.password?.type === "minLength" &&
                            <span>Password too short minimum 4 number !</span>}
                            {formState.errors.password?.type === "maxLength" &&
                            <span>Password too long maximum 30 numbers !</span>}
                        </div>
                    </div>

            </div>
            <div className='boxbtn'>
                <Button type='submit'size='small' color='primary' variant="contained">
                    Register
                </Button> 
                
                <NavLink className="NavLink" to='/' exact>
                        <Button size='small' variant="contained" color='secondary'>Back</Button>
                </NavLink>
            </div>
        </form>
        </div> 
    );
}

export default RegisterPage;

 
