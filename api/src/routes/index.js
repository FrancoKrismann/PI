const  Router  = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const express = require("express")
const  recipe = require("./recipe/recipe")
const recipes = require("./recipes/recipes")
const diet = require("./diets/diets")

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(express.json())
// server.use(cors())
router.use("/recipe", recipe)
// router.use("/types", diet)
// router.use("/recipes",recipes)

module.exports = router ;
