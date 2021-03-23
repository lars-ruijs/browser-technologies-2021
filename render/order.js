import uniqid from 'uniqid';
import fs from 'fs';

// Overview of ordered (saved) shirts
export function orderRoute(req, res) {
    if(req.params.user && req.params.user.length === 8) {
        // Get userId from the request parameter
        const userId = req.params.user;
        
        // Get the data file
        const dataFile = fs.readFileSync("./data/data.json");
        // Parse JSON and convert to an array
        const data = Array.from(JSON.parse(dataFile));
        // Create an array with user id's > filter on provided user id
        const ids = data.map(user => user.userid).filter(id => id == userId);

        // If user exists > Show the saved shirts
        if(ids.length > 0) {
            const index = data.map(user => user.userid).indexOf(userId);
            const shirts = data[index].savedShirts;
            res.render("order", { title: "Bestel jouw Nerdshirts", userid: userId, shirts, newshirtid: uniqid(), userdata: data[index]});
        }
        else {
            res.status(401).render("404", { title: "Onjuiste inlogcode", errorTitle: "Je inlogcode is onjuist", errorDescription: "De inlogcode die je hebt ingevuld is bij ons niet bekend. Controleer je code en probeer het opnieuw.", errorLink: "/", errorLinkDescription: "Probeer het opnieuw" });   
        }
    }
    else {
        res.status(401).render("404", { title: "Onjuiste inlogcode", errorTitle: "Je inlogcode is onjuist", errorDescription: "De inlogcode die je hebt ingevuld is bij ons niet bekend. Let op! Je inlogcode moet uit 8 karakters bestaan. Je gebruikt er nu te weinig. Controleer je code en probeer het opnieuw.", errorLink: "/", errorLinkDescription: "Probeer het opnieuw" });   
    }
}

// When user clicks "Bestellen"-button
export function confirmRoute(req, res) {
    if(req.body.userid && req.body.userid.length === 8 && req.body.voornaam && req.body.achternaam && req.body.email) {
        const userId = req.body.userid;
        const voornaam = req.body.voornaam;
        const achternaam = req.body.achternaam;
        const email = req.body.email;

        // Get the data file
        const dataFile = fs.readFileSync("./data/data.json");
        // Parse JSON and convert to an array
        const data = Array.from(JSON.parse(dataFile));
        // Create an array with user id's > filter on provided user id
        const ids = data.map(user => user.userid).filter(id => id == userId);

        // If user exists > set name, email, etc...
        if(ids.length > 0) {
            const index = data.map(user => user.userid).indexOf(userId);
            data[index].voornaam = voornaam;
            data[index].achternaam = achternaam;
            data[index].email = email;
            data[index].orderedShirts.push(...data[index].savedShirts);
            data[index].savedShirts = [];
            res.render("ordered", {title: "Succesvol besteld!", userid: userId});
        }
        else {
            res.status(401).render("404", { title: "Onjuiste inlogcode", errorTitle: "Je inlogcode is onjuist", errorDescription: "De inlogcode die je hebt gebruikt is niet juist, want we kennen het niet. Probeer het opnieuw.", errorLink: "/", errorLinkDescription: "Probeer het opnieuw" });   
        }
        // Convert data back to JSON and write the file
        const whatToWrite = JSON.stringify(data, null, 2);
        fs.writeFile("./data/data.json", whatToWrite, (err) => { if(err){throw err;} console.log("succes");});
    }
    else {
        res.render("404", { title: "Je hebt niet alles ingevuld", errorTitle: "Je hebt niet alle vereiste gegevens ingevuld", errorDescription: "Zorg ervoor dat je alle vereiste velden van het formulier invuld, anders kunnen we je bestelling niet plaatsen!", errorLink: `/order/${req.body.userid}`, errorLinkDescription: "Probeer het opnieuw" });   
    }
}

export function removeRoute(req, res) {
    if(req.params.user && req.params.user.length === 8 && req.params.shirt) {
        const userId = req.params.user;
        const shirtId = req.params.shirt;

        // Get the data file
        const dataFile = fs.readFileSync("./data/data.json");
        // Parse JSON and convert to an array
        const data = Array.from(JSON.parse(dataFile));
        // Create an array with user id's > filter on provided user id
        const ids = data.map(user => user.userid).filter(id => id == userId);
        
        // If user exists
        if(ids.length > 0) {
            const index = data.map(user => user.userid).indexOf(userId);
            data[index].savedShirts.forEach((shirt, shirtIndex) => {
                if(shirt.shirtid === shirtId) {
                    data[index].savedShirts.splice(shirtIndex, 1);
                    if(req.query.page) {
                        res.render("removed", { title: "Shirt is succesvol verwijderd!", nextStep: req.query.page, userid: userId});
                    }
                }
            });
        }
        else {
            res.status(401).render("404", { title: "Onjuiste inlogcode", errorTitle: "Je inlogcode is onjuist", errorDescription: "De inlogcode die je hebt gebruikt is niet juist, want we kennen het niet. Probeer het opnieuw.", errorLink: "/", errorLinkDescription: "Probeer het opnieuw" });    
        }
        // Convert data back to JSON and write the file
        const whatToWrite = JSON.stringify(data, null, 2);
        fs.writeFile("./data/data.json", whatToWrite, (err) => { if(err){throw err;} console.log("succes");});
    }
    else {
        res.status(401).render("404", { title: "Onjuiste inlogcode", errorTitle: "Je inlogcode en/of shirt is onjuist", errorDescription: "De inlogcode en/of shirt die je wilt verwijderen is niet juist, want we kennen het niet. Probeer het opnieuw.", errorLink: "/", errorLinkDescription: "Probeer het opnieuw" });    
    }
}