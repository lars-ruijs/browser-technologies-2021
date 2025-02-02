import express from 'express';
import bodyParser from 'body-parser';
import { homeRoute, dashboardRoute } from '../render/home.js';
import { studioRoute,  shirtCreationRoute } from '../render/studio.js';
import { orderRoute, confirmRoute, removeRoute } from '../render/order.js';


// Thanks to Guus and Robin for helping with "export"
export const router = express.Router();

const urlencodedParser = bodyParser.urlencoded({ extended: true });

// Home page (overview)
router
    .get("/", homeRoute)
    .get("/studio/:user/:shirt", studioRoute)
    .get("/remove/:user/:shirt", removeRoute)
    .get("/order/:user", orderRoute)
    .get("*", (req, res) => {
      res.status(404).render("404", { title: "Pagina niet gevonden", errorTitle: "Deze pagina kan niet worden gevonden.", errorDescription: "De door jou opgevraagde pagina kan niet worden gevonden.", errorLink: "/", errorLinkDescription: "Terug naar home" });   
    });

router
    .post("/dashboard", urlencodedParser, dashboardRoute)
    .post("/confirmorder", urlencodedParser, confirmRoute)
    .post("/createshirt", urlencodedParser, shirtCreationRoute);