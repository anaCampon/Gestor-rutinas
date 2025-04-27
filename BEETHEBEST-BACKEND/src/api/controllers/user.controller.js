const userModel = require('../models/user.models');
const bcrypt = require('bcrypt');
const {createToken} = require ('../../utils/jwt');

const register = async (req, res) => {
    try{
        const data = req.body;
        console.log(data)
        const selectedUsername = await userModel.selectByUsername(data.username);
        if (selectedUsername) {
            return res.status(400).json({message: 'No se ha registrado'});
        }
        data.password = bcrypt.hashSync( data.password,10)
        const result = await userModel.addUser(data.idUsers, data.username, data.email, data.password);
        return res.status(201).json({message: 'Registrado con éxito', id: result});
    } catch (error){
        console.log(error)
        return res.status(500).json(error);
    }
};


const login = async (req, res) => {
    try{
        const data = req.body;
        const selectedUser = await userModel.selectByUsername(data.username);
        if (!selectedUser) {
            return res.status(400).json({message: 'El usuario no existe'});
        }
        const isSame = bcrypt.compareSync(data.password, selectedUser.password);
        if (!isSame){
            return res.status(400).json({message: 'Contraseña incorrecta'});
        }
        //Crear el token
        const token = createToken(selectedUser);
        return res.status(200).json({token: token});
    } catch (error){
        console.log(error)
        return res.status(500).json(error);
    }
};

const profile = async (req, res) => {
    try{
        if (req.user){
            const result = await userModel.seeProfile(req.user.username);
            if(result.length === 0) {
                return res.status(404).json({message: 'No se han encontrado datos'});
            }
            //Para que no se imprima la contraseña
            const userData = {
                id:result.idusers, username:result.username
            }
            return res.status(200).json({data: userData});
        }else{
            return res.status(400).json({message: 'Debe enviar el nombre'});
        }
    } catch (error){
        console.log(error)
        return res.status(500).json(error);
    }
};

module.exports = { login, register, profile };


/* Probar en THUNDERCLIENT POST
{
  "idUsers": 1,
  "username": "maria_garcia",
  "email": "maria.garcia@example.com",
  "password": "securePassword123",
  "interests": ["programación", "idiomas", "fitness"],
  "weekly_goals": {
    "programación": "5 horas",
    "idiomas": "3 horas",
    "fitness": "2 horas"
  },
  "weekly_availability": {
    "lunes": ["18:00", "20:00"],
    "miércoles": ["19:00", "21:00"],
    "sábado": ["10:00", "12:00"]
  }
} 
  


{
  "username": "juaia",
  "email": "juaia@example.com",
  "password": "hashedPassword456"
}*/