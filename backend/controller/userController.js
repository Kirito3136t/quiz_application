const asyncHandler = require('express-async-handler')
const bcrypt =require ('bcryptjs')
const jwt = require('jsonwebtoken')
const Questions=require('../models/questionSchema')
const Results=require('../models/resultSchema')
const questions= require('../config/data')
const {answers} = require('../config/data') 
const User = require('../models/userModal')

// Register a new user
// /api/users
// Public 
const registerUser=asyncHandler(async(req,res)=>{
    const {name,email,password}=req.body

    //Validation
    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please include all fields')
    }

    //Find user already exist
    const userExist = await User.findOne({email})
    if(userExist){
        res.status(400)
        throw new Error ('User already exist')
    }

    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    const user = await User.create({
        name,
        email,
        password:hashedPassword
    })

    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)
        })

    }else{
        res.status(400)
        throw new Error('Invalid User Data')
    }
   
}
)

const loginUser=asyncHandler(async(req,res)=>{
    const {email,password} = req.body
    const user = await User.findOne({email})

    //check user and pass matched
    if(user && (await bcrypt.compare(password,user.password))){
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)
        })
    }else{
        res.status(401)
        throw new Error('Invalid credentials')
    }
    
    
}
)

// Get current User
// /api/users
// Public 
const getMe=asyncHandler(async(req,res)=>{
    const user={
        id:req.user._id,
        email:req.user.email,
        name:req.user.name
    }
    res.status(200).json(user)
})

const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'30d'
    })
}

const getQuestions=asyncHandler(async(req,res)=>{
   try {
        const q=await Questions.find()
        res.json(q)
   } catch (error) {
        res.json({error})
   }
})

const insertQuestion = asyncHandler(async (req, res) => {
    try {
        Questions.insertMany({questions,answers})
        res.status(201).json({
            message: 'Questions inserted successfully',
        });

    } catch (error) {
        res.json({error})
    }
});


const dropQuestion=asyncHandler(async(req,res)=>{
    try {
        await Questions.deleteMany();
        res.json('Questions deleted')
    } catch (error) {
        res.json({error})
    }
})

const getResult=asyncHandler(async(req,res)=>{
    try {
        const r =await Results.find()
        res.json(r)

    } catch (error) {
        res.json({error})
    }
})

const storeResult=asyncHandler(async(req,res)=>{
    try {
        const {username,result,attempts,points,achieved}=req.body 
        if(!result){
            throw new Error ('Datat not provided')
        }

        Results.create({username,result,attempts,points,achieved})
        
        res.status(201).json({
            message: 'Result saved succesffuly',
        });

    } catch (error) {
        res.json({error})
    }
})

const dropResult=asyncHandler(async(req,res)=>{
    try {
        await Results.deleteMany()
        res.json({message:"Result deleted succesfully"})
    } catch (error) {
        res.json({error})
    }
})

module.exports={
    registerUser,
    loginUser,
    getMe,
    getQuestions,
    insertQuestion,
    dropQuestion,
    getResult,
    storeResult,
    dropResult
}