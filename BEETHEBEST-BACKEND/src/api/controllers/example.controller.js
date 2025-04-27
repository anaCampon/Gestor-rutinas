const eventModel = require('../models/event.models');
const bcrypt = require('bcrypt');
const {createToken} = require ('../../utils/jwt');

const getAll = async (req, res) => {
    try{
        const result = await eventModel.selectAll();
        if(result.length === 0){
            return res.status(404).json({message: 'No se han encontrado datos'});
        }
        return res.status(200).json({ data: result});
    } catch (error){
        return res.status(500).json(error);
    }
};

const getById = async (req, res) => {
    try{
        if (req.params.id){
            const result = await eventModel.selectById(req.params.id);
            if(result.length === 0){
            return res.status(404).json({message: 'No se han encontrado datos'});
            }
            return res.status(200).json({ data: result});
        } else {
            return res.status(400).json({ message: 'debe enviar el id'})
        }
    } catch (error){
        return res.status(500).json(error);
    }
};

const createEvent = async (req, res) => {
    try{
        const {nombre} = req.body;
        //Busco si existe un evento con el mismo nombre
        const selectedEvent = await eventModel.selectByName(nombre);
            if (selectedEvent.length > 0) {
                console.log(selectedEvent)
                return res.status(400).json({message: 'Evento ya incluido en la Base de Datos'});
            } else {
                //Si no existe lo inserto en la BBDD
                const result = await eventModel.insertEvent(req.body);
                if(!result){
                    return res.status(400).json({message: 'No se ha insertado'});
                }
                return res.status(201).json({ clientid: result});
            }
    } catch (error){
        return res.status(500).json(error);
    }
};

/*
{"nombre":"Carrera Nocturna",
"descripcion":"Competencia de 5km en horario nocturno.",
"fecha":"2024-04-22",
"ubicacion":"Bilbao",
"deporte":"Atletismo"
}
*/

/*
const updateEvent = async (req, res) => {
    try{
        const id = req.params.id;
        const { nombre, descripcion, fecha, ubicacion, deporte, organizador_id } = req.body;
        //Busco si existe un evento con el mismo id
        const selectedId = await eventModel.selectById(id);
            if (selectedId.length === 0) {
                return res.status(400).json({message: 'Evento no incluido en la Base de Datos'});
            } else {
                //Si existe lo modifico en la BBDD
                const result = await eventModel.modifyEvent({ idevento:id, nombre, descripcion, fecha, ubicacion, deporte, organizador_id });
                console.log(selectedId)
                if(!result){
                    return res.status(400).json({message: 'No se ha modificado'});
                }
                return res.status(201).json({ message: "Evento actualizado correctamente" });
            }
    } catch (error){
        console.error("Error en el servidor:", error);
        return res.status(500).json({ message: "Error en el servidor", error });
    }
};

const dropEvent = async (req, res) => {
    try{
        const id = req.params.id;
        //Busco si existe un evento con el mismo id
        const selectedId = await eventModel.selectById(id);
            if (selectedId.length === 0) {
                return res.status(400).json({message: 'Evento no incluido en la Base de Datos'});
            } else {
                //Si existe lo modifico en la BBDD
                const result = await eventModel.deleteEvent(req.params.id);
                if(!result){
                    return res.status(400).json({message: 'No se ha eliminado'});
                }
                return res.status(201).json({ message: "Evento eliminado correctamente" });
            }
    } catch (error){
        console.error("Error en el servidor:", error);
        return res.status(500).json({ message: "Error en el servidor", error });
    }
};

const getAllByDate = async (req, res) => {
    try{
        const result = await eventModel.selectAllByDate();
        if(result.length === 0){
            return res.status(404).json({message: 'No se han encontrado datos'});
        }
        return res.status(200).json({ data: result});
    } catch (error){
        return res.status(500).json(error);
    }
};

const getBySport = async (req, res) => {
    try{
        if (req.query.type){
            const result = await eventModel.selectBySport(req.query.type);
            if(result.length === 0){
            return res.status(404).json({message: 'No se han encontrado datos'});
            }
            return res.status(200).json({ data: result});
        } else {
            return res.status(400).json({ message: 'debe enviar el deporte'})
        }
    } catch (error){
        return res.status(500).json(error);
    }
};

const getByDate = async (req, res) => {
    try{
        const from = req.query.from;
        const to = req.query.to;
        const result = await eventModel.selectByDate({from, to});
        if(result.length === 0){
            return res.status(404).json({message: 'No se han encontrado datos'});
        }
        return res.status(200).json({ data: result});
    } catch (error){
        return res.status(500).json(error);
    }
};

//http://localhost:4500/events/date?from=2023-09-10&to=2023-09-20

module.exports = { getAll, getById, createEvent, updateEvent, dropEvent, getAllByDate, getBySport, getByDate };
*/