export type SlackBotCommandOption = {
    text: string;
    description: string;
    hasArgs: boolean;
};

export const SlackBotCommandOptions: Array<SlackBotCommandOption> = [
    {
        text: "hello",
        description: "Say hello to this bot",
        hasArgs: false,
    },
    {
        text: "help",
        description: "Shows a list of available commands for this bot",
        hasArgs: false,
    },
];
