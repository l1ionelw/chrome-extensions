const render = document.getElementById("render")
chrome.storage.local.get(null, function (result) {
    main(result)
});

function main(all) {
    console.log("main function loaded")
    console.log(all)
    for (var x in all) {
        let id = x.replaceAll(" ", "_")
        let render_button = '<button id=' + id + ">" + x + "</button><br><br>"
        render.innerHTML += render_button
    }
    var hello = document.querySelectorAll("button")
    for (let i = 0; i < hello.length; i++) {
        hello[i].addEventListener("click", () => {
            handleButton(hello[i].id)
        })
    }
}

function handleButton(id) {
    let quiz_name = id.replaceAll("_", " ")
    console.log(quiz_name)
    chrome.storage.local.get([quiz_name], function (result) {
        console.log(result[quiz_name])
        wipeAll()
        renderInfo(result[quiz_name])
    });
}

function renderInfo(json) {
    console.log("rendering info")
    render.innerHTML += `<h1>${json.MCQ_NAME}</h1>`
    render.innerHTML += `<h2>Score: ${json.MCQ_SCORE}</h2>`
    render.innerHTML += `<h2> Started: ${json.MCQ_START_TIME} </h2>`
    render.innerHTML += `<h2> Finished: ${json.MCQ_END_TIME} </h2>`
    const questions = json.QUESTIONS
    const total_questions = questions.length
    for (let i = 0; i < questions.length; i++) {
        var detail = questions[i]
        render.innerHTML += `<h1>Question ${i + 1}/${total_questions}</h1>`
        render.innerHTML += `<h3>${detail.IMAGE_TITLE == null ? "" : detail.IMAGE_TITLE}</h3>`
        render.innerHTML += `<img style="max-width: 60%; margin: auto" src="${detail.IMAGE_URL}" alt="image">`
        render.innerHTML += `<p style="font-size: large">${detail.QUESTION}</p>`
        for (var x of detail.CHOICES) {
            const buttonId = (i + 1) + ":::" + x.charAt(7)
            render.innerHTML += `<button id="${buttonId}">${x.slice(6)}</button><br><br>`
        }
    }
    buttonsEventListener()
}

function buttonsEventListener() {
    const buttons = document.getElementsByTagName("button");
    const buttonPressed = e => {
        console.log(e.target.id);
    }
    for (let button of buttons) {
        button.addEventListener("click", buttonPressed);
    }
}

function wipeAll() {
    render.innerHTML = ""
}

