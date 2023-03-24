const {API_Key} = process.env;
const spoonacularURL = "https://api.spoonacular.com"
const axios = require("axios")

const getApiInfo = async () => {
try {
const {data}= await axios.get(`${spoonacularURL}/recipes/complexSearch?addRecipeInformation=true&number=100&apiKey=${API_Key}`);
        const { results } = data ;
        
        
            const response = results?.map((result) => {
            const{title, image , id, healthScore, diets, summary, steps} = result
                return {
                    title,
                    image, 
                    id, 
                    healthScore,  
                    diets,
                    summary, 
                    steps: (result.analyzedInstructions[0] && result.analyzedInstructions[0].steps?result.analyzedInstructions[0].steps?.map(item=>item.step).join(" \n"):'')
                }        
            })

        return response;
    
    
} catch (error) {
    console.error(error)
}
        

}

module.exports = {
    getApiInfo
}