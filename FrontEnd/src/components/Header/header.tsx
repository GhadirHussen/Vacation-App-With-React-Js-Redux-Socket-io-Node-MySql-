import React, { Component } from 'react';
import  store  from "../../Redux/store";
import { ActionType} from '../../Redux/reducer';
import { Unsubscribe } from "redux";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import  UserModel  from '../../models/user-model';
import AuthService from '../../Service/authService';
import  NavBarLogin  from '../Navbar/navbar';
import './header.scss';


interface HeaderState {
    user: UserModel;
    isLogin: boolean;
} 

class Header extends Component<{}, HeaderState> {
    unsubscribeStore: Unsubscribe;

    public constructor(props:any) {
        super(props);
        this.state = {
            user: store.getState().user,
            isLogin: store.getState().isLogin
        }

        this.unsubscribeStore = store.subscribe(() => {
            this.setState({ user: store.getState().user });
            this.setState({ isLogin: store.getState().isLogin });
        });
    }

    public componentWillUnmount = () => {
        this.unsubscribeStore();
    }

    componentDidMount = () => {
        if (store.getState().user.userID === undefined) {
            this.getCurrentUser();
        }
    }

    private getCurrentUser = async () => {

        try {
            const currentUser = await AuthService.getCurrentUser();
            if (currentUser.name === 'JsonWebTokenError') {
                store.dispatch({
                    type: ActionType.updateIsLogin, 
                    payload: false
                });
                return;
            }
            store.dispatch({
                type: ActionType.getUser,
                payload: currentUser.user
            });
        
            store.dispatch({
                type: ActionType.updateIsLogin,
                payload: true
            });

        } catch(err) {
            return err;
        }

    }

    public render(): JSX.Element {
        return (
            <div className='header'>

                <AppBar>
                    <Toolbar className='AppBar'>

                        <Grid container direction="row" justifyContent="flex-end" alignItems="flex-start">
                            <Grid>
                                {this.state.isLogin === false ? null : <NavBarLogin/>}
                            </Grid>
                        </Grid>

                    </Toolbar>
                </AppBar>

            </div>
        );
  
    }
}


export default Header;