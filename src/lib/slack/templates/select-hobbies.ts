import { MultiStaticSelect, SectionBlock, DividerBlock, ActionsBlock, InputBlock } from "@slack/bolt";

export const SELECT_HOBBIES: Array<MultiStaticSelect | SectionBlock | DividerBlock | ActionsBlock | InputBlock> = [
    {
        type: "section",
        text: {
            type: "mrkdwn",
            text: ":triangular_flag_on_post: *What are your favorite hobbies?*",
        },
    },
    {
        type: "divider",
    },
    {
        type: "input",
        label: {
            type: "plain_text",
            text: "Select hobbies...",
        },
        element: {
            type: "multi_static_select",
            action_id: "select-hobbies",
            placeholder: {
                type: "plain_text",
                emoji: true,
                text: "Choose all that apply",
            },
            options: [
                {
                    text: {
                        type: "plain_text",
                        text: ":soccer: Football",
                        emoji: true,
                    },
                    value: "football",
                },
                {
                    text: {
                        type: "plain_text",
                        text: ":musical_note: Music",
                        emoji: true,
                    },
                    value: "music",
                },
                {
                    text: {
                        type: "plain_text",
                        text: ":sleeping: Sleep",
                        emoji: true,
                    },
                    value: "sleep",
                },
                {
                    text: {
                        type: "plain_text",
                        text: ":tv: Movies",
                        emoji: true,
                    },
                    value: "movies",
                },
                {
                    text: {
                        type: "plain_text",
                        text: ":basketball: Basketball",
                        emoji: true,
                    },
                    value: "basketball",
                },
            ],
        },
    },
];
