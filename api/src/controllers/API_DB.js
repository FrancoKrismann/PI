const {getApiInfo} = require("./API_info")
const {getDbInfo} = require("./DB_info")




const getAllRecipes = async() =>{
    try {
        const apiInfo = await getApiInfo();
        const dbInfo = await getDbInfo();
        const totalInfo = [...apiInfo, ...dbInfo];
        return totalInfo
    } catch (error) {
        
    }
}
//Verificar si pasa como funcion async
module.exports = {
    getAllRecipes 
}