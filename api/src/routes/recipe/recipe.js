const express = require('express')
const router = express.Router()
require('dotenv').config();
const { 
    getRecipeName,
    postRecipe, 
    RecipeId, 
} = require("../../controllers/controllers_recipe")




router.post("/",postRecipe)

router.get("/name", async(req, res)=>{
    const {name} = req.query
    try {
        const infoName = await getRecipeName(name)
        res.status(200).send(infoName)
    console.log("funciona")  
    } catch (error) {
        res.status(400).send("No encontro")
    }
})

router.get("/:id",RecipeId);
module.exports = router