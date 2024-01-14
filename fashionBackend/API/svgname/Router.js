const express = require('express');
const router = express.Router();
const { CreateSvg,SvgByName,SvgByID, AllSvg, UpdateSvg, DeleteSvg } = require('./Controller');


router.post('/create-svg', CreateSvg);
router.get('/get-svg-by-name', SvgByName);
router.get('/get-svg-by-id', SvgByID);
router.get('/get-all-svg', AllSvg);
router.put('/update-svg', UpdateSvg);
router.delete('/delete-svg', DeleteSvg);

module.exports = router;
