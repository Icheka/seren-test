import { App } from "@slack/bolt";
import Slack from "./lib/slack";
import Log from "./lib/log";
import _error from "./helpers/_error";
import dotenv from "dotenv";
import path from "path";
import dbConnect from "./helpers/dbConnect";
import { SlackBotCommandOption } from "./types/slack";

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
    // command.text holds the text argument passed to the slash-command;
    const { text } = command;
    try {
        // acknowledge receipt of this command
        await ack();

        // parse command text and respond with the appropriate operation
        const option: SlackBotCommandOption = Slack.parseBotCommand(text);
        switch (option.text) {
            case "":
                break;
            case "hello":
                await Slack.sayWelcome(say);
                await Slack.respondWithHowAreYouFeelingOptions(say);
                break;
        }
    } catch (e) {
        Log.log(`Slack /bot command error ::`, e);
    }
});

client.action("select-how-are-you-doing", async ({ ack, action, body, payload, say }) => {
    // acknowledge
    await ack();
    console.log("how are you doing received!");

    console.log(payload);
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
