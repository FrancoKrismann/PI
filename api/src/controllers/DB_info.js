const {  Recipe, Diets  } = require('../db.js');

const getDbInfo = async () => {
    try{
        const dataDB =  await Recipe.findAll({ 
            include:{
                model: Diets,
                attributes: ['name'],
                through:{
                    attributes: []
                }
            }
        })
        return dataDB;
    }catch (error) {
    console.error(error);
    }
}

module.exports = {
    getDbInfo  
}