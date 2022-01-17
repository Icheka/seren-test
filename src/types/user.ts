export enum Moods {
    neutral = "neutral",
    doingWell = "doing-well",
    feelingLucky = "feeling-lucky",
}

export enum Hobbies {
    football = "football",
    basketball = "basketball",
    music = "music",
    movies = "movies",
    sleep = "sleep",
}

export type UserType = {
    slackUserId: string;
    slackUserName: string;
    hobbies: Array<Hobbies>;
    mood: Moods;
};
