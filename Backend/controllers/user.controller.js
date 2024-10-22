import Users from "../models/User.js";

export const getUser = async(req, res) =>{
    try {
        const userFound = await Users.findById(req.user);

        if(!userFound) return res.status(400).json({message: "Usuario no encontrado"})

        res.status(201).json({
            id: userFound.id,
            username: userFound.username,
            email: userFound.email,
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Error interno del servidor"})
    }
}