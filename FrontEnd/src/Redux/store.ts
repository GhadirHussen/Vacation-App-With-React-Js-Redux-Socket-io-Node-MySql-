import { createStore } from "redux";
import { reducer } from "./reducer";
import { composeWithDevTools } from 'redux-devtools-extension'; ///extension for crhome 


const store = createStore(reducer , composeWithDevTools());


export default store; 
