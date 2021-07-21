const getMsgs = () => {
    console.log("getMsgs");
    const msgsRef = firebase.database().ref();
    msgsRef.on('value', (snapshot) => {
        const data = snapshot.val();
        console.log("firebase data", data);
        for (let key in data) {
            const msg = data[key];
            if (myPass == msg.passcode)
                renderMsg(msg);
            console.log(msg);
        }
    });
};

const findMsg = (myPass) => {
    console.log("getMsgs", myPass);
    const msgsRef = firebase.database().ref();
    msgsRef.on('value', (snapshot) => {
        const data = snapshot.val();
        console.log("firebase data", data);
        for (let key in data) {
            const msg = data[key];
            console.log(msg);
            if (myPass == msg.passcode)
                renderMsg(msg);
        }
    });
};

document.getElementById("send-btn").addEventListener('click', e => {
    findMsg(document.getElementById("passcode").value);
});
findMsg(document.getElementById("passcode").value);