import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import  Header  from '../Header/header';
import  Routing  from '../Routing/Routing';
import './layout.scss';


export class Layout extends Component{
  

    public render(): JSX.Element {
        return (
            <BrowserRouter>
        
                <div className='layout'>
                        <header>
                            <Header />
                        </header> 
                        <main>  
                            <Routing/> 
                        </main>
                </div>  
    
            </BrowserRouter> 
        );
    }
}


