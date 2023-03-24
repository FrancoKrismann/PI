import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducer/reducer';
import {composeWithDevTools} from "redux-devtools-extension"


const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk)) // esta línea es para poder hacer peticiones a un server
);
export default store;