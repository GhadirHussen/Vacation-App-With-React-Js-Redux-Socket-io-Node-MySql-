import React, { Component } from 'react';
import  store  from "../../../Redux/store";
import { ActionType} from '../../../Redux/reducer';
import VacationService from '../../../Service/vacationService';
import  VactionBox  from '../Vaction box/vacation-box';
import  VacationModel  from '../../../models/vacation-model';
import  UserModel  from '../../../models/user-model';
import { Unsubscribe } from "redux";
import io from 'socket.io-client';
import Carousel from 'react-elastic-carousel';
import { Card } from '@material-ui/core';
import AddVacation  from '../Add Vacation/add-vacation';
import LoginPage from '../../Auth/Login/loginList';
import './vacation-list.scss';



interface HomeState {
    vacations: VacationModel[];
    user: UserModel;
    isLogin: boolean;
    followedVacations: VacationModel[];
}

export class VacationList extends Component<any, HomeState> {
    private unsubscribeStore: Unsubscribe;
    private socket = io.connect("http://localhost:3001");
    public constructor(props: any) {
        super(props);
        this.state = {
            vacations: store.getState().vacations,
            user: store.getState().user,
            isLogin: store.getState().isLogin,
            followedVacations: store.getState().followedVacations,
        };

        this.unsubscribeStore = store.subscribe(() => {
            this.setState({ user: store.getState().user });
            this.setState({ vacations: store.getState().vacations });
            this.setState({ isLogin: store.getState().isLogin });
            this.setState({ followedVacations: store.getState().followedVacations });
        });
    }

    

    public componentWillUnmount = () => {
        
        this.unsubscribeStore();
    }

    public componentDidMount = async () => { 
    
        if (store.getState().vacations.length === 0) {

            try {
                const vacations = await VacationService.fetchVacation();
                store.dispatch({
                    type: ActionType.getAllVacations,
                    payload: vacations 
                });

            } catch(err) {
                return err;
            }
        }
        this.socket.on("get-all-vacations", (vacations: VacationModel[]) => {

            store.dispatch({
            type: ActionType.getAllVacations,
            payload: vacations
            });
        });
        this.checkFollowedVacations();
        this.vacationfollow();
    }


    private checkFollowedVacations = async () => {
        if (this.state.isLogin === true && this.state.followedVacations.length <= 0) {
            try {
                const folowers = await VacationService.getfollowVacation(this.state.user.userID);
                store.dispatch({
                type: ActionType.getFollowedVacations,
                payload: folowers 
                });
                this.vacationfollow();
            } catch (err) {
                return err;
            }
        }
    }

    private vacationfollow = () => {
        const allVacations = [...this.state.vacations];
        const followedVacations = [...this.state.followedVacations];
        if (followedVacations.length !== 0) {
            for(let prop of  followedVacations){
                const index = allVacations.findIndex(v => v.vacationID === prop.vacationID);
                const vacation = allVacations[index];
                vacation.follow = true;
            }

        }
        this.setState({ vacations: allVacations });
    }

    public render(){
  

        return (
            <div className="home">  

                {this.state.vacations.length === 0 && this.state.user.isAdmin? 
                <AddVacation/>
               
                : 
                    <> 
                        {this.state.isLogin ? 
                            <Carousel itemsToShow={4} className="Carousel">
                            
                                    {this.state.vacations.map(v =>
                                        <Card className='box'  key={v.vacationID}>
                                    
                                            <VactionBox vacation={v} 
                                            update={this.vacationfollow} />
                                             
                                
                                        </Card>
                                    )} 
                        
                            </Carousel>
                        : 
                        <LoginPage/>
                        }
                        
                    </>
                }
           
            </div>
        );
    }
}



export default VacationList;




   
                        