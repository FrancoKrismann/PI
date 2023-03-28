import axios from "axios"
import {GET_RECIPES, ERROR} from "../actions type/actions-types"



export default function allrecipes(){
    return async function(dispatch){
        try {
            const response = await axios.get('http://localhost:3001/recipes/all')
            console.log("Action:" + response.data)
            return dispatch({
                type: GET_RECIPES,
                payload: response.data
            })
        } catch (error) {
            return dispatch({type:ERROR,payload:error})
        }
        }
    }
    




