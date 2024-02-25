import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./router.js";
import { seedChampions } from "./seed.js"; 

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);


app.post("/seed-champions", async (req, res) => {
    try {
        await seedChampions();
        res.sendStatus(200);
    } catch (error) {
        console.error("Error seeding champions:", error);
        res.sendStatus(500);
    }
});

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
