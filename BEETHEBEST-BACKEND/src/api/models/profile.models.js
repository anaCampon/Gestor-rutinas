const pool = require('../../utils/conexion_db');


const seeProfile = async (usernameSelected) => {
    console.log(usernameSelected)
    const select = (`SELECT * FROM users WHERE username = ?`);
    const [result] = await pool.query(select, [usernameSelected]);
    if (result.length === 0) {
        return false;
    }
    return result[0];
};

const updateInterests = async (idUsers, interests, weekly_goals, weekly_availability) => {
    const update = (`UPDATE users SET interests = ?, weekly_goals= ?, weekly_availability= ? WHERE idUsers = ?`);
    const [result] = await pool.query(update, [interests, weekly_goals, weekly_availability, idUsers]);
    return result;
};

module.exports = {seeProfile, updateInterests};
