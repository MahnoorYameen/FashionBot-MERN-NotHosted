const express = require("express");
const router = express.Router();

const {CreateRoom} = require('./controller')

router.post("/create-room", CreateRoom);


// router.post('/register', Register)
// router.get('/getalluser', getAllUsers)
// router.get('/getuserbyid', userByID)
// router.get('/getuserbyemail', userByEmail)
// router.delete('/delete-user', deleteUser)
// router.put('/update-user', updateProfile)

module.exports = router;