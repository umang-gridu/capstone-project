import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const staticFileUri = dirname(__filename);

export { staticFileUri };
