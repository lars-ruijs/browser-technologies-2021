// Select the fit and color options
const fit = document.querySelectorAll("input[name='pasvorm']");
const colors = document.querySelectorAll("input[name='kleur']");

// Select the input field for text displayed on shirt
const shirtTextInput = document.querySelector("input[name='shirttekst']");

// Select the product image
const productImg = document.querySelector("div.studio img");

// Select the code field (used for coppying text)
const codeInput = document.querySelector("input#code");

// Select the login form, start button and logout button
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

if(window.location.pathname.includes("/studio/")) {
    console.log("STUDIO");
    shirtTextInput.addEventListener("input", (event) => {
        const text = event.target.value;
        
        // Update text on shirt with entered text
        const shirtText = document.querySelector("div.studio div.preview p");
        shirtText.textContent = text;
    });

    // loginForm.addEventListener('invalid', () => {
    //     if(loginForm.value === '') {
    //         loginForm.setCustomValidity("Vul een logincode in");
    //     } else {
    //         loginForm.setCustomValidity("Inlogcodes bestaan uit minstens 8 karakters.");
    //     }
    //   });
}


// If Clipboard API is available and codeInput field is present > Add event listener
// Clipboard API documentation used from https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API
if (navigator.clipboard && codeInput) {
    codeInput.addEventListener("click", async () => {
    try {
        await navigator.clipboard.writeText(codeInput.value);
        const codeSuccess = document.querySelectorAll("div.code p");
        
        // If no success message present > Show "copied successful" text
        if (codeSuccess.length === 0) {
            const codeContainer = document.querySelector("div.code");
            const p = document.createElement("p");
            p.textContent = "De code is succesvol gekopieerd naar je klembord!";
            codeContainer.appendChild(p);
          }
    } catch (err) {
        console.error('Failed to copy: ', err);
    }
    });
}

// If localStorage is available
// WebStorage API documentation: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API
if (window.localStorage) {

    // If (hidden) codeInput field is present > set value to localStorage item "code"
    if (codeInput) {
        localStorage.code = codeInput.value;
    }

    // If code inside localStorage and loginform present
    if (localStorage.code && localStorage.code.length === 8 && loginForm && startDesignButton) {
        // Change studio route (include userID from localStorage)
        const studioRoute = startDesignButton.href.split("/");  
        startDesignButton.href = `/studio/${localStorage.code}/${studioRoute[studioRoute.length-1]}`;

        const createBox = document.querySelector("main.home section:first-of-type");
        const a = document.createElement("a");
        a.href = `/order/${localStorage.code}`;
        a.classList.add("secundary");
        a.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M10 19.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm1.336-5l1.977-7h-16.813l2.938 7h11.898zm4.969-10l-3.432 12h-12.597l.839 2h13.239l3.474-12h1.929l.743-2h-4.195z"/></svg>Bekijk winkelwagen';

        createBox.appendChild(a);
        
        const loginBox = document.querySelector("main.home section:nth-of-type(2)");
        loginBox.remove();
    }

    // If logout button is present & code stored inside localStorage > Add event listener
    if (logoutButton && localStorage.code && localStorage.code.length === 8) {
        logoutButton.addEventListener("click", () => {
            // Remove code
            localStorage.removeItem('code');
        });
    }
}


// loginForm.addEventListener('invalid', () => {
//     if(loginForm.value === '') {
//         loginForm.setCustomValidity("Vul een logincode in");
//     } else {
//         loginForm.setCustomValidity("Inlogcodes bestaan uit minstens 8 karakters.");
//     }
//   });