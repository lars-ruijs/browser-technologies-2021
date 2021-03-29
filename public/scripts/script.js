// Select the fit and color options
const fit = document.querySelectorAll("input[name='pasvorm']");
const colors = document.querySelectorAll("input[name='kleur']");

// Select the input field for text displayed on shirt
const shirtTextInput = document.querySelector("input[name='shirttekst']");

// Select the studio form
const studioForm = document.querySelector("main div.studio form");

// Select the product image
const productImg = document.querySelector("div.studio img");

// Select the code field (used for coppying text)
const codeInput = document.querySelector("input#code");

// Select the login form and logout button
const loginForm = document.querySelector("main.home form");
const logoutButton = document.querySelector("main.page a.secundary#logout");

// Select the order form
const orderForm = document.querySelector("main.page.order form");

// If home login form is present > Add blur event listener
// InsertBefore source: https://stackoverflow.com/questions/4793604/how-to-insert-an-element-after-another-element-in-javascript-without-using-a-lib
if(loginForm) {
    const loginInput = document.querySelector("input[name='logincode']");
    
    // On blur > validate login input field
    loginInput.addEventListener("blur", function() {
        const errorText = document.querySelector("main.home form p:last-of-type");

        // If loginfield is empty
        if(loginInput.value == '' && !errorText) {
            inlineError(loginInput, "Je logincode mag niet leeg zijn.");
        }
        // If code is too short or too long
        else if(loginInput.value.length < 8 && !errorText || loginInput.value.length > 8 && !errorText) {
            inlineError(loginInput, "Je logincode moet uit 8 karakters bestaan.");
        }
        // Remove errorText if no longer needed
        else if(errorText && loginInput.value.length < 8 && loginInput.value.length > 8) {
            removeError(loginInput, errorText);
        }
    });

    // Custom Validity in loginform
    loginInput.addEventListener('input', function() {
        const errorText = document.querySelector("main.home form p:last-of-type");
        const formError = document.querySelector("main form p.formerror");
        if(formError) {
            formError.remove();
        }
        else if(errorText) {
            removeError(loginInput, errorText);
        }
        loginInput.setCustomValidity('');
        loginInput.checkValidity();
      });

    loginInput.addEventListener('invalid', function() {
        if(loginInput.value === '') {
            loginInput.setCustomValidity("Vul een logincode in");
        } 
        else if(loginInput.value.length < 8 || loginForm.value.length > 8) {
            loginInput.setCustomValidity("Inlogcodes bestaan uit exact 8 karakters. Je gebruikt er nu "+loginInput.value.length+".");
        }
    });

    // On submit > check if input is valid
    loginForm.addEventListener("submit", function(event){
        if(loginInput.value == '' || loginInput.value.length > 8 || loginInput.value.length < 8){
            createError(loginForm, "Inlogcode niet geldig. Zorg ervoor dat je een logincode invult met 8 karakters. Je hebt er nu "+loginInput.value.length+" ingevuld.");
            event.preventDefault();
        }
        else {
            return true;
        }
    });
}

// If orderForm is available
if(orderForm) {
    const firstName = document.querySelector("input[name='voornaam']");
    const lastName = document.querySelector("input[name='achternaam']");
    const email = document.querySelector("input[name='email']");

    // On blur > Check if first name is valid
    firstName.addEventListener("blur", function() {
        const errorText = document.querySelector("input[name='voornaam'] + p.errortext");
        // If firstname is empty
        if(firstName.value == '' && !errorText) {
            inlineError(firstName, "Vul een voornaam in.");
        }
        // Remove errorText if no longer needed
        else if(errorText && firstName.value != '') {
            removeError(firstName, errorText);
        }
    });

    // On blur > Check if last name is valid
    lastName.addEventListener("blur", function() {
        const errorText = document.querySelector("input[name='achternaam'] + p.errortext");
        // If lastname is empty
        if(lastName.value == '' && !errorText) {
            inlineError(lastName, "Vul een achternaam in.");
        }
        // Remove errorText if no longer needed
        else if(errorText && lastName.value != '') {
            removeError(lastName, errorText);
        }
    });

    // On blur > Check if email is valid
    email.addEventListener("blur", function() {
        const errorText = document.querySelector("input[name='email'] + p.errortext");
        // If email is empty or invalid
        if(email.value == '' && !errorText || !email.value.includes("@") && !errorText || !email.value.includes(".") && !errorText) {
            inlineError(email, "Vul een geldig e-mailadres in.");
        }
        // Remove errorText if no longer needed
        else if(errorText && email.value != '' && email.value.includes("@") && email.value.includes(".")) {
            removeError(email, errorText);
        }
    });

    // Remove error message if present (on input) 
    firstName.addEventListener('input', function() {
        const errorText = document.querySelector("input[name='voornaam'] + p.errortext");
        if(errorText) {
            removeError(firstName, errorText);
        }
    });

    lastName.addEventListener('input', function() {
        const errorText = document.querySelector("input[name='achternaam'] + p.errortext");
        if(errorText) {
            removeError(lastName, errorText);
        }
    });

    email.addEventListener('input', function(event) {
        const errorText = document.querySelector("input[name='email'] + p.errortext");
        if(errorText && event.target.value.includes("@") && event.target.value.includes(".")) {
            removeError(email, errorText);
        }
    });

    // On submit check if required fields are send
    orderForm.addEventListener("submit", function(event){
        if(firstName.value.length == 0 || lastName.value.length == 0 || email.value.length == 0 || !email.value.includes("@") || !email.value.includes(".")){
            createError(orderForm, "Kan bestelling niet plaatsen. Zorg ervoor dat je een voor- en achternaam invult én dat je een geldig e-mailadres opgeeft.");
            event.preventDefault();
        } 
        else {
            return true;
        }
    });
}

// If on studio route
if(window.location.pathname.includes("/studio/")) {
    // Add event listener to shirt text input field
    shirtTextInput.addEventListener("input", function(event) {
        const text = event.target.value;
        
        // Update text on shirt with entered text
        const shirtText = document.querySelector("div.studio div.preview p");
        shirtText.textContent = text;

        const errorText = document.querySelector("div.studio fieldset:nth-of-type(3) p:last-of-type");
        // If too many characters are used > display error text
        if(text.length > 74 && !errorText) {
            inlineError(shirtTextInput, "Let op! Er passen maximaal 75 tekens op het shirt.");
        }
        else if(text.length < 75 && errorText) {
            removeError(shirtTextInput, errorText);
        }
    });

    // Form validation: check if all required fields are filled. If not > show error message
    studioForm.addEventListener("submit", function(event){
        const genderSelect = document.querySelectorAll("input[name='pasvorm']:checked");
        const colorSelect = document.querySelectorAll("input[name='kleur']:checked");
        const sizeSelect = document.querySelectorAll("input[name='maat']:checked");

        if(genderSelect.length == 0 || colorSelect.length == 0 || sizeSelect.length == 0){
            createError(studioForm, "Shirt kon niet worden opgeslagen. Zorg ervoor dat je een Pasvorm (m/v), Kleur en Maat kiest!");
            event.preventDefault();
        } 
        else {
            return true;
        }
    });

    // Add event listener to all fit options
    fit.forEach(function(element) {
        element.addEventListener("change", function(event) {
            const gender = event.target.id;
            const kleurSelect = document.querySelectorAll("input[name='kleur']:checked");
            if(kleurSelect.length > 0) {
                const shirtColor = kleurSelect[0].value;
                productImg.src = "/img/shirt"+gender+shirtColor+".png";
                productImg.alt = "een "+shirtColor+" shirt voor een "+gender;
            } 
            else {
                productImg.src = "/img/shirt"+gender+"zwart.png";
                productImg.alt = "een zwart shirt voor een "+gender;
            }
        });
    });

    // Add event listener to all color options
    colors.forEach(function(element) {
        element.addEventListener("change", function(event) {
            const shirtColor = event.target.id;
            const genderSelect = document.querySelectorAll("input[name='pasvorm']:checked");
            if(genderSelect.length > 0) {
                const gender = genderSelect[0].value;
                productImg.src = "/img/shirt"+gender+shirtColor+".png";
                productImg.alt = "een "+shirtColor+" shirt voor een "+gender;
            } 
            else {
                productImg.src = "/img/shirtman"+shirtColor+".png";
                productImg.alt = "een "+shirtColor+" shirt voor een man";
            }
        });
    });
}

// If Clipboard API is available and codeInput field is present > Add event listener
// Clipboard API documentation used from https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API
if(navigator.clipboard && codeInput) {
    codeInput.addEventListener("click", async function() {
    try {
        await navigator.clipboard.writeText(codeInput.value);
        const codeSuccess = document.querySelectorAll("div.code p");
        
        // If no success message present > Show "copied successful" text
        if(codeSuccess.length === 0) {
            const codeContainer = document.querySelector("div.code");
            const p = document.createElement("p");
            p.textContent = "De code is succesvol gekopieerd naar je klembord!";
            codeContainer.appendChild(p);
          }
    } catch(err) {
        console.error('Failed to copy: ', err);
    }
    });
}

// If localStorage is available
// WebStorage API documentation: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API
if (window.localStorage) {

    // If (hidden) codeInput field is present > set value to localStorage item "code"
    if(codeInput) {
        localStorage.code = codeInput.value;
    }

    // If code inside localStorage and loginform present
    if(localStorage.code && localStorage.code.length === 8 && loginForm) {
        const startDesignButton = document.querySelector("main.home a.primary");

        // Change studio route (include userID from localStorage)
        const studioRoute = startDesignButton.href.split("/");  
        startDesignButton.href = "/studio/"+localStorage.code+"/"+studioRoute[studioRoute.length-1];

        const createBox = document.querySelector("main.home section:first-of-type div");
        const a = document.createElement("a");
        a.href = "/order/"+localStorage.code;
        a.classList.add("secundary");
        a.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M10 19.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm1.336-5l1.977-7h-16.813l2.938 7h11.898zm4.969-10l-3.432 12h-12.597l.839 2h13.239l3.474-12h1.929l.743-2h-4.195z"/></svg>Bekijk winkelwagen';

        createBox.appendChild(a);
        
        // Remove the login box on the homepage
        const loginBox = document.querySelector("main.home section:nth-of-type(2)");
        loginBox.remove();
    }

    // If logout button is present & code stored inside localStorage > Add event listener
    if(logoutButton && localStorage.code && localStorage.code.length === 8) {
        logoutButton.addEventListener("click", function() {
            // Remove code
            localStorage.removeItem('code');
        });
    }
}

// Create form error message
function createError(node, error) {
    const errorText = document.querySelector("main form p.formerror");
    const message = document.createElement("p");
    message.classList.add("formerror");
    message.textContent = error;

    if(!errorText) {
        node.appendChild(message);
    }
}

// Create inline error (below input field)
function inlineError(inputField, error) {
    const p = document.createElement("p");
    p.textContent = error;
    p.classList.add("errortext");
    inputField.style.border = "2px solid #a72916";
    inputField.parentNode.insertBefore(p, inputField.nextSibling);
}

// Remove error text and set input field border to normal
function removeError(inputField, node) {
    inputField.style.border = "2px solid #292929";
    node.remove();
}