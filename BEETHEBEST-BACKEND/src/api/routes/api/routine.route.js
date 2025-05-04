//rutas
const router = require('express').Router();
const routine = require('../../controllers/routine.controller');
const {checkToken } = require ('../../middleware/auth');


router.get('/',checkToken, routine.seeRoutines);
router.post('/generate',checkToken, routine.generateRoutines);
router.post('/generate/task',checkToken, routine.generateTask);
router.put('/:id', checkToken, routine.updateTask);
router.delete('/:id', checkToken, routine.dropTask);


module.exports = router;