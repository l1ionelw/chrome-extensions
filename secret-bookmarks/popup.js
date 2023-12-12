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

const view_all = document.getElementById("view-all")
view_all.addEventListener("click", () => {
    chrome.tabs.create({url: chrome.runtime.getURL("index.html")});
})

const render = document.getElementById("render")
chrome.tabs.query({}, function (tabs) {
    main(tabs)
});

function main(tabs) {
    tabs.forEach(function (tab) {
        render.innerHTML += `<button name="${tab.id}" id="open-tab">${tab.title}</button><br><br>`
        console.log(tab.title + " " + tab.url)
    })
    addEventListeners()
}

function addEventListeners() {
    const open_tabs = document.querySelectorAll("#open-tab")
    open_tabs.forEach(function (tab) {
        tab.addEventListener("click", () => {
            buttonClickHandler(tab)
        })
    })
}

function buttonClickHandler(tabElement) {
    chrome.tabs.get(parseInt(tabElement.name), (tab) => {
        addTabInfo(tab)
    })
}

function addTabInfo(tab) {
    const title = tab.title
    const url = tab.url
    console.log(title + " " + url)
    chrome.storage.local.set({[title]: url}).then(() => {
        console.log("Value is set");
        var render = document.getElementById("render")
        render.innerHTML += `<p>Toggled Website: ${title}</p>`
    });
}
