import React from "react";
import "./Page404.css";
import page404 from './404.png';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';

function Page404(): JSX.Element {
    return (
      <div className='Page404'> 
      
        <img src={page404} alt="Page404" />
        <NavLink className="NavLink" to='/' exact>
                    <Button size='small' variant="contained" color='secondary'>Home Page !</Button>
        </NavLink>
      </div>
    );
}

export default Page404;
