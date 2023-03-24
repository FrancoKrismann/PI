const express = require('express')
const router = express.Router()
require('dotenv').config();

const {getAllRecipes} = require("../../controllers/API_DB")





router.get("/all", async(req, res) =>{
    try {
        const info = await getAllRecipes()
        res.status(200).send(info)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})