import React from 'react';
import { useForm } from "react-hook-form";
import store from '../../../Redux/store';
import UserModel from "../../../models/user-model";
import AuthService from '../../../Service/authService';
import { ActionType } from "../../../Redux/reducer";
import { useHistory } from "react-router";
import { NavLink } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';
import './loginList.scss';




const LoginPage = ()  => { 
    

    const history = useHistory();
    const { register, handleSubmit , formState  } = useForm<UserModel>();


    const login = async (user: UserModel) => { 
        try {
            const data = await AuthService.login(user);
            store.dispatch({
                type: ActionType.getUser,
                payload: data[0] 
            });   
            store.dispatch({ 
                type: ActionType.updateIsLogin,
                payload: true  
            });
            history.push('/'); 
        } catch (err) { 
            return err;
        }
    }

 
    return (

        <div className='LoginList'>
            <form onSubmit={handleSubmit(login)}>
        
                <h2>Login please !</h2>
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


export default LoginPage;