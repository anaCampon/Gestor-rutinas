
const router = require('express').Router();

router.use('/users', require('./api/user.route'));
router.use('/profile', require('./api/profile.route'));
router.use('/routine', require('./api/routine.route'));

module.exports = router;
