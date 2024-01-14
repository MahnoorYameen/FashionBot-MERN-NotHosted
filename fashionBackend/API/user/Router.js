const express = require('express')
const router = express.Router()


const { Login, Register,userByEmail, deleteUser, updateProfile, userByID, getAllUsers } = require('./Controller')


router.post('/login', Login)
router.post('/register', Register)
router.get('/getalluser', getAllUsers)
router.get('/getuserbyid', userByID)
router.get('/getuserbyemail', userByEmail)
router.delete('/delete-user', deleteUser)
router.put('/update-user', updateProfile)




module.exports = router