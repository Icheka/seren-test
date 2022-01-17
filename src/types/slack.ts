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

export type SlackSelectActionPayloadType = {
    type: string;
    action_id: string;
    block_id: string;
    selected_option: {
        text: {
            type: string;
            text: string;
            emoji: boolean;
        };
        value: string;
    };
    placeholder: {
        type: string;
        text: string;
        emoji: boolean;
    };
    action_ts: string;
};
