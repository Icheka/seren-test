import { Select, SectionBlock, DividerBlock } from "@slack/bolt";

export const HOW_ARE_YOU_DOING_BLOCKS: Array<Select | SectionBlock | DividerBlock> = [
    {
        type: "section",
        text: {
            type: "mrkdwn",
            text: ":thought_balloon: *I am...*",
        },
    },
    {
        type: "divider",
    },
    {
        type: "section",
        text: {
            type: "plain_text",
            text: " Select from list...",
        },
        accessory: {
            type: "static_select",
            placeholder: {
                type: "plain_text",
                emoji: true,
                text: "Select from list",
            },
            focus_on_load: true,
            options: [
                {
                    text: {
                        type: "plain_text",
                        text: ":grin: Doing Well",
                        emoji: true,
                    },
                    value: "doing-well",
                },
                {
                    text: {
                        type: "plain_text",
                        text: ":unamused: Neutral",
                        emoji: true,
                    },
                    value: "neutral",
                },
                {
                    text: {
                        type: "plain_text",
                        text: ":heart_eyes: Feeling Lucky",
                        emoji: true,
                    },
                    value: "feeling-lucky",
                },
            ],
        },
    },
];
