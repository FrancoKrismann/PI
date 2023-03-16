const {  Recipe, Diets  } = require('../db.js');
const axios = require("axios")
const {API_Key} = process.env;

const getApi = async(req, res) =>{
const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_Key}&addRecipeInformation=true&number=100`)
}



const getRecipe = async (req, res) => {
    const {id} = req.params
    try {

    const recipe = await Recipe.findAll()
    console.log(recipe)
    res.status(200).json(recipe)   
    } catch (error) {
        res.status(400).send(error)
    }

}

const postRecipe = async (req, res) =>{
const {name, image, summary, health_score, steps} = req.body   
if(!name || !image || !summary || !health_score || !steps) return new Error
    try {
const newRecipe = await Recipe.create({
    name,
    image,
    summary,
    health_score,
    steps
})
console.log(newRecipe)
res.send("Recipe created")    
    } catch (error) {
        res.status(400).send("No se creo correctamente"+ error)
    }

}


module.exports = {
getRecipe,
postRecipe
}