const pool = require('../../utils/conexion_db');

//Obtener usuario al autenticarse

const seeProfile = async (username) => {
    const select = (`SELECT * FROM users WHERE username = ?`);
    const [result] = await pool.query(select, [username]);
    if (result.length === 0) {
        return false;
    }
    return result[0];
};

//Ver rutinas

const selectRoutines = async (id) => {
    const sqlSelect = (`SELECT * FROM routine LEFT JOIN tasks ON Routine_id WHERE Users_id = ? ORDER BY FIELD(weekDay, 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'), initTime;`);
    const [result] = await pool.query(sqlSelect, [id]);
    return result;
};

//Crear rutina en BBDD

const insertRoutine = async (name, week, Users_id) => {
    const insert = (`INSERT INTO routine (name, week, Users_id) VALUES(?,?,?)`);
    const [result] = await pool.query(insert, [name, week, Users_id]);
    return result;
};

//Crear tareas en BBDD asociadas a una rutina

const insertTask = async (IdRoutine, tareas) => {
    const insert = (`INSERT INTO tasks (task, weekDay, initTime, endTime, Description, Routine_id) VALUES(?,?,?,?,?,?)`);
    const [result] = await pool.query(insert, [task, weekDay, initTime, endTime, Description, Routine_id]);
    return result;
}

module.exports = {seeProfile, selectRoutines, insertRoutine, insertTask};