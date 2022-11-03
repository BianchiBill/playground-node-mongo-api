/* eslint no-process-env: 0 */
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '.env') });

const environment = ['MONGOCONNECT, DBUSER, DBPASSWORD'];

environment.forEach((name) => {
    /* istanbul ignore if */
    if (!process.env[name]) {
        throw new Error(`${name}: ${process.env[name]}`);
    }
});

const config = {
    MONGOCONNECT: process.env.MONGOCONNECT,
    DBUSER: process.env.DBUSER,
    DBPASSWORD: process.env.DBPASSWORD,
};

export default config;
