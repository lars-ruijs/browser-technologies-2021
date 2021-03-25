console.log("Hello");
const fitting = document.querySelectorAll("input[name='pasvorm']");
const colors = document.querySelectorAll("input[name='kleur']");
const shirtTextInput = document.querySelector("input[name='shirttekst']");
const productImg = document.querySelector("div.studio img");
const shirtText = document.querySelector("div.studio div.preview p");


fitting.forEach(element => {
    element.addEventListener("change", (event) => {
        const gender = event.target.id;
        const kleurSelect = document.querySelectorAll("input[name='kleur']:checked");
        if (kleurSelect.length > 0) {
            const shirtColor = kleurSelect[0].value;
            productImg.src = `/img/shirt${gender}${shirtColor}.png`;
        } 
        else {
            productImg.src = `/img/shirt${gender}zwart.png`;
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
        } 
        else {
            productImg.src = `/img/shirtman${shirtColor}.png`;
        }
    });
});

shirtTextInput.addEventListener("input", (event) => {
    const text = event.target.value;
    shirtText.textContent = text;
});
