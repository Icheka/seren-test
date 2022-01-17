import { App } from "@slack/bolt";
import Slack from "./lib/slack";
import Log from "./lib/log";
import _error from "./helpers/_error";
import dotenv from "dotenv";
import path from "path";
import dbConnect from "./helpers/dbConnect";

// load env variables in non-PRODUCTION environments
const ENV_FILE = process.argv.length > 2 ? process.argv[2] : undefined;
_error.guard();
ENV_FILE && dotenv.config({ path: path.join(process.cwd(), ENV_FILE) });
dbConnect.connect();

const client = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
});

// COMMAND: /bot
client.command("/bot", async ({ ack, say, command }) => {
    console.log("got /bot", command.command);
    try {
        // acknowledge receipt of this command
        await ack();
        Slack.sayWelcome(say);
    } catch (e) {
        Log.log(`Slack /bot command error ::`, e);
    }
});

// client.use((args) => {
//     console.log(args);
//     args.next();
//     return Promise.resolve();
// });

(async () => {
    if (process.env.PORT === undefined) throw `Application PORT must be defined!`;
    const port = process.env.PORT!;
    await client.start(parseInt(port));
    console.log(`⚡️ Slack bot is listening on port ${port}`);
})();

export default client;
