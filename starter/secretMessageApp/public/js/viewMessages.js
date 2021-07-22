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
    const msgsRef = firebase.database().ref();

    msgsRef.on('value', (snapshot) => {
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

msgSection = document.querySelector("#messages");

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


document.getElementById("viewMsg").addEventListener('click', e => {
    findMsg(document.getElementById("passcode").value);
});
findMsg(document.getElementById("passcode").value);