const jwt = require ('jsonwebtoken');
const userModel = require('../models/user.models');


const checkToken = async (req, res, next) => {
    try {
        if (!req.headers['authorization']) {
            return res.status(401).json({
                message: 'Es necesario incluir el token'
            });
        };
        const tokenString = req.headers['authorization'];
        const token = tokenString.split(" ")[1];
        let data;
        try {
            data = jwt.verify(token, process.env.PASS_JWT);
        } catch {
            return res.status(403).json({
                message: 'El token es incorrecto'
            });
        }
        const user = await userModel.selectByUsername(data.username);
        if(!user){
            return res.status(403).json({
                message: 'El usuario no existe'
            });
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.json(error);
    };
};


module.exports = { checkToken};