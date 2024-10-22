import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const tokenSecret = process.env.JWT_SECRET;

export function createJWT(payload) {
    //new promise es una promesa async que devuelve resolve(puede ir bien), reject(puede ir mal)
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            tokenSecret,
            {
                expiresIn: "1d",
            },
            (err, token) => {
                if (err) reject(err)//reject(le fue mal) 
                resolve(token)//resolve(le fue bien)
            }
        );
    })
}