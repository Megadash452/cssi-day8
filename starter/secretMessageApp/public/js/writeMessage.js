function sendMsg(msg, pass) {
    if (msg && pass) {
        let ref = firebase.database().ref()
        ref.push({
            message: msg,
            passcode: pass
        });
    }
}

document.getElementById('submit').addEventListener('click', e => {
    sendMsg(
        document.getElementById('message').value,
        document.getElementById('passcode').value
    );
    document.getElementById('message').value = "";
});