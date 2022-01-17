import { SectionBlock } from "@slack/bolt";

export const WELCOME: Array<SectionBlock> = [
    {
        type: `section`,
        text: {
            type: "mrkdwn",
            text: "*Welcome. How are you doing?",
        },
    },
];
