const express = require('express');
const journal = require('../controllers/journal');

const router = express.Router();

router.post('/', journal.save);
router.get('/', journal.retrieve);
router.get('/analytics', journal.analytics);
router.get('/getTodayDreamCount', journal.getTodayDreamCount);



module.exports = router;