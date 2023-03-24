const {  Recipe, Diets  } = require('../db.js');
const axios = require("axios")
const {API_Key} = process.env;
const spoonacularURL = "https://api.spoonacular.com"
const {getAllRecipes} = require("./API_DB")
const{getDbInfo} = require("./DB_info")


//------------ID-------------------------------------------------------->
//Hecho
const RecipeId = async(req, res) => {
    const { id } = req.params
    const idSearch = id
        try {    
        if(idSearch.length > 20){
        const recipeDB = await Recipe.findByPk(idSearch,{
                include: {
                model: Diets,
                atributes: ["name"],
                through: {
                    attributes: [],
                    },
                },
            });
            if(recipeDB){
                const recipeInfoDB = {
                    id:recipeDB.idApi,
                    name:recipeDB.title,
                    image:recipeDB.image,
                    summary:recipeDB.summary,
                    healthScore:recipeDB.healthScore,
                    diets:recipeDB.diets?.map((diet) => diet.name),
                    steps:recipeDB.steps,
                }
                return res.status(200).json(recipeInfoDB)
                } else throw Error ("Not found")
                
            } else {
        const recipeAPI = await axios.get(`https://api.spoonacular.com/recipes/${idSearch}/information?apiKey=${API_Key}`)
        console.log(id)
        if(recipeAPI){
        const { data } = recipeAPI
        const {idApi, title, image, summary, healthScore, diets, analyzedInstructions} = data
        const recipeInfoApi = {
            id:idApi,
            name:title,
            image:image,
            summary:summary,
            healthScore:healthScore,
            diets:diets,
            steps:analyzedInstructions?.map(
            (instrucciones) => instrucciones.steps),
        }    
        res.status(200).json(recipeInfoApi)
        }
    }

        } catch (error) {
        res.status(404).json({message:error.message})   
        }
    
}


//------------------QueryName--------------------------------------------->
//Hecho
const getApiName = async(name) => {
    
   
const apiUrl = await axios.get(`${spoonacularURL}/recipes/complexSearch?query=${name}&addRecipeInformation=true&number=100&apiKey=${API_Key}`)
const { results } = apiUrl.data;

const filter = await results.filter(recipe => recipe?.title.toLowerCase().includes(name.toLowerCase()))
if(filter.length > 0){
    const response = filter?.map(result => {
        return {
            title: result.title, 
            image: result.image, 
            id: result.id, 
            healthScore: result.healthScore, 
            diets: result.diets?.map(element => element), 
            summary:result.summary, 
            steps: (result.analyzedInstructions[0] && result.analyzedInstructions[0].steps?result.analyzedInstructions[0].steps.map(item=>item.step).join(" \n"):'')
        }
    })
    return response
}else{
return ["Not found recipe by name on API"]
}
}

//Hecho
const getDBName = async(name) => {

const infoDB = await getDbInfo()  
if (infoDB) {
    const recipeNameDB = await infoDB.filter(recipe => recipe.title?.toLowerCase().includes(name.toLowerCase()));
        if(recipeNameDB.length > 0){
            return recipeNameDB
        }else{
            console.log("Nada en la DB")
            return ["Not found recipe by name on DB"] 
        }

}else{
    console.log("Nada en DB")
} 

}

const getRecipeName = async(name) => {
    
        if(name){
        const apiname = await getApiName(name)
        const dbname = await getDBName(name)
        console.log(["DB" +dbname])
        const recipefilter = [...apiname, ...dbname]
        if(recipefilter.length > 0){
            return recipefilter
        }   
        }
        
    }



//Terminarla
const postRecipe = async (req, res) =>{
const {title, image, summary, healthScore, steps, diets} = req.body   
if(!title || !image || !summary || !healthScore || !steps || !diets) throw Error("Falta un dato")
    try {
const newRecipe = await Recipe.create({
    title,
    image,
    summary,
    healthScore,
    steps,
})
const dietsDB =  await Diets.findAll({ 
    where: {name: diets}
})
newRecipe.addDiets(dietsDB)
console.log("Recipe created" + newRecipe) 
res.status(200).send("Recipe created")   
    } catch (error) {
        res.status(400).send("No se creo correctamente"+ error)
    }

}


module.exports = {
    // getAPI_DBname,
getRecipeName,
postRecipe,
RecipeId,
getApiName,
getDBName,

}