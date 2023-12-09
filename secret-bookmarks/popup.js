// chrome.storage.local.get(console.log)
/*
chrome.storage.local.clear(function() {
    var error = chrome.runtime.lastError;
    if (error) {
        console.error(error);
    }
    // do something more
});
chrome.storage.sync.clear();
 */

const save_bookmark = document.getElementById("save-bookmark")
const view_all = document.getElementById("view-all")

save_bookmark.addEventListener("click", async () => {
    console.log("saving bookmark")
    askTabInfo()
})
view_all.addEventListener("click", () => {
    console.log("opening bookmarks html page")
})
view_all.addEventListener("click",() => {
    chrome.tabs.create({ url: chrome.runtime.getURL("index.html") });
})

function askTabInfo() {
    (async () => {
        const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
        const response = await chrome.tabs.sendMessage(tab.id, {tabRequest: "query"});
        const details = response.tabResponse.split(":::")
        const title = details[0]
        const url = details[1]
        chrome.storage.local.set({[title]: url}).then(() => {
            console.log("Value is set");
            var render = document.getElementById("render")
            render.innerHTML += `<p>Toggled Website: ${title}</p>`
        });
    })();
}
