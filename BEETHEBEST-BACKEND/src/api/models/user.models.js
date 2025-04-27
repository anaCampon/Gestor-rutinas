const pool = require('../../utils/conexion_db');

const addUser = async (idUsers, username, email, password) => {
    const insert = (`INSERT INTO users (idUsers, username, email, password) VALUES (?,?,?,?)`);
    const [result] = await pool.query(insert, [idUsers, username, email, password]);
    return result.insertId;
};

const selectByUsername = async (username) => {
    const select = (`SELECT * FROM users WHERE username = ?`);
    const [result] = await pool.query(select, [username]);
    if (result.length === 0) {
        return false;
    }
    return result[0];
};


module.exports = {selectByUsername, addUser};
