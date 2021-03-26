const fit = document.querySelectorAll("input[name='pasvorm']");
const colors = document.querySelectorAll("input[name='kleur']");
const shirtTextInput = document.querySelector("input[name='shirttekst']");
const productImg = document.querySelector("div.studio img");
const codeInput = document.querySelector("input#code");


const loginForm = document.querySelector("input[name='logincode']");
const startDesignButton = document.querySelector("main.home a.primary");

const logoutButton = document.querySelector("main.page a.secundary#logout");

// Add event listener to all fit options
fit.forEach(element => {
    element.addEventListener("change", (event) => {
        const gender = event.target.id;
        const kleurSelect = document.querySelectorAll("input[name='kleur']:checked");
        if (kleurSelect.length > 0) {
            const shirtColor = kleurSelect[0].value;
            productImg.src = `/img/shirt${gender}${shirtColor}.png`;
            productImg.alt = `afbeelding van een ${shirtColor} shirt voor een ${gender}`;
        } 
        else {
            productImg.src = `/img/shirt${gender}zwart.png`;
            productImg.alt = `afbeelding van een zwart shirt voor een ${gender}`;
        }
    });
});

// Add event listener to all color options
colors.forEach(element => {
    element.addEventListener("change", (event) => {
        const shirtColor = event.target.id;
        const genderSelect = document.querySelectorAll("input[name='pasvorm']:checked");
        if (genderSelect.length > 0) {
            const gender = genderSelect[0].value;
            productImg.src = `/img/shirt${gender}${shirtColor}.png`;
            productImg.alt = `afbeelding van een ${shirtColor} shirt voor een ${gender}`;
        } 
        else {
            productImg.src = `/img/shirtman${shirtColor}.png`;
            productImg.alt = `afbeelding van een ${shirtColor} shirt voor een man`;
        }
    });
});

// If text input field for shirt text is present > Add event listener
if(shirtTextInput) {
    shirtTextInput.addEventListener("input", (event) => {
        const text = event.target.value;
        
        // Update text on shirt with entered text
        const shirtText = document.querySelector("div.studio div.preview p");
        shirtText.textContent = text;
    });
}

// If codeInput field is present > Add event listener
if(codeInput) {
    codeInput.addEventListener("click", () => {
      // Select text inside field > copy to clipboard 
      codeInput.select();
      document.execCommand("copy");
      const codeSuccess = document.querySelectorAll("div.code p");

      // If no success message present > Show "copied successful" text
      if(codeSuccess.length === 0) {
        const codeContainer = document.querySelector("div.code");
        const p = document.createElement("p");
        p.textContent = "De code is succesvol gekopieerd naar je klembord!";
        codeContainer.appendChild(p);
      }
    });
}

// If localStorage is available
if (window.localStorage) {

    // If (hidden) codeInput field is present > set value to localStorage item "code"
    if(codeInput) {
        localStorage.code = codeInput.value;
    }

    // If code inside localStorage and loginform present
    if(localStorage.code && localStorage.code.length === 8 && loginForm && startDesignButton) {
        // Change studio route (include userID from localStorage)
        const studioRoute = startDesignButton.href.split("/");  
        startDesignButton.href = `/studio/${localStorage.code}/${studioRoute[studioRoute.length-1]}`;
        
        // Change loginbox title
        const loginBoxTitle = document.querySelector("main.home section:nth-of-type(2) h2");
        loginBoxTitle.textContent = "Welkom terug!";

        // Don't display the login label
        const loginLabel = document.querySelector("main.home form label[for='logincode']");
        loginLabel.style.display = "none";

        // Set the login form input value and hide input
        loginForm.value = localStorage.code;
        loginForm.type = "hidden";

        // Change text inside login button
        const loginButton = document.querySelector("main.home form input[type='submit']");
        loginButton.value = "Naar dashboard";
    }

    // If logout button is present & code stored inside localStorage > Add event listener
    if(logoutButton && localStorage.code && localStorage.code.length === 8) {
        logoutButton.addEventListener("click", () => {
            // Remove code
            localStorage.removeItem('code');
        });
    }
}