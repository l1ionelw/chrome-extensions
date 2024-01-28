waitForElm(".panel").then(() => {
    let login = document.getElementById("login")
    try {
        login = login.innerText
    } catch (e) {
        modify()
    }
})

function modify() {
    let panel = document.querySelector(".panel")
    let contest_button = panel.querySelector('input')
    contest_button.remove()

    let panel_text = panel.outerHTML
    panel_text = panel_text.split("NOTE:")
    panel_text[1] = "NOTE:" + panel_text[1]
    let append_text = "<h3>Your time for this contest has ended. Come back in a few days to view your score.</h3>"
    panel.outerHTML = panel_text[0] + append_text + panel_text[1]
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