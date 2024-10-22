import app from "./app.js";



app.listen(3000, () => {
  console.log("Server corriendo en: http://localhost:3000");
});

app.get("/", (req, res) => {
  res.json("¡Bienvenido al backend!");
});