import React, { Component } from 'react';
import  store  from "../../Redux/store";
import { ActionType } from '../../Redux/reducer';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid'; 
import UserModel  from '../../models/user-model';
import  VacationModel  from '../../models/vacation-model';
import { NavLink } from 'react-router-dom';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import { ImHome } from 'react-icons/im';
import "./navbar.css";



interface NavBarLoginState {
    user: UserModel;
    isLogin: boolean;
    followedVacations: VacationModel[];
}
class NavBarLogin extends React.Component<{}, NavBarLoginState> {


    public constructor(props: {}) {
        super(props);
        this.state = {
            user: store.getState().user,
            isLogin: store.getState().isLogin,
            followedVacations: store.getState().followedVacations
        };
    }

    
    public logout = () => {

        store.dispatch({
            type: ActionType.updateIsLogin,
            payload: false
        }); 

        store.dispatch({ 
            type: ActionType.logout,
            payload: false
        });
    }
    
    
    public render(): JSX.Element {
        
        return (
     
            <div className='navbarLogin'> 
                
                  
               <Grid className='boxx' container alignItems="center" justifyContent="flex-end" > 
        
  
                {this.state.user.isAdmin === 1 ?
                    <>
                       
                <Grid className="homeBtn" > 
                    <NavLink className="NavLink"  to='/'>
                       <Button id="btn2" size='small' variant="contained" color='secondary'>
                            <ImHome id='ImHome' />Home
                        </Button>
                    </NavLink>
                </Grid>
                        <Grid>
                            <h2 className='admin'>Hello {this.state.user.firstName}</h2>
                        </Grid>

                        <Grid >
                            <Button size='small'  variant="contained">
                                <AddIcon/>
                            <NavLink className="NavLink"  to='/add-vacation' exact>Add Vacation</NavLink>
                        </Button> 
                        </Grid>

                        <Grid>
                            <Button size='small' variant="contained">
                                <EqualizerIcon />
                                <NavLink className="NavLink" to='/report'>Reports</NavLink>
                            </Button>
                        </Grid>
                     
                        </>
                    
                        :
                        <h2 className='user'>Hello {this.state.user.firstName}</h2>
                    
                }

                    <Grid> 
                        <NavLink  className="NavLink" to='/'>
                            <Button id="btn" size='small' variant="contained" 
                                   onClick={this.logout}>Logout 
                            </Button> 
                        </NavLink>
                    </Grid>
                </Grid>
            </div>
         
        );
    }
}


export default NavBarLogin;











