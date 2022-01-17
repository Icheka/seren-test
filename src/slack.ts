import { App } from "@slack/bolt";
import Slack from "./lib/slack";
import Log from "./lib/log";
import _error from "./helpers/_error";
import dotenv from "dotenv";
import path from "path";
import dbConnect from "./helpers/dbConnect";
import { SlackMultiSelectActionPayloadType, SlackSelectActionPayloadType } from "./types/slack";
import { SlackBotCommandOption } from "./lib/slack/templates/glossary";
import User from "./models/User";
import { Hobbies, Moods } from "./types/user";

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
client.command("/bot", async ({ ack, say, command, body }) => {
    // command.text holds the text argument passed to the slash-command;
    const { text } = command;
    try {
        // acknowledge receipt of this command
        await ack();

        // parse command text and respond with the appropriate operation
        const option: SlackBotCommandOption = Slack.parseBotCommand(text);
        console.log(option.text);
        switch (option.text) {
            case "hello":
                await Slack.sayWelcome(say);
                await Slack.respondWithHowAreYouFeelingOptions(say);
                break;
            case "help":
                say({ blocks: Slack.buildGlossary() });
                break;
        }
    } catch (e) {
        Log.log(`Slack /bot command error ::`, e);
    }
});

client.action("select-how-are-you-doing", async ({ ack, body, payload, say }) => {
    // acknowledge
    await ack();
    console.log("how are you doing received!", (payload as any).user);
    const response: SlackSelectActionPayloadType = payload as any;
    console.log(response.selected_option.value, (body as any).user.username); // body.user.id

    await Slack.respondWithWhatAreYourHobbies(say);

    const userId = (body as any).user?.id as string;
    const userName = (body as any).user?.username as string;

    if (!userId || !userName) return;
    User.setMood({
        slackUserId: userId,
        slackUserName: userName,
        mood: response.selected_option.value as Moods,
    });
});

client.action("select-hobbies", async ({ ack, body, payload, say }) => {
    // acknowledge
    await ack();
    console.log("select hobbies received!");
    const response: SlackMultiSelectActionPayloadType = payload as any;
    console.log(response.selected_options, (body as any).user.username); // body.user.id

    Slack.sayThankYou(say);

    const userId = (body as any).user?.id as string;
    const userName = (body as any).user?.username as string;

    if (!userId || !userName) return;
    User.setHobbies({
        slackUserId: userId,
        slackUserName: userName,
        hobbies: response.selected_options.map((opt) => opt.value) as Array<Hobbies>,
    });
});

(async () => {
    if (process.env.PORT === undefined) throw `Application PORT must be defined!`;
    const port = process.env.PORT!;
    await client.start(parseInt(port));
    console.log(`⚡️ Slack bot is listening on port ${port}`);
})();

export default client;
