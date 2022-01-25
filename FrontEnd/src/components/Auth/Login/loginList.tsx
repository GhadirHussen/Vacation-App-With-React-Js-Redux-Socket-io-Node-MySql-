import React from 'react';
import axios from "axios";
import { useForm } from "react-hook-form";
import store from '../../../Redux/store';
import UserModel from "../../../models/user-model";
import { ActionType } from "../../../Redux/reducer";
import { useHistory } from "react-router";
import { NavLink } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';
import About from '../../About page/about';
import globals from '../../../Service/globals';
import './loginList.css';


const NewLoginList = ()  => {
    

    const history = useHistory();
    const { register, handleSubmit , formState  } = useForm<UserModel>();


    const login = (user: UserModel) => {

        axios.post(globals.login ,user)
        .then(response => { 

            store.dispatch({
            type: ActionType.getUser,
            payload: response.data[0]
            });

            store.dispatch({ 
            type: ActionType.updateIsLogin,
            payload: true 
            });
            sendToken();
            history.push('/');
            alert("You Are Wellcom");
        })
        .catch(err => {
            alert(err.response.data);
            console.log(err.response.data);
        });
    }

    const sendToken = () => {

        axios.post<UserModel>(globals.saveToken, store.getState().user)
        .then(res => localStorage.setItem('token',res.data.token)) 
        .catch(err => alert(err.data));
    }
 

    return (

        <div className='LoginList'>
            <form onSubmit={handleSubmit(login)}>
        
                <h2>Login please !</h2>
                    <About/>
                <div className='errorsbox'>
                        <TextField
                            label="User Name"
                            variant="filled"
                            size="small"
                            helperText="Type between 3-10 characters"
                            {...register('userName', { required: true, minLength: 3 ,maxLength: 10 })}
                        />
                         <br />
                        {formState.errors.userName?.type === "required" && 
                        <span>This field is required !</span>}
                        {formState.errors.userName?.type === "minLength" &&
                        <span>Name too short minimun 3 laters !</span>} 
                        {formState.errors.userName?.type === "maxLength" &&
                        <span>Name too short maximum 10 laters !</span>} 
                        <br />
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
                    </div>
            
                
                <div className='butbox'>
                    <Button type='submit'size='small' color='primary' variant="contained">
                        Login 
                    </Button>
                    <NavLink className="NavLink" to='/register' exact>
                            <Button size='small' variant="contained" color='secondary'>
                                Register
                            </Button>
                    </NavLink>
                </div> 
            </form>
        </div>
    );
}

export default NewLoginList;


