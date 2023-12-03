chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        console.log(request)
        if (request.getQuestions === "true") {
            mcq_details = main();
            sendResponse({success: "true"});
        }
    }
);

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

// on page load immediately run data collection
/* waitForElm('.flex.flex-row.justify-around.my-12').then((elm) => {
    setTimeout(entry, 2000)
});

*/
function entry() {
    console.log("AP CLASSROOM LOADED")
    const mcqDetails = main();
}

function sendToServiceWorker(data) {
    (async () => {
        const response = await chrome.runtime.sendMessage({data: data});
        console.log(response);
    })();
}

function main() {
    const MCQ_NAME = document.getElementById("mainHeading").innerText
    const MCQ_DATE_DATA = document.getElementsByClassName("header_date justify-center flex mobile:flex-col mt-8 gap-12 text-gray-700 gap-14 items-center")[0].querySelectorAll('span')
    const MCQ_START_TIME = MCQ_DATE_DATA[1].innerText
    const MCQ_END_TIME = MCQ_DATE_DATA[3].innerText
    const MCQ_SCORE = document.getElementsByClassName("dark performance-score")[0].innerText
    const MCQ_INDEPTH = click_questions()
    const returnval = {
        "MCQ_NAME": MCQ_NAME,
        "MCQ_START_TIME": MCQ_START_TIME,
        "MCQ_END_TIME": MCQ_END_TIME,
        "MCQ_SCORE": MCQ_SCORE,
        "QUESTIONS": MCQ_INDEPTH,
    }
    console.log(returnval)
    return returnval
}

function click_questions() {
    const things = document.querySelectorAll(".text-gray-700")
    for (var x of things) {
        if (x.innerText === "Questions") {
            x.click()
            console.log("element clicked")
            break;
        }
    }
    // click on first mcq question
    waitForElm(".hover-question-parent").then(() => {
        const questions = document.querySelector(".hover-question-parent")
        let everything = null;
        questions.click()
        // wait for whole page to load, then parse all divs
        waitForElm(".mcq-option").then(() => {
                setTimeout(function () {
                    allstuff = fulldatacollectionEntry();
                }, 2000);
            }
        )
    })
    return allstuff
}

function fulldatacollectionEntry() {
    let results = document.querySelector(".main-column").querySelectorAll(".teacher-item-preview")
    // console.log(results)
    var everything = []
    for (var x of results) {
        // console.log(x)
        const IMAGE_TITLE = getImageTitle(x)
        const IMAGE_URL = getImageUrl(x)
        const QUESTION = getQuestion(x)
        // console.log(IMAGE_TITLE)
        // console.log(IMAGE_URL)
        // console.log(QUESTION)
        let statuses = getChoices(x)
        const toPush = {
            "IMAGE_TITLE": IMAGE_TITLE,
            "IMAGE_URL": IMAGE_URL,
            "QUESTION": QUESTION,
            "CHOICES": statuses.choices,
            "ANSWER": statuses.answer,
            "RATIONALE": statuses.rationale
        }
        everything.push(toPush)
    }
    console.log(everything)
    return everything
}

function getImageTitle(x) {
    try {
        x = x.querySelector(".standalone_image").querySelector(".title").innerText
    } catch (err) {
        x = null
    }
    return x
}

function getImageUrl(x) {
    try {
        x = x.querySelector(".standalone_image").querySelector("img").src
    } catch (err) {
        x = null
    }
    return x
}

function getQuestion(x) {
    try {
        //x = x.querySelector(".lrn_question").querySelector(".stem_paragraph").innerText
        x = x.querySelector(".lrn_question").innerText
    } catch (err) {
        x = null
    }
    return x
}

function getChoices(x) {
    // GET CHOICES & CORRECT ANSWER
    let allChoices
    try {
        allChoices = x.querySelectorAll(".mcq-option")
    } catch (err) {
        return null;
    }
    let choices = []
    let answer = null;
    for (var y of allChoices) {
        if (y.querySelector(".icon").outerHTML.includes("--correct")) {
            answer = y.ariaLabel.charAt(7)
        }
        choices.push(y.ariaLabel.split("Rationale")[0])
    }

    // GET RATIONALE FOR EACH CHOICE
    let rationale_divs
    try {
        rationale_divs = x.querySelectorAll(".LearnosityDistractor")
    } catch (err) {
        return null
    }
    let rationale_explanations = []
    for (let i = 0; i < rationale_divs.length; i++) {
        rationale_explanations.push({[choices[i].charAt(7)]: rationale_divs[i].innerText.slice(8)})
    }

    return {
        "choices": choices,
        "answer": answer,
        "rationale": rationale_explanations,
    }
}
