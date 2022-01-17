

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

export type SlackMultiSelectActionPayloadType = {
    type: string;
    action_id: string;
    block_id: string;
    selected_options: [{ text: Record<string, any>; value: string }];
    placeholder: {
        type: string;
        text: string;
        emoji: boolean;
    };
    action_ts: string;
};
