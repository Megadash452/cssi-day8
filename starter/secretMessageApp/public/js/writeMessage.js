function sendMsg(msg, pass) {
    if (msg && pass) {
        let ref = firebase.database().ref()
        ref.push({
            message: msg,
            passcode: pass
        });
    }
}

let textarea = document.getElementById('message');
let submitBtn = document.getElementById('submit');
let textCount = document.getElementById('text-count');

submitBtn.addEventListener('click', e => {
    sendMsg(
        textarea.value,
        document.getElementById('passcode').value
    );
    textarea.value = "";
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