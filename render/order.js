import fs, { writeFile } from 'fs';

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
            res.render("order", { title: "Bestel jouw Nerdshirts", userid: userId, shirts});
        }
        else {
            res.render("404", { title: "404"});
        }
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
            res.send("Succesvol besteld");
        }
        else {
            res.render("404", { title: "404"});
        }
        // Convert data back to JSON and write the file
        const whatToWrite = JSON.stringify(data, null, 2);
        fs.writeFile("./data/data.json", whatToWrite, (err) => { if(err){throw err;} console.log("succes");});
    }
}