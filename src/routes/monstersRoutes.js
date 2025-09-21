import express from "express";
import { updateMonster, getAllMonsters, getMonsterByld, createMonster, deleteMonster } from "../controllers/monstersController.js";

const router = express.Router();
router.get("/", getAllMonsters);
router.get("/:id", getMonsterByld);
router.post("/", createMonster);
router.delete("/:id", deleteMonster);
router.put("/:id", updateMonster);

export default router;


//Rotas de monstros
//Todos os monstros:
//GET http://localhost:3000/monsters
//Buscar tipo vampiros:
//GET http://localhost:3000/monsters?tipo=Vampiro
//Nome contendo “Draculaura”:
//GET http://localhost:3000/monsters?nome=draculaura
//Idade exata 1600:
//GET http://localhost:3000/monsters?idade=1600
//Combinando filtros:
//GET http://localhost:3000/monsters?tipo=Vampiro&cor=rosa