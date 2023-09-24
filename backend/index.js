import express from "express";
import {PORT} from "./config.js"
import dotenv from "dotenv"
import mongoose from "mongoose";
import {book} from "./models/bookModels.js"
import cors from "cors"

dotenv.config()

let app = express();

app.use(express.json())
app.use(cors({
    methods:["GET","POST","PUT","DELETE"],
    allowedHeaders:['Content-Type']
}))

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


app.put('/updateBook/:id', async(req,res)=>
{
    const {id}  = req.params
    try{
        if(!req.body.title||!req.body.author||!req.body.publishYear)
        {
            res.status(400).send("requied fieled missing");
        }
        else
        {
            const updateBook = await book.findByIdAndUpdate(id,req.body)
            if(!updateBook)
            {
               res.status(400).json({"message":"book was not found"})
            }
            else
            {
                res.status(200).json({"message":"book was updated"})
            }
        }
    }
    catch(error) 
    {
        console.log(error.message);
        res.status(500).send({message:error.message})
    }

})


app.delete("/deletebook/:id",async(req,res)=>
{
    let {id} = req.params;
    try{
        const deletebook = await book.findByIdAndDelete(id);
        if(!deletebook)
            {
               res.status(400).json({"message":"book was not found"})
            }
            else
            {
                res.status(200).json({"message":"book was deleted"})
            }
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
    mongoose.connect("mongodb+srv://nafees:nafees@cluster0.o8koijo.mongodb.net/?retryWrites=true&w=majority").then(()=>
        {
            console.log("Connected to Database")
        }).catch(error => 
            {
                console.log(error)
            })

})