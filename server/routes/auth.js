const express = require('express');
const {auth} = require('../controllers/auth');
const {fetch} = require('../controllers/getUsername');

const router = express.Router();

router.post('/signup', auth.signup);
router.post('/login', auth.login);
router.post('/fetchUsername', fetch.fetchUsername);
router.put('/',auth.editProfile);

module.exports = router;