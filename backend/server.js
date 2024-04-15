const express=require("express")
const app=express()
const cors=require("cors")
require("dotenv").config()
const bodyParser=require("body-parser")
const rateLimiter=require("express-rate-limit")
const port=process.env.SERVER_PORT|| 3000
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())


const limit=rateLimiter.rateLimit({
    windowMs:1000,
    max:10
})

app.use(limit);

// test endponint
app.get((req,res)=>{
    res.status(200).json({message:"Merit-classroom app"})
})

app.listen(port,(err)=>{
    if(err) throw new Error("server failed to start")
    console.log(`server is up on port :${port}`)

})

process.on('uncaughtException',(error)=>{
    console.log('Uncaught error',error)
})