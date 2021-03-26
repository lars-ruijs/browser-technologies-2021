const fitting = document.querySelectorAll("input[name='pasvorm']");
const colors = document.querySelectorAll("input[name='kleur']");
const shirtTextInput = document.querySelector("input[name='shirttekst']");
const productImg = document.querySelector("div.studio img");
const shirtText = document.querySelector("div.studio div.preview p");
const codeInput = document.querySelector("input#code");


fitting.forEach(element => {
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

if(shirtTextInput) {
    shirtTextInput.addEventListener("input", (event) => {
        const text = event.target.value;
        shirtText.textContent = text;
    });
}

if(codeInput) {
    codeInput.addEventListener("click", () => {
      codeInput.select();
      document.execCommand("copy");
      const codeSuccess = document.querySelectorAll("div.code p");

      if(codeSuccess.length === 0) {
        const codeContainer = document.querySelector("div.code");
        const p = document.createElement("p");
        p.textContent = "De code is succesvol gekopieerd naar je klembord!";
        codeContainer.appendChild(p);
      }
    });
}