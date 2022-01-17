import { SayFn } from "@slack/bolt";
import { SlackBotCommandOption, SlackBotCommandOptions } from "../../types/slack";
import { HOW_ARE_YOU_DOING_BLOCKS } from "./templates/how-are-you-doing";
import { SELECT_HOBBIES } from "./templates/select-hobbies";
import { WELCOME } from "./templates/welcome";

class Slack {
    public static parseBotCommand(text: string): SlackBotCommandOption {
        const args = text.split("|").map((arg) => arg.trim());
        const option = SlackBotCommandOptions.find((opt) => opt.text === args[0]);
        if (option === undefined) {
            // i.e if "/bot" is sent without an argument, return glossary of commands
            return SlackBotCommandOptions.find((opt) => opt.text.trim() === "")!;
        }
        return option;
    }

    /**
     * responds to a user with a greeting
     * @param say a Slack-Bolt SayFn callback
     */
    public static async sayWelcome(say: SayFn) {
        say({ blocks: WELCOME });
    }

    public static async respondWithHowAreYouFeelingOptions(say: SayFn) {
        const blocks = HOW_ARE_YOU_DOING_BLOCKS;
        const response = { text: `I am feeling...`, blocks };
        say(response);
    }

    public static async respondWithWhatAreYourHobbies(say: SayFn) {
        const blocks = SELECT_HOBBIES;
        const response = { text: `What are your hobbies?`, blocks };
        say(response);
    }
}

export default Slack;
