const routineModel = require('../models/routine.models');


const seeRoutines = async (req, res) => {
    try{
     //Para obtener el id del usuario y poder cargar los datos de este id
        const userResult = await routineModel.seeProfile(req.user.username);
        if(!userResult) {
            return res.status(404).json({message: 'No se han encontrado el usuario'});
        }
        const userData = {
            id:userResult.idUsers, username:userResult.username
        }
        console.log('Id de usuario:', userData.id)
        //Una vez tengo el id que ha introducido el token muestro las rutinas solo de ese id
        const result = await routineModel.selectRoutines(userData.id);

        return res.status(200).json({ data: result});
    } catch (error){
        console.error('Error en seeRoutines:', error);
        return res.status(500).json({error: 'Error al obtener las rutinas'});
    }
};

const generateRoutines = async (req, res) => {
    try{
        //Para obtener el id del usuario y poder cargar los datos en este id
        const userResult = await routineModel.seeProfile(req.user.username);
        if(userResult.length === 0) {
            return res.status(404).json({message: 'No se han encontrado el usuario'});
         }
        const userData = {
            id:userResult.idUsers, username:userResult.username
        }
        console.log('Id de usuario:', userData.id)
        const {name, week, tareas} = req.body;
        //Creo la rutina
        const result = await routineModel.insertRoutine(name, week, userData.id);
        console.log('Rutina creada con ID:', result.insertId);
        console.log('Tareas:', tareas);
        console.log('Result:', result);
        //Creo las tareas asociadas
        if (tareas) {
            const resultTask = await routineModel.insertTask(result.insertId, tareas);
            console.log('Se han guardado las tareas')
        }
        return res.status(201).json({message: 'Rutina registrada con éxito', id: result});
    } catch (error){
        console.log(error)
        return res.status(500).json(error);
    }
};

const getTaskById = async (req, res) => {
    try{
        if (req.params.id){
            const result = await routineModel.selectTaskById(req.params.id);
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

const updateTask = async (req, res) => {
    try{
        const id = req.params.id;
        const { task, weekDay, initTime,  endTime, Description, Routine_id } = req.body;
        //Busco si existe una tarea con el mismo id
        const selectedId = await routineModel.selectTaskById(id);
            if (selectedId.length === 0) {
                return res.status(400).json({message: 'tarea no incluida en la Base de Datos'});
            } else {
                //Si existe lo modifico en la BBDD
                const result = await routineModel.modifyTask({ id_tasks:id, task, weekDay, initTime,  endTime, Description, Routine_id });
                console.log(selectedId)
                if(!result){
                    return res.status(400).json({message: 'No se ha modificado'});
                }
                return res.status(200).json({ message: "Tarea actualizada correctamente" });
            }
    } catch (error){
        console.error("Error en el servidor:", error);
        return res.status(500).json({ message: "Error en el servidor", error });
    }
};


const dropTask = async (req, res) => {
    try{
        const id = req.params.id;
        //Busco si existe una tarea con el mismo id
        const selectedId = await routineModel.selectTaskById(id);
            if (selectedId.length === 0) {
                return res.status(400).json({message: 'Tarea no incluida en la Base de Datos'});
            } else {
                //Si existe lo modifico en la BBDD
                const result = await routineModel.deleteTask(req.params.id);
                if(!result){
                    return res.status(400).json({message: 'No se ha eliminado'});
                }
                return res.status(201).json({ message: "Tarea eliminada correctamente" });
            }
    } catch (error){
        console.error("Error en el servidor:", error);
        return res.status(500).json({ message: "Error en el servidor", error });
    }
};

/*  
{
  "name": "Rutina de Lenguas",
  "week": "2025-04-29",
  "tareas": [
    {
      "task": "Estudiar inglés",
      "weekDay": "Lunes",
      "initTime": "09:00",
      "endTime": "10:00",
      "Description": "Repaso de gramática"
    },
    {
      "task": "Ver película en alemán",
      "weekDay": "Miércoles",
      "initTime": "18:00",
      "endTime": "20:00",
      "Description": "Película subtitulada para mejorar listening"
    }
  ]
}

     */


const generateTask = async (req, res) => {
    try{
        //Para obtener el id del usuario y poder cargar los datos en este id
        const userResult = await routineModel.seeProfile(req.user.username);
        if(userResult.length === 0) {
            return res.status(404).json({message: 'No se han encontrado el usuario'});
         }
        const userData = {
            id:userResult.idUsers, username:userResult.username
        }
        console.log('Id de usuario:', userData.id)
        const {IdRoutine, task, weekDay, initTime, endTime, Description} = req.body;
        //Creo las tareas asociadas
        const resultTask = await routineModel.insertOneTask(IdRoutine, task, weekDay, initTime, endTime, Description);

        return res.status(201).json({message: 'Tarea registrada con éxito', id: resultTask});
    } catch (error){
        console.log(error)
        return res.status(500).json(error);
    }
};

/*
{
      "IdRoutine": 5,
      "task": "Estudiar francés",
      "weekDay": "Lunes",
      "initTime": "09:00",
      "endTime": "10:00",
      "Description": "Repaso de gramática"
}
*/


module.exports = {seeRoutines, generateRoutines, generateTask, getTaskById, updateTask, dropTask};