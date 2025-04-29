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

        //Mejoro la visualización de los resultados
        const routinesMap = {};

        result.forEach(row => {
            if (!routinesMap[row.Routine_id]){
                routinesMap[row.Routine_id] = {
                    id: row.Routine_id,
                    nombre: row.name,
                    semana: row.week,
                    tareas: []
                };
            }
            if (row.id_tasks) {
                routinesMap[row.Routine_id].tareas.push({
                    id: row.id_tasks,
                    dia: row.weekDay,
                    horaInicio: row.initTime,
                    horaFin: row.endTime,
                    Descripcion: row.Description
                });
              }
        } )

        return res.status(200).json({ data: routinesMap});
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
        console.log('Rutina creada con ID:', result)
        //Creo las tareas asociadas
        if (tareas.length > 0) {
            await routineModel.insertTask(result);
        }
        return res.status(201).json({message: 'Rutina registrada con éxito', id: result});
    } catch (error){
        console.log(error)
        return res.status(500).json(error);
    }
};

/*  
{"Users_id": 5,
"name": "Mates",
"week": "2025-04-07",
"tareas":[
  {
    "task": "reading",
    "weekDay":"martes",
    "initTime": "12:00:00",
    "endTime": "14:00:00",
    "Description": "leer tema 6",
    "Routine_id": 3
  }]
}

     */


module.exports = {seeRoutines, generateRoutines};