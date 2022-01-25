import React, { useState } from 'react'
import axios from "axios";
import { useForm } from "react-hook-form";
import store from '../../../Redux/store';
import UserModel from "../../../models/user-model";
import { ActionType } from "../../../Redux/reducer";
import { useHistory } from "react-router";
import { TextField, Button} from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import globals from '../../../Service/globals';
import './register.css';


const Register = ()  => {
    

    const { register, handleSubmit , formState  } = useForm<UserModel>();
    const [errorReg, setErrorReg] = useState();
    const history = useHistory();


     function sginUp(user: UserModel) {

        axios.post(globals.register ,user)
        .then(response => {
        
            store.dispatch({
                type: ActionType.getUser,
                payload: response.data
            })

            store.dispatch({
                type: ActionType.updateIsLogin,
                payload: true
            });
      
            Token(); 
            history.push('/');
            alert('your register is successfully !');
        }).catch(err => {
            console.log(err.response.data);
            setErrorReg(err.response.data);
        })
    } 



    const Token = () => {

        const optionsJWT = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(store.getState().user)
        };
        fetch(globals.saveToken, optionsJWT)
            .then(response => response.json())
            .then(res => localStorage.setItem('token', res.token))
            .catch(err => alert(err));
    }


    return (
        
        <div className='registerPage'>
        <form onSubmit={handleSubmit(sginUp)}>
            {errorReg ? <h2 className="error">{errorReg}</h2> : 
            <h2>Register Now !</h2>}
            <table>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                </tr>
                <tr>
                    <td>
                        <TextField 
                        label="First Name"
                        variant="filled"
                        size="small"
                        helperText="Type between 3-10 characters"
                        {...register('firstName', { required: true, minLength: 3 ,maxLength: 10 })}
                        />
                        <br />
                        {formState.errors.firstName?.type === "required" &&
                        <span>Missing name !</span>}
                        {formState.errors.firstName?.type === "minLength" && 
                        <span>First name too short minimun 3 laters !</span>}
                        {formState.errors.userName?.type === "maxLength" &&
                        <span>First Name too short maximum 10 laters !</span>} 
                    </td>
                    <td>
                        <TextField
                        label="Last Name"
                        variant="filled"
                        size="small"
                        helperText="Type between 3-10 characters"
                        {...register('lastName', { required: true ,minLength: 3  ,maxLength: 10  })}
                        />
                         <br />
                        {formState.errors.lastName?.type === "required" && 
                        <span>This field is required !</span>}
                        {formState.errors.lastName?.type === "minLength" &&
                        <span>Last Name too short minimun 3 laters !</span>} 
                        {formState.errors.userName?.type === "maxLength" &&
                        <span>Last Name too short maximum 10 laters !</span>} 
                    </td>
                </tr>
                <tr>
                    <th>User Name</th>
                    <th>Password</th>
                </tr>
                <tr>
                    <td>
                        <TextField
                        label="User Name"
                        variant="filled"
                        size="small"
                        helperText="Type between 4-10 characters"
                        {...register('userName', { required: true, minLength: 4  ,maxLength: 10  })}
                        />
                         <br />
                         {formState.errors.userName?.type === "required" && 
                        <span>This field is required !</span>}
                        {formState.errors.userName?.type === "minLength" &&
                        <span>User Name too short minimun 3 laters !</span>} 
                        {formState.errors.userName?.type === "maxLength" &&
                        <span>User Name too short maximum 10 laters !</span>} 
                    </td>
                    <td>
                        <TextField 
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        variant="filled"
                        size="small"
                        helperText="Type between 4-30 characters"
                        {...register('password', { required: true, min: 0 ,minLength :4 , maxLength:30 })}
                        />
                         <br />
                        {formState.errors.password?.type === "required" && 
                        <span>This field is required !</span>}
                        {formState.errors.password?.type === "min" &&
                        <span>Password can't be negative  !</span>}
                        {formState.errors.password?.type === "minLength" &&
                        <span>Password too short minimum 4 number !</span>}
                        {formState.errors.password?.type === "maxLength" &&
                        <span>Password too long maximum 30 numbers !</span>}
                    </td>
                </tr>
            </table>
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

export default Register;

 
