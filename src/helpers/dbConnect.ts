import mongoose from "mongoose";
import Log from "../lib/log";

const connect = () => {
    const atlasClient = {
        password: process.env.DB_PASSWORD,
        db: process.env.DB_NAME,
        cluster: process.env.DB_CLUSTER,
    };

    const uri = `mongodb+srv://root:${atlasClient.password}@${atlasClient.cluster}.mongodb.net/${atlasClient.db}?retryWrites=true&w=majority`;

    mongoose
        .connect(uri, { serverSelectionTimeoutMS: 1000 })
        .then((val) => Log.log("Connected to MDB Atlas successfully!"))
        .catch((err) => {
            // Log.log("MDB Atlas could not connect :>>");
            Log.log("MDB Atlas could not connect :>>", err);
            connect();
        });
};

export default { connect };
