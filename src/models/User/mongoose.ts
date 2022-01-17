import { model, Schema, SchemaTypes } from "mongoose";
import { UserType } from "../../types/user";

const UserSchema = new Schema<UserType>(
    {
        slackUserId: {
            type: String,
            required: [true, `'slack-user-id' is required!`],
            trim: true,
        },
        slackUserName: {
            type: String,
            required: [true, `'slack-user-name' is required!`],
            trim: true,
        },
        hobbies: {
            type: [String],
            required: false,
        },
        mood: {
            type: String,
            required: false,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

const UserModel = model<UserType>(`User`, UserSchema);
export default UserModel;
