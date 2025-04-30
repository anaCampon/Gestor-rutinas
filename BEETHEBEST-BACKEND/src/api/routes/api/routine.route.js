//rutas
const router = require('express').Router();
const profile = require('../../controllers/routine.controller');
const {checkToken } = require ('../../middleware/auth');


router.get('/',checkToken, profile.seeRoutines);
router.post('/generate',checkToken, profile.generateRoutines);
router.post('/generate/task',checkToken, profile.generateTask);


module.exports = router;