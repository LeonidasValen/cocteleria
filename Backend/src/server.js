import app from "./app.js";
import authRouter from "../routes/auth.routes.js";
import userRouter from "../routes/user.routes.js";
import { connectDB } from "../db/db.js";

connectDB()

app.use('/auth', authRouter)
app.use('/user', userRouter)

app.listen(3000, () => {
  console.log("Server corriendo en: http://localhost:3000");
});

app.get("/", (req, res) => {
  res.json("¡Bienvenido al backend!");
});