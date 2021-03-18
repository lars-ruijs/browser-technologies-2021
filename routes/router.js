import express from 'express';
import bodyParser from 'body-parser';
import { homeRoute, dashboardRoute } from '../render/home.js';
import { studioRoute,  shirtCreationRoute } from '../render/studio.js';
import { orderRoute, confirmRoute } from '../render/order.js';


// Thanks to Guus and Robin for helping with "export"
export const router = express.Router();

const urlencodedParser = bodyParser.urlencoded({ extended: true });

// Home page (overview)
router
    .get("/", homeRoute)
    .get("/studio/:user/:shirt", studioRoute)
    .get("/order/:user", orderRoute)
    .get("*", (req, res) => {
        res.status(404).render("404", { title: "404 Not Found" });
    });

router
    .post("/dashboard", urlencodedParser, dashboardRoute)
    .post("/confirmorder", urlencodedParser, confirmRoute)
    .post("/createshirt", urlencodedParser, shirtCreationRoute);