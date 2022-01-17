import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import requestIP from "request-ip";
import path from "path";
import Log from "./lib/log";
import dbConnect from "./helpers/dbConnect";
import _error from "./helpers/_error";
import dotenv from "dotenv";
import { API_ROUTE } from "./routes";

// application setup
//// for non-PRODUCTION environments...
const ENV_FILE = process.argv.length > 2 ? process.argv[2] : undefined;
_error.guard();
ENV_FILE && dotenv.config({ path: path.join(process.cwd(), ENV_FILE) });
const app = express();
dbConnect.connect();

// middleware
app.use(
    cors({
        origin: (origin, callback) => callback(null, true), // allow requests from anywhere for (dev purposes)
        credentials: true,
    })
);
app.use(requestIP.mw());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// routes
// APIS
app.use(`/api/v1`, API_ROUTE);
app.use(`/`, (req, res) => {
    res.send("You are here - Home");
});

// startup/exit
const port = process.env.PORT;
if (!port) throw `Application PORT must be defined!`;
const server = app.listen(port, () => Log.log(`Listening at port ${port}`));

export default server;
