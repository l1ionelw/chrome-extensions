setTimeout(main, 2000)

function main() {
    register_keybinds()
    save_set()
}

function mouseMove(x, y) {
    fetch(`http://127.0.0.1:5000/mouse/${x}/${y}/`, {
        mode: "no-cors",
        credentials: 'include'
    }).then()
}

function keyboard_type(content) {
    fetch("http://127.0.0.1:5000/type/", {
        mode: "no-cors",
        credentials: 'include',
        method: "POST",
        body: JSON.stringify({"value": content})
    }).then()
}

function save_set() {
    let terms = document.querySelectorAll(".SetPageTerms-term")
    if (terms.length === 0) {
        console.log("no terms")
        return
    }
    console.log(terms)
    let termsArr = []
    for (let x of terms) {
        const keyvalue = x.querySelectorAll("span")
        const toPush = keyvalue[0].textContent.replaceAll(",", "") + "|||" + keyvalue[1].textContent.replaceAll(",", "")
        termsArr.push(toPush)
    }
    localStorage.setItem("quizlet-set", termsArr.toString())
}

async function do_write() {
    const terms = localStorage.getItem("quizlet-set").split(",")
    console.log(terms)
    let progress = parseInt(document.querySelector(".WriteProgress-value").textContent)
    image_remove()
    while (progress > 0) {
        let prompt = document.querySelector(".FormattedText")
        if (prompt === undefined || prompt === null) {
            console.log("Query not found, sleeping")
            await sleep(1000)
            continue
        }
        prompt = prompt.ariaLabel.replaceAll(",", "")
        image_remove()
        for (let x of terms) {
            x = x.split("|||")
            x[1] = x[1].replaceAll(",", "")
            if (x[1] === prompt) {
                mouseMove(711, 341)
                await sleep(500)
                keyboard_type(x[0])
                await sleep(500)
                keyboard_type("ENTER")
                break
            }
        }
        progress = parseInt(document.querySelector(".WriteProgress-value").textContent)
        await sleep(2000)
    }
    console.log("TASK DONE")
}

async function do_spell() {
    const terms = localStorage.getItem("quizlet-set").split(",")
    console.log(terms)
    let progress = parseInt(document.querySelector(".SpellControls-progressValue").textContent.replace("%", ""))
    while (progress < 100) {
        let prompt = document.querySelector(".UIDiv.SpellQuestionView-inputPrompt--plain")
        if (prompt === null || prompt === undefined) {
            let continue_button = document.querySelector(".UIButton.UIButton--hero")
            if (continue_button !== null) {
                if (continue_button.querySelector(".UIButton-wrapper").textContent.toLowerCase() !== "start over") {
                    continue_button.click()
                    await sleep(1000)
                    continue
                }
            }
            console.log("Query not found, sleeping")
            if (progress >= 100) {
                break
            }
            await sleep(1000)

        }
        prompt = prompt.textContent.replaceAll(",", "")
        for (let x of terms) {
            x = x.split("|||")
            x[1] = x[1].replaceAll(",", "")
            if (x[1] === prompt) {
                mouseMove(570, 235)
                await sleep(500)
                keyboard_type(x[0])
                await sleep(500)
                keyboard_type("ENTER")
                break
            }
        }
        progress = parseInt(document.querySelector(".SpellControls-progressValue").textContent.replace("%", ""))
        await sleep(2000)
    }
    console.log("TASK DONE")
}

function register_keybinds() {
    document.addEventListener("keypress", (e) => {
        if (e.key === "w") {
            do_write().then()
        }
        if (e.key === "r") {
            do_spell()
        }
    })
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function image_remove() {
    let images = document.getElementsByTagName('img');
    let l = images.length;
    for (let i = 0; i < l; i++) {
        images[0].parentNode.removeChild(images[0]);
    }
}