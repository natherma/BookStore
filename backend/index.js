import express from "express";
import {PORT} from "./config.js"
import dotenv from "dotenv"
import mongoose from "mongoose";
import {book} from "./models/bookModels.js"
dotenv.config()

let app = express();

app.use(express.json())

app.get('/',(req,res)=>
{
   res.send("Hey there!!")
})

app.post('/createBook', async(req,res)=>
{
    try{
        if(!req.body.title||!req.body.author||!req.body.publishYear)
        {
            res.status(400).send("requied fieled missing");
        }
        else
        {
            const newBook = {title:req.body.title,author:req.body.author,publishYear:req.body.publishYear}
            const createBook = await book.create(newBook)
            res.status(200).json({"message":"book was created"})
        }
    }
    catch(error) 
    {
        console.log(error.message);
        res.status(500).send({message:error.message})
    }

})

app.get("/allbooks",async(req,res)=>
{
    try{
        const allbooks = await book.find();
        res.status(200).json(allbooks);
    }
    catch(error) 
    {
        console.log(error.message);
        res.status(500).send({message:error.message})
    }
})

app.get("/allbooks/:id",async(req,res)=>
{
    let {id} = req.params;
    try{
        const allbooks = await book.findById(id);
        res.status(200).json(allbooks);
    }
    catch(error) 
    {
        console.log(error.message);
        res.status(500).send({message:error.message})
    }
})



app.listen(PORT,()=>
{
    console.log(`Server stated at http://localhost:${PORT}`)
    mongoose.connect(process.env.MONGODB_KEY).then(()=>
        {
            console.log("Connected to Database")
        }).catch(error => 
            {
                console.log(error)
            })

})