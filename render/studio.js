import uniqid from 'uniqid';
import fs, { writeFile } from 'fs';

export function studioRoute(req, res) {
    if(req.params.user && req.params.user.length === 8 && req.params.shirt){
        const userid = req.params.user;
        const shirtid = req.params.shirt;

        // Get the data file
        const dataFile = fs.readFileSync("./data/data.json");
        // Parse JSON and convert to an array
        const data = Array.from(JSON.parse(dataFile));
        // Create an array with user id's > filter on provided user id
        const ids = data.map(user => user.userid).filter(id => id == userid);

        const shirtData = [];

        if(ids.length > 0) {
            const index = data.map(user => user.userid).indexOf(userid);
            const savedShirts = data[index].savedShirts.map(shirt => shirt.shirtid).filter(id => id === shirtid);

            if(savedShirts.length > 0) {
                const indexShirt = data[index].savedShirts.map(shirt => shirt.shirtid).indexOf(shirtid);
                shirtData.push(data[index].savedShirts[indexShirt]);
            }
        }
        res.render('studio', { title: "Design je eigen shirt", userid, shirtid, shirtData });
    }
    else {
        res.render("404", { title: "Oeps, studio kan niet worden geladen", errorTitle: "Oeps, de ontwerpstudio kan niet worden geladen", errorDescription: "De ontwerpstudio heeft een ongeldige inlog- of t-shirtcode ontvangen en kan daardoor de ontwerpstudio niet tonen. Klik hieronder om een nieuwe sessie te starten.", errorLink: `/studio/${uniqid.time()}/${uniqid()}}`, errorLinkDescription: "Ontwerpstudio opnieuw starten" });   
    }
}

// If shirt was created
export function shirtCreationRoute(req, res) {
    // Check if all required fields are available 
    if(req.body.userid && req.body.shirtid && req.body.pasvorm && req.body.maat && req.body.kleur) {
        const userId = req.body.userid;
        const shirtId = req.body.shirtid;
        const pasvorm = req.body.pasvorm;
        const maat = req.body.maat;
        const kleur = req.body.kleur;
        const tekst = req.body.shirttekst;

        let newUser = true;

        // Get the data file
        const dataFile = fs.readFileSync("./data/data.json");
        // Parse JSON and convert to an array
        const data = Array.from(JSON.parse(dataFile));
        // Create an array with user id's > filter on provided user id
        const ids = data.map(user => user.userid).filter(id => id == userId);
        
        // If id is new > add it to data
        if(ids.length === 0) {
            const dataObject = {
                "userid": userId,
                "voornaam": '',
                "achternaam": '',
                "email": '',
                "orderedShirts": [],
                "savedShirts": [{
                    "shirtid": shirtId,
                    "pasvorm": pasvorm,
                    "maat": maat,
                    "kleur": kleur,
                    "tekst": tekst
                }]
            };
            data.push(dataObject);
        }

        // If id exists > add new shirt to the "savedShirts" array
        else if (ids.length > 0) {
            const index = data.map(user => user.userid).indexOf(userId);
            const savedShirts = data[index].savedShirts.map(shirt => shirt.shirtid).filter(id => id === shirtId);
            newUser = false;

            // If shirtCode already exists for this user > edit the shirt.
            if(savedShirts.length > 0) {
                const indexShirt = data[index].savedShirts.map(shirt => shirt.shirtid).indexOf(shirtId);
                data[index].savedShirts[indexShirt].pasvorm = pasvorm;
                data[index].savedShirts[indexShirt].maat = maat;
                data[index].savedShirts[indexShirt].kleur = kleur;
                data[index].savedShirts[indexShirt].tekst = tekst;
            }
            // If shirtcode does not exist for this user > add it.
            else {
                const shirtObject = {
                    "shirtid": shirtId,
                    "pasvorm": pasvorm,
                    "maat": maat,
                    "kleur": kleur,
                    "tekst": tekst
                };
                data[index].savedShirts.push(shirtObject);
            }
        }
         // Convert data back to JSON and write the file
         const whatToWrite = JSON.stringify(data, null, 2);
         fs.writeFile("./data/data.json", whatToWrite, (err) => { if(err){throw err;} console.log("succes");});
         res.render("shirtcreated", { title: "T-shirt opgeslagen!", userid: userId, shirtid: uniqid(), newuser: newUser});
    }
    else {
        res.render("404", { title: "T-shirt kon niet worden opgeslagen", errorTitle: "Oeps, je NERD shirt kon niet worden opgeslagen", errorDescription: "Niet alle vereiste gegevens zijn ingevuld. Ga terug naar de vorige pagina en zorg ervoor dat alle vereiste velden zijn ingevuld.", errorLink: null, errorLinkDescription: null });   
    }
}

// export function shirtTransferRoute(req, res) {
//     if(req.body.userid && req.body.logincode && req.body.userid.length === 8 && req.body.logincode === 8) {
//         // Get the data file
//         const dataFile = fs.readFileSync("./data/data.json");
//         // Convert it to an array
//         const data = Array.from(JSON.parse(dataFile));
//         // Filter ids on provided logincode
//         const ids = data.map(user => user.userid).filter(id => id == logincode);

//         // If login code is correct
//         if(ids.length > 0) {
//             const indexOldCode = data.map(user => user.userid).indexOf(req.body.userid);
//             const indexNewCode = data.map(user => user.userid).indexOf(req.body.logincode);

//             data[indexNewCode].savedShirts.push(...data[indexOldCode].savedShirts);
//             data.splice(indexOldCode, 1);
//             res.send("Gelukt!");
//         }

//         // Convert data back to JSON and write the file
//         const whatToWrite = JSON.stringify(data, null, 2);
//         fs.writeFile("./data/data.json", whatToWrite, (err) => { if(err){throw err;} console.log("succes");});
//     }
//     console.log("TEST gefaald");
// }