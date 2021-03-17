import express from 'express';
import { homeRoute } from '../render/home.js';

// Thanks to Guus and Robin for helping with "export"
export const router = express.Router();

// Home page (overview)
router
    .get("/", homeRoute)
    .get("*", (req, res) => {
        res.status(404).render("404", { title: "404 Not Found" });
    });