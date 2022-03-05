import React from "react";
import "./Page404.scss";
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';

function Page404(): JSX.Element {
    return (
      <div className='Page404'>
        <NavLink className="NavLink" to='/' exact>
                    <Button className="btn" size='small' variant="contained" color='secondary'>Home Page !</Button>
        </NavLink>
      </div>
    );
}

export default Page404;
   