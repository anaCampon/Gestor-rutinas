const profileModel = require('../models/profile.models');


const profileForm = async (req, res) => {
    try{
        //Para obtener el id del usuario y poder cargar los datos en este id
        const userResult = await profileModel.seeProfile(req.user.username);
        if(userResult.length === 0) {
            return res.status(404).json({message: 'No se han encontrado el usuario'});
         }
        const userData = {
            id:userResult.idUsers, username:userResult.username
        }
        console.log('Id de usuario:', userData.id)
        const data = req.body;
        console.log('Datos del JSON:', data)
        //El primer dato es el id para modificar solo ese dato
        const result = await profileModel.updateInterests(userData.id, data.interests, data.weekly_goals, data.weekly_availability);
        return res.status(201).json({message: 'Registrado con éxito', id: result});
    } catch (error){
        console.log(error)
        return res.status(500).json(error);
    }
};

const profile = async (req, res) => {
    try{
        if (req.user){
            const result = await profileModel.seeProfile(req.user.username);
            if(result.length === 0) {
                return res.status(404).json({message: 'No se han encontrado datos'});
            }
            //Para que no se imprima la contraseña
            const userData = {
                id:result.idusers, username:result.username, interests:result.interests, weekly_goals:result.weekly_goals, weekly_availability:result.weekly_availability
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

module.exports = { profileForm, profile};