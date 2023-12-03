const button = document.getElementById("get-questions");
let infodiv = document.getElementById("test");
button.addEventListener("click", async () => {
    await (async () => {
        const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
        await chrome.tabs.sendMessage(tab.id, {getQuestions: "true"}).then(function (response) {
            infodiv.innerHTML += response.success + "<br>";
            if (response.success === "true") {
                infodiv.innerHTML += "getting questions success<br>";
            }
            else if (response.success === "false") {
                infodiv.innerHTML += "getting questions failed<br>";
            } else {
                infodiv.innerHTML += "an unknown error occurred<br>";
            }
        })
    })();
});