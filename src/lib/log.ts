class Log {
    public static log(...args: Array<any>) {
        const env = process.env.NODE_ENV;
        switch (env) {
            case "development":
            case "test":
                console.log(...args);
                return;
            case "production":
                return;

            default:
                break;
        }
    }
}

export default Log;
