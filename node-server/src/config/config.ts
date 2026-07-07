import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;
const EVOLUTION_API = process.env.EVOLUTION_API;
const EVOLUTION_INSTANCE = process.env.EVOLUTION_INSTANCE;
const EVOLUTION_API_KEY = process.env.EVOLUTION_API_KEY;

export { PORT, EVOLUTION_API, EVOLUTION_API_KEY, EVOLUTION_INSTANCE };
