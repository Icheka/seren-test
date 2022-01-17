import { HydratedDocument } from "mongoose";
import { Moods, UserType, Hobbies } from "../../types/user";
import UserModel from "./mongoose";

/**
 * User class::encapsulates functionality associated with users
 * most return types use C-style return values, modified to allow returning multiple
 * return values:: the first element is an pos.int (0 for a successful operation, >0 for failures)
 */
class User {
    public static async registerUser({ userId, userName }: { userId: string; userName: string }) {
        const possibleUser = await User.getById(userId);

        if (possibleUser) return [1, `This user already exists.`];
        if (possibleUser === false) return [2, `An error occurred while attempting to save this user.`];

        const user = new UserModel({ slackUserId: userId, slackUserName: userName });
        user.save();
        return [0, `Successful.`];
    }

    public static async setMood({ userId, mood }: { userId: string; mood: Moods }) {
        const user: boolean | null | HydratedDocument<UserType> = await User.getById(userId);
        if (user === false) return [2, `An error occurred while attempting to retrieve this user.`];
        if (user === null) return [1, `This user does not exist.`];

        (user as any).mood = mood;
        (user as any).save();
        return [0, `Successful`];
    }

    public static async setHobbies({ userId, hobbies }: { userId: string; hobbies: Array<Hobbies> }) {
        const user: boolean | null | HydratedDocument<UserType> = await User.getById(userId);
        if (user === false) return [2, `An error occurred while attempting to retrieve this user.`];
        if (user === null) return [1, `This user does not exist.`];

        (user as any).hobbies = hobbies;
        (user as any).save();
        return [0, `Successful`];
    }

    public static async getAllHobbies() {
        const users = await UserModel.find({ hobbies: { $ne: null } })
            .select({ mood: 0 })
            .then((data) => data)
            .catch((err) => false);
        if (users === false) return [1, `An error occurred while attempting to retrieve hobbies.`];
        return [0, users];
    }

    public static async getAllMoods() {
        const users = await UserModel.find({ mood: { $ne: null } })
            .select({ hobbies: 0 })
            .then((data) => data)
            .catch((err) => false);
        if (users === false) return [1, `An error occurred while attempting to retrieve moods.`];
        return [0, users];
    }

    public static async getUsers() {
        const users = await UserModel.find()
            .then((data) => data)
            .catch((err) => false);
        if (users === false) return [1, `An error occurred while attempting to retrieve users.`];
        return [0, users];
    }

    // private methods
    private static async getById(id: string) {
        return await UserModel.findOne({ slackUserId: id })
            .then((data) => data)
            .catch((err) => false);
    }
}

export default User;
