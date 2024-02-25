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

export { seedChampions };
