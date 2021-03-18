import express from 'express';
import bodyParser from 'body-parser';
import { homeRoute, userRoute, dashboardRoute, userCreationRoute } from '../render/home.js';

// Thanks to Guus and Robin for helping with "export"
export const router = express.Router();

const urlencodedParser = bodyParser.urlencoded({ extended: true });

// Home page (overview)
router
    .get("/", homeRoute)
    .get("/newuser", userRoute)
    .get("*", (req, res) => {
        res.status(404).render("404", { title: "404 Not Found" });
    });

router
    .post("/dashboard", urlencodedParser, dashboardRoute)
    .post("/createuser", urlencodedParser, userCreationRoute);