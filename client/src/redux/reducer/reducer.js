import {GET_RECIPES,ERROR, FILTER_DIET, FILTER_WHERE,FILTER_AS_DES} from "../actions type/actions-types.js"



const initialState ={
recipes:[],
allrecipes:[],
errors:{}
}

const rootReducer = (state = initialState, action) =>{
switch (action.type) {
    case GET_RECIPES:
        
        return{
            ...state,
            recipes:action.payload,
            allrecipes:action.payload,
            errors:{}
        }
    case FILTER_DIET:
        const allRecipe = state.allrecipes
        
        const filterRecipe = action.payload === "All" ?
        allRecipe 
    : allRecipe.filter(recipe => recipe.diets.includes(action.payload) )
        return{
            ...state,
            recipes:filterRecipe
        }
        case FILTER_WHERE:
            const allRecipe_1 = state.allrecipes
            const filterWhere =  action.payload ==="DB" 
            ? allRecipe_1.filter(recipe => recipe.createdInDb)
            : allRecipe_1.filter(recipe => !recipe.createdInDb)
            
        
            return {
                ...state,
                recipes:action.payload === "All" ? allRecipe_1 : filterWhere
            }
        case FILTER_AS_DES:
            const filterbyAlfab = action.payload === "Ascendente"
            ? state.allrecipes.sort(function(a,b){
                if(a.title > b.title){
                    return 1
                }
                if(b.title > a.title){
                    return -1
                }
                return 0
            }):state.allrecipes.sort(function(a,b){
                if(a.title > b.title){
                    return -1
                }
                if(b.title > a.title){
                    return 1
                }
                return 0
            })
            console.log(filterbyAlfab)
        return{
            ...state,
            recipes:filterbyAlfab
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