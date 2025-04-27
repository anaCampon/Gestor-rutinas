/*
const pool = require('../../utils/conexion_db');

const selectAll = async () => {
    const [result] = await pool.query(`SELECT * FROM evento`);
    if (result.length === 0) {
        return false;
    }
    return result;
};

const selectByName = async (nombre) => {
    const sqlSelect = (`SELECT * FROM evento WHERE nombre = ?`);
    const [result] = await pool.query(sqlSelect, [nombre]);
    return result;
};

const selectById = async (id) => {
    const sqlSelect = (`SELECT * FROM evento WHERE idevento = ?`);
    const [result] = await pool.query(sqlSelect, [id]);
    return result;
};

const insertEvent = async({ nombre, descripcion, fecha, ubicacion, deporte }) => {
    const sqlInsert = `INSERT INTO evento (nombre, descripcion, fecha, ubicacion, deporte) VALUES (?,?,?,?,?)`;
    const [result] = await pool.query(sqlInsert,[nombre, descripcion, fecha, ubicacion, deporte]);
    if (result.affectedRows === 0) {
        return false;
    }
    return result.insertId;
};

const modifyEvent = async({idevento, nombre, descripcion, fecha, ubicacion, deporte, organizador_id}) => {
    //Para actualizar datos independientemente de los valores que se introduzcan en el body
    try{
        let values = [];
        let valuesUpdated =[];
        if (nombre){
            values.push(nombre);
            valuesUpdated.push('nombre = ?');
        }
        if (descripcion){
            values.push(descripcion);
            valuesUpdated.push('descripcion = ?');
        }
        if (fecha){
            values.push(fecha);
            valuesUpdated.push('fecha = ?');
        }
        if (ubicacion){
            values.push(ubicacion);
            valuesUpdated.push('ubicacion = ?');
        }
        if (deporte){
            values.push(deporte);
            valuesUpdated.push('deporte = ?');
        }
        if (organizador_id){
            values.push(organizador_id);
            valuesUpdated.push('organizador_id = ?');
        }
        values.push(idevento);
        console.log(values);
        console.log(valuesUpdated);
        const sqlUpdate = `UPDATE evento SET ${valuesUpdated.join(", ")} WHERE idevento = ? `
        //const sqlUpdate = `UPDATE evento SET nombre = ?, descripcion = ?, fecha = ?, ubicacion = ?, deporte = ? WHERE idevento = ?`;
        const [result] = await pool.query(sqlUpdate, values);
        if (result.affectedRows === 0) {
            return false; // No se encontró el evento
        }
        return true; //Se ha actualizado
    } catch (error){
        return res.status(500).json({ message: "Error en la consulta SQL", error });
    }
};

const deleteEvent = async (id) => {
    const sqlDelete = (`DELETE FROM evento WHERE idevento = ?`);
    const [result] = await pool.query(sqlDelete, [id]);
    if (result.affectedRows === 0) {
        return false; // No se ha eliminado
    }
    return true; //Se ha eliminado
};

const selectAllByDate = async () => {
    const [result] = await pool.query(`SELECT * FROM evento ORDER BY fecha DESC`);
    if (result.length === 0) {
        return false;
    }
    return result;
};

const selectBySport = async (type) => {
    const sqlSelect = (`SELECT * FROM evento WHERE deporte LIKE ?`);
    const [result] = await pool.query(sqlSelect, [`%${type}%`]);
    return result;
};

const selectByDate = async ({from, to}) => {
    const sqlSelect = (`SELECT * FROM evento WHERE fecha BETWEEN ? AND ?`);
    const [result] = await pool.query(sqlSelect, [from,to]);
    if (result.length === 0) {
        return false;
    }
    return result;
};

module.exports = {selectAll, selectById, insertEvent, selectByName, modifyEvent, deleteEvent, selectAllByDate, selectBySport, selectByDate} */