import React, { useState ,useEffect} from 'react'
import {Bar} from 'react-chartjs-2';
import vacationService from '../../Service/vacationService';
import './report.scss';


const Report = ()  => {
    

    const [vacatioID , setVacatioID] = useState([]);
    const [followers , setFollowers] = useState([]);

    
    useEffect(() => {
        const intervalId = setInterval(async () => {

            const result = await vacationService.fetchVacation();

                const vacation = result;
                const arrID = [];
                const follower =[];

                for(const prop of vacation) {
                    arrID.push(prop.destination);
                    follower.push(prop.numFollowers);
                    
                }
                setVacatioID(arrID);
                setFollowers(follower);
      
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








