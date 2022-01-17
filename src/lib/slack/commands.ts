import Slack from ".";
import client from "../../slack";
import Log from "../log";

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
