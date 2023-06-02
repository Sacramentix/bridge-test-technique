import { config } from "dotenv";
import z, { ZodError } from "zod";
config();

const api_key = process.env['API_KEY'];
const endpoint = process.env['API_ENDPOINT'];

const envSchema = z.object({
    API_KEY: z.string().uuid("must be an uuid"),
    API_ENDPOINT: z.string().url("must be an url")
}).catchall(z.string());

export const env = 
(() => {
    try {
        return envSchema.parse(process.env);
    } catch(error) {
        const e:ZodError = error;
        console.error(
            "Env config is incorrect: \n",
            e.errors.map(v=>` - ${v.path[0]} field ${v.message}`).join("\n"),
            "\nMake sure to fill the env with all the required fields."
        );
        process.exit(1);
    }
})();
