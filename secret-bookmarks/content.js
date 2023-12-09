console.log("On website")
console.log(document.title)
console.log(window.location.href)

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        if (request.tabRequest) {
            var responseString = document.title + ":::" + window.location.href
            console.log("message recieved")
            console.log(responseString)
            sendResponse({tabResponse: responseString});
        }
    }
);