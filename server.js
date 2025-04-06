const express = require("express");
const cors = require("cors");
const gameProgressRoutes = require("./routes/gameProgressRoutes"); // Ajusta el path si es diferente

const app = express();

app.use(cors());
app.use(express.json());

// Aquí montas las rutas
app.use("/api/progress", gameProgressRoutes);

// Arranque del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
