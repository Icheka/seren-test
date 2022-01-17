export type SlackBotCommandOption = {
    text: string;
    description: string;
    hasArgs: boolean;
};

export const SlackBotCommandOptions: Array<SlackBotCommandOption> = [
    {
        text: "",
        description: "Responds to the user with a glossary of available commands.",
        hasArgs: false,
    },
    {
        text: "hello",
        description: "Responds to the user with a greeting.",
        hasArgs: false,
    },
];
