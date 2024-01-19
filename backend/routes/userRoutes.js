const express = require('express')
const router=express.Router()
const {
    registerUser,
    loginUser,
    getMe,
    getQuestions,
    insertQuestion,
    dropQuestion,
    getResult,
    storeResult,
    dropResult
} = require('../controller/userController')
const {protect} = require('../middleware/authMiddleware')

router.post('/',registerUser)

router.post('/login',loginUser)

router.get('/me',protect,getMe)

router.route('/questions').get(getQuestions).post(insertQuestion).delete(dropQuestion)

router.route('/result').get(getResult).post(storeResult).delete(dropResult)

module.exports=router