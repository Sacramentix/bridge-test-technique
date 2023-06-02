import { config } from "dotenv";
import z from "zod";
config();

const api_key = process.env['API_KEY'];
const endpoint = process.env['API_ENDPOINT'];



const envSchema = z.object({
    api_key: z.string(),
    endpoint: z.string().url()
});

export const env = envSchema.parse({
    api_key,
    endpoint
});