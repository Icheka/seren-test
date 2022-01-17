import { Select, SectionBlock, DividerBlock, ActionsBlock } from "@slack/bolt";

export const HOW_ARE_YOU_DOING_BLOCKS: Array<Select | SectionBlock | DividerBlock | ActionsBlock> = [
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
        type: "actions",
        elements: [
            {
                type: "static_select",
                action_id: "select-how-are-you-doing",
                placeholder: {
                    type: "plain_text",
                    emoji: true,
                    text: "Select from list",
                },
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
        ],
    },
];
