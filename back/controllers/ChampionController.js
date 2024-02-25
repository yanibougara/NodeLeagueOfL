import { PrismaClient } from "@prisma/client";
import fs from "fs";

const prisma = new PrismaClient();

const seedChampions = async () => {
    try {
        const championsData = fs.readFileSync("../champions.json");
        const champions = JSON.parse(championsData);

        for (const champion of champions) {
            await prisma.champion.create({
                data: {
                    name: champion.name,
                    type: champion.type,
                },
            });
        }

        console.log("Champions seeded successfully.");
    } catch (error) {
        console.error("Error seeding champions:", error);
    }
};

const getChampions = (req, res) => {
    prisma.champion
        .findMany()
        .then((champions) => {
            res.json(champions);
        })
        .catch((error) => {
            res.json(error);
        });
};

const getChampion = (req, res) => {
    let id = parseInt(req.params.id);

    prisma.champion
        .findUnique({
            where: {
                id: id,
            },
        })
        .then((champion) => {
            res.json(champion);
        })
        .catch((error) => {
            res.json(error);
        });
};

const createChampion = (req, res) => {
    let champion = req.body;

    prisma.champion
        .create({
            data: {
                name: champion.name,
                type: champion.type,
            },
        })
        .then((champion) => {
            res.json(champion);
        })
        .catch((error) => {
            res.json(error);
        });
};

const updateChampion = (req, res) => {
    let id = Number(req.params.id);
    let champion = req.body;

    prisma.champion
        .update({
            where: {
                id: id,
            },
            data: {
                name: champion.name,
                type: champion.type,
            },
        })

        .then((champion) => {
            res.json(champion);
        })
        .catch((error) => {
            res.json(error);
        });
};

const deleteChampion = (req, res) => {
    let id = Number(req.params.id);
    prisma.champion
        .delete({
            where: {
                id: id,
            },
        })
        .then((champion) => {
            res.json(champion);
        })
        .catch((error) => {
            res.json(error);
        });
};

export {
    getChampions,
    getChampion,
    createChampion,
    updateChampion,
    deleteChampion,
    seedChampions,
};
