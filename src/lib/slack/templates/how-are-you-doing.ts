export const HOW_ARE_YOU_DOING_BLOCKS = [
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
        type: "static_select",
        placeholder: {
            type: "plain_text",
            emoji: true,
            text: "Select from list",
        },
        options: [
            {
                text: {
                    type: "mrkdwn",
                    text: ":grin: Doing Well",
                    emoji: true,
                },
                value: "doing-well",
            },
            {
                text: {
                    type: "mrkdwn",
                    text: ":unamused: Neutral",
                    emoji: true,
                },
                value: "neutral",
            },
            {
                text: {
                    type: "mrkdwn",
                    text: ":heart_eyes: Feeling Lucky",
                    emoji: true,
                },
                value: "feeling-lucky",
            },
        ],
    },
];
