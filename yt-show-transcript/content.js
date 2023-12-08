waitForElm(".yt-spec-button-shape-next.yt-spec-button-shape-next--outline.yt-spec-button-shape-next--call-to-action.yt-spec-button-shape-next--size-m").then((elm) => {
    console.log("element found and ready")
    click_transcript()
})
waitForElm(".yt-spec-button-view-model").then((elm)=> {
    console.log("video loaded")
    insert_button()
})
function insert_button() {
    console.log("inserting button")
    var element = document.getElementById("columns")
    console.log(element)
    var toAdd = "<h1>test</h1>"
    // element.innerHTML = toAdd + element.innerHTML
}

function click_transcript() {
    // click button to show transcript immediately
    console.log("extension loaded")
    var transcript = document.querySelector(".yt-spec-button-shape-next.yt-spec-button-shape-next--outline.yt-spec-button-shape-next--call-to-action.yt-spec-button-shape-next--size-m")
    console.log(transcript)
    transcript.click()
}

function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve(document.querySelector(selector));
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}