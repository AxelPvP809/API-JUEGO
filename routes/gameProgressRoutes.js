const express = require("express");
const pool = require("../db");

const router = express.Router();

// Crear progreso de juego (C)
router.post("/", async (req, res) => {
  const { player_id, score, lives, time, levels } = req.body;
  try {
    const [result] = await pool.execute(
      "INSERT INTO game_progress (player_id, score, lives, time, levels) VALUES (?, ?, ?, ?, ?)",
      [player_id, score, lives, time, levels]
    );
    res.json({ id: result.insertId, message: "Progreso creado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener progreso de todos los jugadores (R)
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.execute("SELECT * FROM game_progress");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar progreso de un jugador (U)
router.put("/:player_id", async (req, res) => {
  const { id } = req.params;
  const { score, lives, time, levels } = req.body;
  try {
    await pool.execute(
      "UPDATE game_progress SET score=?, lives=?, time=?, levels=?, last_update=NOW() WHERE player_id=?",
      [score, lives, time, levels, id]
    );
    res.json({ message: "Progreso actualizado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar progreso de un jugador (D)
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.execute("DELETE FROM game_progress WHERE id=?", [id]);
    res.json({ message: "Progreso eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener el progreso de un jugador específico por su player_id
router.get("/:player_id", async (req, res) => {
  const { player_id } = req.params;
  try {
    const [rows] = await pool.execute("SELECT * FROM game_progress WHERE player_id = ?", [player_id]);
    if (rows.length > 0) {
      res.json(rows[0]); // Devuelve el primer resultado encontrado
    } else {
      res.status(404).json({ message: "No se encontró progreso para este jugador" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
