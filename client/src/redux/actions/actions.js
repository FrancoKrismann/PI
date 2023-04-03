import axios from "axios"
import {GET_RECIPES, ERROR, FILTER_DIET, FILTER_WHERE,FILTER_AS_DES} from "../actions type/actions-types"



export function allrecipes(){
    return async function(dispatch){
        try {
            const response = await axios.get('http://localhost:3001/recipes/all')
            
            return dispatch({
                type: GET_RECIPES,
                payload: response.data
            })
        } catch (error) {
            return dispatch({type:ERROR,payload:error})
        }
        }
    }
    

export function postRecipe(payload){
    return async function(dispatch){
        const obj = {
            "title":"pollo 22",
            "image":"jpg",
            "summary":"muy rico",
            "healthScore":80,
            "steps":"paso 1: ",
            "diets":["gluten free","vegan"]
        }
        try {
            const post = await axios.post("http://localhost:3001/recipe", obj)
            console.log(post)
            
        } catch (error) {
            
        }
    }
}

export function RecipeFilterByDiet(payload){
    
    return {
        type:FILTER_DIET,
        payload
    }
}


export function recipeFilterWhere(payload){
    return {
        type:FILTER_WHERE,
        payload
    }
}

export function recipeFilterAS_DES(payload){
    return{
        type:FILTER_AS_DES,
        payload
    }
}


export function searchByName(name){
return async function(dispatch){
    try {
        const response = await axios.get()
    } catch (error) {
        
    }
}
}