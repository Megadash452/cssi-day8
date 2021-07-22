const getMsgs = () => {
    const msgsRef = firebase.database().ref();

    msgsRef.on('value', (snapshot) => {
        const data = snapshot.val();
        for (let key in data) {
            const msg = data[key];
            if (myPass == msg.passcode)
                renderMsg(msg);
            console.log(msg);
        }
    });
};

function findMsg(myPass) {
    firebase.database().ref().on('value', (snapshot) => {
        const data = snapshot.val();
        msgSection.innerHTML = "";
        passMatch = false;
        console.log("firebase data", data);

        for (let key in data) {
            const msg = data[key];
            console.log(msg);
            if (parseInt(myPass) == msg.passcode) {
                passMatch = true;
                renderMsg(msg.msg);
            }  
        }
        if (!passMatch && myPass != "") {
            renderError(myPass);
        }
    });
}

let msgSection = document.querySelector("#messages");
let attempts = 0;
let timeout = false;
const timeoutLength = 180000;

function renderMsg(msg) {
    msgSection.innerHTML = msgSection.innerHTML +
    `<div class="card">
        <div class="card-content">
            <h2 class="msg subtitle is-4">${msg}</h2>
        </div>
    </div>`;
}

function renderError(passcode) {
    msgSection.innerHTML = 
    `<div class="card is-danger">
        <div class="card-content">
            <h2 class="msg subtitle is-4">The passcode you entered (${passcode}) doesn't match any passwords</h2>
        </div>
    </div>`
}
function renderTimeout() {
    msgSection.innerHTML = 
    `<div class="card is-warning">
        <div class="card-content">
            <h2 class="msg subtitle is-4">
                You are on timeout for trying a wrong password 3 times. Your timeout lasts ${timeoutLength/60000} minutes
            </h2>
        </div>
    </div>`
}


document.getElementById("viewMsg").addEventListener('click', e => {
    attempts++;

    if (attempts >= 3) {
        alert("timeout!!!");
        timeout = true
        renderTimeout();
        doTimeout(); // dont work
        alert("you are no longer on timeout");
        msgSection.innerHTML = "";
        attempts = 0;
    }
    if (!timeout)
        findMsg(document.getElementById("passcode").value);
});

async function doTimeout() {
    await setTimeout(() => { }, timeoutLength);
}