import { SayFn } from "@slack/bolt";

class Slack {
    /**
     * responds to a user with a greeting
     * @param say a Slack-Bolt SayFn callback
     */
    public static async sayWelcome(say: SayFn) {
        say(`Welcome. How are you doing?`);
    }
}

export default Slack;
