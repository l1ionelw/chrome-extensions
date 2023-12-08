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

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
        console.log(request.data)
        if (request.data != null) {
            saveLocalStorage(request.data)
            sendResponse({response: "Data saved"})
        }
        return false;
    }
);

function saveLocalStorage(data) {
    console.log("saving to local storage")
    chrome.storage.local.set({[data['MCQ_NAME']]: data}).then(() => {
        console.log("data saved")
    })
}

function getLocalStorage() {
    chrome.storage.sync.get(null, function(items) {
        var allKeys = Object.keys(items);
        console.log(allKeys);
    });
}

function clearLocalStorage() {
    chrome.storage.local.clear(function () {
        var error = chrome.runtime.lastError;
        if (error) {
            console.error(error);
        }
    });
}