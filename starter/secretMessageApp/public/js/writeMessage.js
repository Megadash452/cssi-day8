function sendMsg(msg, pass) {
    if (msg && pass) {
        let ref = firebase.database().ref()
        ref.push({
            message: msg,
            passcode: hash(pass)
        });
    }
}

const textarea = document.getElementById('message');
const submitBtn = document.getElementById('submit');
const textCount = document.getElementById('text-count');
const passElement = document.getElementById('passcode');

let passOk = false;

const symbols = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

submitBtn.addEventListener('click', e => {
    if (passOk) {
        sendMsg(
            textarea.value,
            passElement.value
        );
        textarea.value = "";
    }
});

textarea.addEventListener('input', e => {
    let count = textarea.value.length;
    textCount.innerText = `${count}/${textarea.maxLength}`;
    if (count >= 90) {
        textCount.style.color = "red";
    }
    else {
        textCount.style.color = "#4a4a4a";
    }
});

passElement.addEventListener('change', e => {
    let upper  = false,
        num    = false,
        symbol = false;
    const upperElement  = document.querySelector('div.control strong.upper'),
          numElement    = document.querySelector('div.control strong.num'),
          symbolElement = document.querySelector('div.control strong.symbol');
    console.log(upper, num, symbol);
    let pass = passElement.value;

    
    for (let i=0; i < pass.length; i++) {
        let char = pass[i];
        // check 1 uppercase
        if (char === char.toUpperCase() && char != char.toLowerCase())
            upper = true;
        // check 1 number
        if (char == parseInt(char))
            num = true;
        // check 1 symbol
        if (symbols.test(char)) {
            symbol = true;
        }
    }

    if (upper && num && symbol) {
        passOk = true
        passElement.style.borderColor = '#dbdbdb'
    } else {
        passOk = false;
        passElement.style.borderColor = 'red';
    }
    
    if (upper)
        upperElement.innerText = '1 Uppercase ✔';
    else
        upperElement.innerText = '1 Uppercase ❌';
    if (num)
        numElement.innerText = '1 number ✔';
    else
        numElement.innerText = '1 number ❌';
    if (symbol)
        symbolElement.innerText = '1 symbol ✔';
    else
        symbolElement.innerText = '1 symbol ❌';
});

function hash(pass) {
    return new Hashes.SHA1.hex(pass);
}