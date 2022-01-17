import { Router } from "express";
import User from "../models/User";

export const API_ROUTE = Router();

API_ROUTE.get(`/hobbies`, async (req, res) => {
    const [status, data] = await User.getAllHobbies();
    switch (status) {
        case 0:
            return res.send({ type: "success", data });

        default:
            return res.status(406).send({ type: "error", code: status, data });
    }
});

API_ROUTE.get(`/moods`, async (req, res) => {
    const [status, data] = await User.getAllMoods();
    switch (status) {
        case 0:
            return res.send({ type: "success", data });

        default:
            return res.status(406).send({ type: "error", code: status, data });
    }
});

API_ROUTE.get(`/users`, async (req, res) => {
    const [status, data] = await User.getUsers();
    switch (status) {
        case 0:
            return res.send({ type: "success", data });

        default:
            return res.status(406).send({ type: "error", code: status, data });
    }
});
