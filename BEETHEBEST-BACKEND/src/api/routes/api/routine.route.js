//rutas
const router = require('express').Router();
const profile = require('../../controllers/routine.controller');
const {checkToken } = require ('../../middleware/auth');


router.get('/',checkToken, profile.seeRoutines);
router.post('/generate',checkToken, profile.generateRoutines);

module.exports = router;