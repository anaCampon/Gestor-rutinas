
const router = require('express').Router();

router.use('/users', require('./api/user.route'));
router.use('/profile', require('./api/profile.route'));

module.exports = router;
