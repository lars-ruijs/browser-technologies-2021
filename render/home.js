import uniqid from 'uniqid';
import fs from 'fs';

// Home page
export function homeRoute(req, res) {
    res.render('index', { title: "Home", userid: uniqid.time(), shirtid: uniqid() });
}

// export function userRoute(req, res) {
//     res.render('createuser', { title: "Maak een account", userid: uniqid.time()});
// }

// Route to dashboard page
export function dashboardRoute(req, res) {
    // Get logincode from POST-request by form 
    const logincode = req.body.logincode;

    // Check the logincode
    if(logincode && logincode.length === 8) {
        // Get the data file
        const dataFile = fs.readFileSync("./data/data.json");
        // Convert it to an array
        const data = Array.from(JSON.parse(dataFile));
        // Filter ids on provided logincode
        const ids = data.map(user => user.userid).filter(id => id == logincode);

        // If id exists > render the dashboard
        if(ids.length === 1) {
           const index = data.map(user => user.userid).indexOf(logincode);
           const userData = data[index];
           res.redirect(`/order/${logincode}`);
        }
        // If id does not exist > render error page
        else {
            res.status(401).render("404", { title: "Onjuiste inlogcode", errorTitle: "Je inlogcode is onjuist", errorDescription: "De inlogcode die je hebt ingevuld is bij ons niet bekend. Controleer je code en probeer het opnieuw.", errorLink: "/", errorLinkDescription: "Probeer het opnieuw" });   
        }
    }
    else {
        res.status(401).render("404", { title: "Onjuiste inlogcode", errorTitle: "Je inlogcode is onjuist", errorDescription: "De inlogcode die je hebt ingevuld is bij ons niet bekend. Controleer je code en probeer het opnieuw. Let op! Je code is minimaal 8 karakters lang.", errorLink: "/", errorLinkDescription: "Probeer het opnieuw" });   
    }
}

// export function userCreationRoute(req, res) {
//     // Check if all required fields are received
//     if(req.body.clientid && req.body.voornaam && req.body.achternaam && req.body.email) {
//         // Get the data file
//         const dataFile = fs.readFileSync("./data/data.json");
//         // Convert it to an array
//         const data = Array.from(JSON.parse(dataFile));
//         // Filter ids on provided clientid
//         const ids = data.map(user => user.userid).filter(id => id == req.body.clientid);
        
//         // If id excists > change that object
//         if(ids.length > 0) {
//             const index = data.map(user => user.userid).indexOf(req.body.clientid);
//             data[index].voornaam = req.body.voornaam;
//             data[index].achternaam = req.body.achternaam;
//             data[index].email = req.body.email;
//         }

//         // If it does not exist > Create new object
//         else {
//             const dataObject = {
//                 "userid": req.body.clientid,
//                 "voornaam": req.body.voornaam,
//                 "achternaam": req.body.achternaam,
//                 "email": req.body.email,
//                 "orderedShirts": [],
//                 "savedShirts": []
//             };
//             data.push(dataObject);
//         }
//         // Convert data back to JSON and write the file
//         const whatToWrite = JSON.stringify(data, null, 2);
//         fs.writeFile("./data/data.json", whatToWrite, (err) => { if(err){throw err;} console.log("succes");});
        
//         res.render('code', { title: "Dit is je inlogcode", userid: req.body.clientid, voornaam: req.body.voornaam, shirtid: uniqid()});
//     }
// }