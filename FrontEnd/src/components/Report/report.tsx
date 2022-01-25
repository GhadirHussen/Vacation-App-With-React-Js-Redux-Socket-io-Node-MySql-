import React, { useState ,useEffect} from 'react'
import axios from "axios";
import {Bar} from 'react-chartjs-2';
import VacationModel from '../../models/vacation-model';
import globals from '../../Service/globals';
import './report.css';


const Report = ()  => {
    

    const [vacatioID , setVacatioID] = useState([]);
    const [followers , setFollowers] = useState([]);


     useEffect(() => {
        const intervalId = setInterval(() => {
            axios.get<VacationModel[]>(globals.vacation)
            .then(response => {
                const vacation = response.data;
                const arrID = [];
                const follower =[];

                for(const prop of vacation) {
                    arrID.push(prop.destination);
                    follower.push(prop.numFollowers);
                }
                setVacatioID(arrID);
                setFollowers(follower);
            })
            .catch(err => console.log(err));
        }, 100);

        return () => clearInterval(intervalId);
     }, []);
    


    return (

        <div className='report'>
            <h2>Report Followers Of Vacation</h2>
            <Bar
                data={{
                    labels: vacatioID,
                    datasets: [
                    {
                        label:'Followers',
                        backgroundColor: '#4bc0c0',
                        borderColor: 'white',
                        borderWidth: 2,
                        data: followers,
                    }
                    ]
                }}
                options={{
                    scales: {
                        yAxes: {
                            title: {
                                text: 'Followers',
                                display: true,
                                color: 'white',
                            }, 
                            ticks: {
                                color: "white",
                                font : {
                                    size :15
                                },
                                padding:20
                            }
                        },
                        xAxes: {
                            title: {
                                text: 'Vacation Name',
                                display: true,
                                color: 'white',
                            }, 
                            ticks: {
                                color: "white",
                                font : {
                                    size :15
                                },
                                padding:20,
                            }
                        }
                    },
                }}
            />
        </div>
    );
}

export default Report;








