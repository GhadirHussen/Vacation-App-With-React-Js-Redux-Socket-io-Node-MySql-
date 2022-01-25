import React from 'react';
import VacationList from '../Vacation Area/Vacation list/vacation-list';
import { Switch, Route } from 'react-router-dom';
import Register from '../Auth/Register/register';
import UpdateVacation from '../Vacation Area/Update Vacation/update-vacation';
import AddVacation from '../Vacation Area/Add Vacation/add-vacation';
import Report from '../Report/report';
import Page404 from '../Page404/Page404';




function Routing(): JSX.Element {
    return ( 
 
        <Switch>
            <Route path='/' component={VacationList} exact />
            <Route path='/register' component={Register} exact />
            <Route path='/add-vacation' component={AddVacation} exact />
            <Route path='/edit-vacation/:id' component={UpdateVacation} exact /> 
            <Route path='/report' component={Report} exact />
            <Route component={Page404}/>
        </Switch>
        
    ); 
}

export default Routing;   