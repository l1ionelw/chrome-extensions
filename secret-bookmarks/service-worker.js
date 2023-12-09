chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        if (request.saveLocalStorage) {
            console.log(request.saveLocalStorage)
            var title = request.saveLocalStorage[0].split(":::")[0]
            var url = request.saveLocalStorage[0].split(":::")[1]
            console.log(title)
            console.log(url)
            chrome.storage.local.set({[title]: url}).then(() => {
                console.log("Value is set");
            });
            sendResponse({status: "success"});
        }
    }
);