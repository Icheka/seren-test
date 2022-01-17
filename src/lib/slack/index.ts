import { SayFn, SectionBlock } from "@slack/bolt";
import User from "../../models/User";
import { UserType } from "../../types/user";
import { SlackBotCommandOption, SlackBotCommandOptions } from "./templates/glossary";
import { HOW_ARE_YOU_DOING_BLOCKS } from "./templates/how-are-you-doing";
import { SELECT_HOBBIES } from "./templates/select-hobbies";
import { WELCOME } from "./templates/welcome";

class Slack {
    public static async saveUserIfNew(user: UserType) {
        return await User.registerUser(user);
    }

    /**
     * light-weight parser for parsing slash-commands
     * @param text a parsable string from which to get slash-command arguments
     * @returns {SlackBotCommandOption}
     */
    public static parseBotCommand(text: string): SlackBotCommandOption {
        const args = text.split("|").map((arg) => arg.trim());
        const option = SlackBotCommandOptions.find((opt) => opt.text === args[0]);
        if (option === undefined) {
            // i.e if "/bot" is sent without an argument, return glossary of commands
            return SlackBotCommandOptions.find((opt) => opt.text.trim() === "help")!;
        }
        return option;
    }

    /**
     * responds to a user with a greeting
     * @param say a Slack-Bolt SayFn callback
     * @returns {Promise<void>}
     */
    public static async sayWelcome(say: SayFn) {
        say({ blocks: WELCOME });
    }

    /**
     * returns the HOW-ARE-YOU-FEELING static-select block to the client
     * @param say a SayFn callback
     * @returns {Promise<void>}
     */
    public static async respondWithHowAreYouFeelingOptions(say: SayFn) {
        const blocks = HOW_ARE_YOU_DOING_BLOCKS;
        const response = { text: `I am feeling...`, blocks };
        say(response);
    }

    /**
     * returns the WHAT-ARE-YOUR-HOBBIES multi-static-select block to the client
     * @param say a SayFn callback
     * @returns {Promise<void>}
     */
    public static async respondWithWhatAreYourHobbies(say: SayFn) {
        const blocks = SELECT_HOBBIES;
        const response = { text: `What are your hobbies?`, blocks };
        say(response);
    }

    /**
     * simply returns mkd.b`Thank you!` to the client
     * @param say a SayFn callback
     * @returns {Promise<void>}
     */
    public static async sayThankYou(say: SayFn) {
        say(`*Thank you!*`);
    }

    /**
     * generates and returns a glossary of available commands and APIs
     * @returns {Array<SectionBlock>}
     */
    public static buildGlossary() {
        const commands: Array<SectionBlock> = SlackBotCommandOptions.map((command) => ({
            type: "section",
            text: {
                type: "mrkdwn",
                text: `*/bot ${command.text}*`,
            },
            fields: [
                {
                    type: "plain_text",
                    text: `-${command.description}-`,
                },
            ],
        }));
        const header: SectionBlock = {
            type: "section",
            text: {
                type: "mrkdwn",
                text: "*Available commands*",
            },
            fields: [
                {
                    type: "mrkdwn",
                    text: "*Usage: /bot [command] | [command arguments, if any]*",
                },
            ],
        };
        const block = [header, ...commands];
        return block;
    }
}

export default Slack;
