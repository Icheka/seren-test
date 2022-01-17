import { Router } from "express";

export const API_ROUTE = Router();

API_ROUTE.get(`/`, (req, res) => {
    res.send("You are here - /api/");
});
