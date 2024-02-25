import express from "express";
import {
    seedChampions,
    getChampions,
    getChampion,
    createChampion,
    updateChampion,
    deleteChampion,
} from "../controllers/ChampionController.js";

const router = express.Router();

router.get("/seed", async (req, res) => {
    await seedChampions();
    res.send("Champions have been seeded successfully!");
});

router.get("/", getChampions);
router.get("/:id", getChampion);
router.post("/", createChampion);
router.put("/:id", updateChampion);
router.delete("/:id", deleteChampion);

export default router;
