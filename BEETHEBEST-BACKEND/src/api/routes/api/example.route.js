/*
const router = require('express').Router();
const profile = require('../../controllers/profile.controller');
const {checkToken } = require ('../../middleware/auth');

//Todas las rutas event están protegidas con JWT
//Consultas avanzadas
router.get('/', checkToken, profile.getBySport);
router.get('/date', checkToken, profile.getByDate);
router.get('/upcoming', checkToken, profile.getAllByDate);

//Consultas generales
router.get('/', checkToken, profile.getAll);
router.get('/:id', checkToken, profile.getById);
router.post('/', checkToken, profile.createEvent);
router.put('/:id', checkToken, profile.updateEvent);
router.delete('/:id', checkToken, profile.dropEvent);



module.exports = router;*/