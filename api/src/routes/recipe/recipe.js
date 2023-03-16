const express = require('express')
const router = express.Router()
require('dotenv').config();
const {getRecipe,postRecipe} = require("../../controllers/controllers_recipe")



router.get("/:idRecipe",getRecipe)

router.post("/",postRecipe)



module.exports = router