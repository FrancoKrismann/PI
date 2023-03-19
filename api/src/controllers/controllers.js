const {  Recipe, Diets  } = require('../db.js');
const axios = require("axios")
const {API_Key} = process.env;
const URL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_Key}&addRecipeInformation=true&number=100`


const getApiInfo = async() => {
    
    const apiUrl = await axios.get(URL)
    const api = await apiUrl.data.results?.map((el) => {
    return {
        id:el.id,
        title:el.title,
        image:el.image,
        summary:el.summary,
        healthScore:el.healthScore,
        diets:el.diets?.map((diet) => diet),
        steps:el.analyzedInstructions?.map(
            (instrucciones) => instrucciones.steps),
    }
})    
return api;
}

const getDbInfo = async () => {
    try {
    const Dbinfo = await Recipe.findAll({
        include:{
            model: Diets,
            atributes:["name"],
            through:{
                atributes:[]
            }
        }
    })    
    let getDb = await Dbinfo?.map(recipe => {
        return {
            id: recipe.id,
            title: recipe.title,
            image: recipe.image,
            summary: recipe.summary,
            healthScore: recipe.healthScore,
            steps: recipe.steps,
            diets: recipe.diets?.map(diet => diet.name),
        }
    });
return getDb;
}catch (error) {
console.error(error);
}
}




const RecipeId = async(req, res) => {
    const { id } = req.params
    
        try {  
        if(id.length){       
        const recipeAPI = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_Key}`)
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
        
        } else {
        
            const recipeDB = await Recipe.findByPk(id,{
                include: {
                model: Diet,
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
                    diets:recipeDB.diets?.map(
                        (diet) => diet.name),
                    steps:recipeDB.steps?.map(
                    (instrucciones) => instrucciones.steps),
                }    
                return res.status(200).json(recipeInfoDB)
            }else throw Error("Not found recipe")
        }
        
        }else throw Error ("No llego ningun ID")   
        } catch (error) {
        res.status(404).json({message:error.message})   
        }
    
}




const getAllRecets = async () => {
    try {
    let apiInfo = await getApiInfo();
    let dbInfo = await getDbInfo();
    const infototal = apiInfo.concat(dbInfo);

    return infototal;    
    } catch (error) {
        console.error(error)
    }
    
}

const getRecipe = async(req, res) => {
    const { id } = req.params
    const recipes = await getApiInfo()
    const recipe = await recipes.find(recipe => recipe.id === id);
    if(!recipe) return console.error("No se encontró ninguna receta con ese ID");
    try {   
// const recipeDetail = {
//         id:recipe.id,
//         name:recipe.title,
//         image:recipe.image,
//         summary:recipe.summary,
//         healthScore:recipe.healthScore,
//         diets:recipe.diets?.map(diet => diet),
//         steps:recipe.steps?.map(step => step)

//     }
    console.log(recipeDetail)
    res.status(200).json(recipeDetail)   
    } catch (error) {
        res.status(400).send(error)
    }

}

const postRecipe = async (req, res) =>{
const {title, image, summary, healthScore, steps} = req.body   
if(!title || !image || !summary || !healthScore || !steps) throw Error("Falta un dato")
    try {
const newRecipe = await Recipe.create({
    title,
    image,
    summary,
    healthScore,
    steps,
})

console.log("Recipe created" + newRecipe) 
res.status(200).send("Recipe created")   
    } catch (error) {
        res.status(400).send("No se creo correctamente"+ error)
    }

}


module.exports = {
getAllRecets,
getRecipe,
postRecipe,
getApiInfo,
getDbInfo,
RecipeId,
}