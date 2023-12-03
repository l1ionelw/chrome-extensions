// chrome.storage.local.get(console.log)

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

function getLocalStorage(key) {
    chrome.storage.local.get([key]).then((result) => {
        console.log("Value currently is " + result.key);
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