import React, { Component } from 'react';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import  store  from "../../../Redux/store";
import { ActionType } from '../../../Redux/reducer';
import { Unsubscribe } from "redux";
import  UserModel  from '../../../models/user-model'; 
import  VacationModel  from '../../../models/vacation-model';
import { Link } from 'react-router-dom';
import ClearIcon from '@material-ui/icons/DeleteForever';
import io from 'socket.io-client';
import { RiEmotionNormalLine } from 'react-icons/ri';
import { FaRegSmileBeam } from 'react-icons/fa';
import globals from '../../../Service/globals';
import axiosJWT from '../../../Service/axiosJWT';
import './vacation-box.css';


interface myProps {
    vacation : VacationModel;
    update : any
}

interface VactionBoxState { 
    vacations: VacationModel[];
    user: UserModel;
    isLogin: boolean;
    followedVacations: VacationModel[];
}
class VactionBox extends Component<myProps, VactionBoxState> {

    private unsubscribeStore: Unsubscribe;

    private socket = io.connect("http://localhost:3001");
    public constructor(props: myProps) {
        super(props);
        this.state = {
            vacations: store.getState().vacations,
            user: store.getState().user,
            isLogin: store.getState().isLogin,
            followedVacations: store.getState().followedVacations,
        }
 
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
    componentDidMount() { 
        // setInterval(() => {
            this.updateState();
        // },100) 
    } 


    private followVacation = () => {
        const vacationID = +this.props.vacation.vacationID;
        const userID = +this.state.user.userID;
        const sendInfo = {
            user: userID, vacation: vacationID
        };
        
        axios.post<VacationModel>(globals.followVacation ,sendInfo)
        .then(res => {
            this.props.vacation.numFollowers += 1;
            this.updateState();
        })
        .catch(err =>console.log(err));
    } 

    private removeVacation = () => {
       
        const vacationID = +this.props.vacation.vacationID;
        const userID = +this.state.user.userID;
        axios.delete<VacationModel>(` ${globals.removefollowVacation}/${vacationID}/${userID}`)
        .then(res => {
            this.props.vacation.numFollowers -= 1;
            this.props.vacation.follow = false;
            this.setState({ vacations : this.state.vacations});
            this.updateState();
        })
        .catch(err => alert(err.message));
    }
 
    
    private updateState = () => {
       
        axios.get<VacationModel[]>(globals.getfollowVacation + this.state.user.userID)
        .then(res => res.data)
        .then(response => {
            store.dispatch({
                type: ActionType.getFollowedVacations,
                payload: response
            });
            this.props.vacation.follow = false;
            this.props.update()
        })
        .catch(err => alert(err));  
    }  

 
    private deleteVacation = (vacation: VacationModel) => {
        const answer = window.confirm("Are you sure?");
        if (!answer) {
            return;
        }

        const options = {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token'),
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(vacation)
        };
        
        fetch(globals.reamoveVacation + vacation.vacationID, options)
            .then(() => {
                alert("Vacation has been successfully deleted.");
                store.dispatch({
                    type: ActionType.deleteVacation,
                    payload: vacation.vacationID
                });
                this.socket.emit("get-all-vacations");
            })
            .catch(err => alert(err.message));
    }
 

    public render(): JSX.Element { 
        return (
            
            <div className='Container'>
            <Card className="card">
                <CardMedia>

                    <img src={`/assets/images/vacations/${this.props.vacation.imageName}`} alt=''/>
                

                </CardMedia> 
                <CardContent>

                    <Typography  className='Typography1' gutterBottom variant="h5" component="h2">
                        {this.props.vacation.destination}
                    </Typography>

                    <Typography  component={'div'} className='Typography'  variant="body2"  color="textSecondary" >
                        {this.props.vacation.description}
                    </Typography>
 
                    <div>
                        <table> 
                        <tbody>
                            <tr>
                                <th>Depart</th>
                                <th>Return</th> 
                                <th>Price</th>
                            </tr>
                      
                            <tr>
                                <td>{this.props.vacation.fromDate}</td>
                                <td>{this.props.vacation.toDate}</td>
                                <td>{this.props.vacation.price} $</td>
                            </tr>
                        </tbody> 
                       
                        </table>
                    </div>

                </CardContent> 
                {this.state.user.isAdmin ?  
                   
                    <>
                        
                    <Typography  component={'div'}>
                        <Button color="secondary" >
                            <Link to='' className='link'>
                                <ClearIcon onClick={() => this.deleteVacation(this.props.vacation)} />
                            </Link>
                        </Button>
                        
                        <Button color="secondary" >
                            <Link className='link' to={`/edit-vacation/${this.props.vacation.vacationID}`}>
                                <EditIcon/> 
                              
                            </Link>
                        </Button>
              
                    </Typography>
                    </>
                  
                    :
                    
                    <Typography  component={'div'}> 
                
                {!this.props.vacation.follow ?
                
                    <Button className="btnFollow" variant="outlined" size="small" color="primary" onClick={()=>{this.followVacation()}}>
                         FOllow | <RiEmotionNormalLine size="2.3em"/> 
                         
                    </Button>
                    :
                    <Button className="btnFollow"  variant="outlined" size="small" color="secondary" onClick={this.removeVacation}>
                        Unfollow | <FaRegSmileBeam size="2em"/>
                    </Button>
                   
                }  <br />
                    <Typography className="Followers"  component={'div'}>  
                  
                        <div className='Followersbox' color="primary" >
                            {
                                this.props.vacation.numFollowers === 0
                                ||
                                this.props.vacation.numFollowers > 1
                                ?
                                <div>{this.props.vacation.numFollowers} Followers</div>
                                :
                                <div>{this.props.vacation.numFollowers } Follower</div>
                            }
                        </div>
            
                    </Typography> 

                </Typography> 
  
                } 
                         
              
            </Card>
        </div>
        )
    };
}


export default VactionBox;


