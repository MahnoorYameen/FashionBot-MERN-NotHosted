const express = require("express");
const router = express.Router();

const {PostAnAdd,getAdd,getAddDetails} = require('./Controller')

router.post("/postAnAdd", PostAnAdd);
router.get("/getAdd", getAdd);
router.get("/getAddDetails/:_id",getAddDetails)

// router.post('/register', Register)
// router.get('/getalluser', getAllUsers)
// router.get('/getuserbyid', userByID)
// router.get('/getuserbyemail', userByEmail)
// router.delete('/delete-user', deleteUser)
// router.put('/update-user', updateProfile)

module.exports = router;
