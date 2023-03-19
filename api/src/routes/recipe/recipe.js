const express = require('express')
const router = express.Router()
require('dotenv').config();
const {
    getAllRecets, 
    getRecipe,
    postRecipe, 
    getApiInfo,
    RecipeId, 
} = require("../../controllers/controllers")



router.get("/:id",RecipeId);


router.post("/",postRecipe)



module.exports = router