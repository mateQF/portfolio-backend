import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { errorHandler } from './middlewares/errorHandler.js';
import projectRouter from "./routes/project.routes.js"

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(errorHandler);
app.use("/api/projects", projectRouter)

app.get('/', (_req, res) => {
    res.send('<h1>MATEO</h1>')
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

export default app
