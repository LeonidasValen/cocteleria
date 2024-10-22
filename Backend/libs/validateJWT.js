import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

export const validateToken = (req, res, next)=>{
    //verifica  si tiene el token
    const {token} = req.cookies
    if(!token) return res.status(401).json({message: "no estas autenticado"})

    //verifica el token y trae los datos del usuario
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken)=>{
        if(err) return res.status(403).json({message: "Token invalido"});
        
        req.user = decodedToken.id; // Guarda todo el decodedToken en req.user
        next()
    })
}