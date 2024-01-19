const express= require('express')
const app=express()
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const PORT=process.env.PORT || 5000
const connectDB = require('./config/db')
const cors=require('cors')

//Connect Db
connectDB()


app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:false}))

app.get('/',(req,res)=>{
    res.status(200).json({message:"Welcome"})
})

app.use('/api/users',require('./routes/userRoutes'))
app.use(errorHandler)

app.listen(PORT,()=>{console.log(`Server running on ${PORT}`)})
