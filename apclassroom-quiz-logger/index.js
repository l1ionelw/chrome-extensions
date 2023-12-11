const render = document.getElementById("render")
let db;
let quiz_name;
chrome.storage.local.get(null, function (result) {
    db = result
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
    render.innerHTML += `<h1 id="quiz-name">${json.MCQ_NAME}</h1>`
    render.innerHTML += `<h2>Score: ${json.MCQ_SCORE}</h2>`
    render.innerHTML += `<h2> Started: ${json.MCQ_START_TIME} </h2>`
    render.innerHTML += `<h2> Finished: ${json.MCQ_END_TIME} </h2>`
    const questions = json.QUESTIONS
    const total_questions = questions.length
    for (let i = 0; i < questions.length; i++) {
        console.log(i)
        var detail = questions[i]
        var question_number = `<div><h1>Question ${i + 1}/${total_questions}</h1>`
        var image_title = `<h3>${detail.IMAGE_TITLE == null ? "" : detail.IMAGE_TITLE}</h3>`
        var image_embed = detail.IMAGE_URL == null ? "" : `<img style="max-width: 60%; margin: auto" src="${detail.IMAGE_URL}" alt="image">`
        var question = `<p style="font-size: large">${detail.QUESTION}</p>`
        var question_choices = ""
        for (var x of detail.CHOICES) {
            const buttonId = (i + 1) + ":::" + x.charAt(7)
            question_choices += `<button id="${buttonId}">${x.slice(6)}</button><br><br>`
        }
        render.innerHTML += `<div id='question-${i + 1}'>` + question_number + image_title + image_embed + question + question_choices + "</div>"
    }
    buttonsEventListener()
}

function buttonsEventListener() {
    const buttons = document.getElementsByTagName("button");
    const buttonPressed = e => {
        console.log(e.target.id);
        var quiz_name = document.getElementById("quiz-name").innerText
        var question_number = parseInt(e.target.id.split(":::")[0])
        var question_choice = e.target.id.split(":::")[1]
        console.log(question_number + " " + question_choice)
        var question_details = db[quiz_name].QUESTIONS[question_number - 1]
        if (question_details.ANSWER === question_choice) {
            e.target.outerHTML += "<p>Correct answer!</p>"
        }
    }
    for (let button of buttons) {
        button.addEventListener("click", buttonPressed);
    }
}

function wipeAll() {
    render.innerHTML = ""
}

