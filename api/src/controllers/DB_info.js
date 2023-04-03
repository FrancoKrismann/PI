const {  Recipe, Diets  } = require('../db.js');

const getDbInfo = async () => {
    try{
        const dataDB =  await Recipe.findAll({ 
            include:{
                model: Diets,
                attributes: ['name',"id"],
                through:{
                    attributes: []
                }
            }
        })
        let response = await dataDB?.map(recipe => {
            return {
                id: recipe.id,
                title: recipe.title,
                summary: recipe.summary,
                score: recipe.score,
                healthScore: recipe.healthScore,
                image: recipe.image,
                steps: recipe.steps,
                diets: recipe.diets?.map(diet => diet.name),
                createdInDb:recipe.createdInDb,
            }
        });
return response;
        
    }catch (error) {
    console.error(error);
    }
}

module.exports = {
    getDbInfo  
}