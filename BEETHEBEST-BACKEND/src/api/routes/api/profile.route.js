//rutas
const router = require('express').Router();
const profile = require('../../controllers/profile.controller');
const {checkToken } = require ('../../middleware/auth');


router.get('/', checkToken, profile.profile);
router.post('/form',checkToken , profile.profileForm);

module.exports = router;