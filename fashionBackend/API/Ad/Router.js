const express = require('express');
const router = express.Router();
const { CreateAd,AllAd,AdByAdCategoryName,AdReviews, AdByBrandName, AdsByName, AdByID, UpdateAd, DeleteAd, SearchAd } = require('./Controller');


router.post('/create-ad', CreateAd);
router.get('/get-ads-by-name/:search', AdsByName);
router.get('/get-ad-by-brandname', AdByBrandName);
router.get('/get-ad-by-AdCategory', AdByAdCategoryName);
router.get('/get-ad-by-id', AdByID);
router.get('/get-all-ad', AllAd);
router.put('/update-ad', UpdateAd);
router.delete('/delete-ad', DeleteAd);

// for rating purpose
router.post('/review-ad', AdReviews)


router.get('/get-ad-by-search/:searchh', SearchAd)


module.exports = router;