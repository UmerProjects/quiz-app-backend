import express from "express";
import cors from "cors"
import Router from "./routes/index.js";
import { PORT, MONGOOSE_URL } from "./config/env.js";
import mongoose from "mongoose";


const server = express();

server.use(cors());
server.use(express.json())

Router(server),


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(MONGOOSE_URL);
}

server.listen(PORT, (req, res) => {
    console.log(`Server running on http://localhost:${PORT}`)
})