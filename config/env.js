import dotenv from "dotenv";

dotenv.config();

const { PORT, MONGOOSE_URL, SECRET_ACCESS_TOKEN} = process.env;

export { PORT, MONGOOSE_URL, SECRET_ACCESS_TOKEN};
