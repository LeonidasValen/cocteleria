import mongoose from "mongoose"

export const validateId = (req, res, next)=>{
    const hotelId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(hotelId)) return res.status(400).json({ message: "El id proporcionado no es valido" });

    next()
}