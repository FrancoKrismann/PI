const express = require('express')
const router = express.Router()
require('dotenv').config();
const{getDiets} = require("../../controllers/DB_DIETS.js")



router.get("/db", async(req, res)=>{
    try {
        const diets = await getDiets()
        res.status(202).send(diets)
    } catch (error) {
        res.status(404).json({message:error.message})
    }
})





module.exports = router