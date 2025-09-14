const express = require('express');
const router = express.Router();
const { createOrUpdateProfile, getOwnProfile } = require('../controllers/professionalController');
const authenticateToken = require('../middleware/auth');
const {validateProfile} = require('../middleware/validateInput')

router.post('/profile',validateProfile, createOrUpdateProfile);
router.get('/profile/:id', getOwnProfile);


module.exports = router;
