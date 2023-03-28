const {Diets} = require("../db.js")
const axios = require("axios")
const {API_Key} = process.env;
// const {getApiInfo} = require("./API_info")
const spoonacularURL = "https://api.spoonacular.com"

const getDiets = async () =>{
    
    const response =  await axios.get(`${spoonacularURL}/recipes/complexSearch?addRecipeInformation=true&number=100&apiKey=${API_Key}`) 
        // .then((data) => data.results)
        // .then((results) => {
        //     results.map((el))
        // })
        const{results} = response.data
        const apiDiets = await results.map(el => el.diets)
        

        for (let i = 0; i < apiDiets.length; i++) {
            const diets = apiDiets[i]
                diets.forEach (async el => {
            await Diets.findOrCreate({
                where:{name:el}
            })
        });
            
        }
        // const iteracion = apiDiets.map(el =>{
        //     for (let i = 0; i < el.length; i++) return el[i]})
        //     console.log("Iteracion:" + iteracion)
        // i
        //     
        const allDiets = await Diets.findAll()
        return allDiets
}


module.exports = {
    getDiets
}