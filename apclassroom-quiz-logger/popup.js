const button = document.getElementById("get-questions");
let infodiv = document.getElementById("test");
let externalPage_button = document.getElementById("local-page");
button.addEventListener("click", async () => {
    // button clicked, send message to content script to start parsing
    await (async () => {
        const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
        chrome.tabs.sendMessage(tab.id, {getQuestions: "true"})
    })();
});
externalPage_button.addEventListener("click",() => {
    chrome.tabs.create({ url: chrome.runtime.getURL("index.html") });
})

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        if (request.logging) {
            infodiv.innerHTML += request.logging += "<br>"
        }
    }
);