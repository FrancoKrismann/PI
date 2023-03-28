 import {GET_RECIPES,ERROR} from "../actions type/actions-types.js"



const initialState ={
recipes:["pasta"],
errors:{}
}
console.log("state:" + initialState)
const rootReducer = (state = initialState, action) =>{
switch (action.type) {
    case GET_RECIPES:
        console.log("Llega al reducer")
        return{
            ...state,
            recipes:action.payload,
            errors:{}
        }
    case ERROR:
        return{
            ...state,
            errors:action.payload
        }
    default:
        return {...state}
}
}


export default rootReducer