const express=require('express')
const moment=require('moment')
const cors=require('cors');
const connection = require('./db/db');
const router=require("./Router/router")
require('dotenv').config();
const app=express();
app.use(cors())
app.use(express.json())
const PORT=process.env.PORT

app.get("/", (req, res)=>{
    res.send('Base URL Point')
})

app.use(router)



app.listen(PORT,async()=>{
    try {
        await connection;
        console.log(`Connected To Port ${PORT}`) 
    } catch (error) {
        console.log(error)
    }
})