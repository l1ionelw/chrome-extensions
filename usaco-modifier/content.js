const url = window.location.href
if (url === "http://www.usaco.org/index.php?page=viewproblem2&cpid=1155") {
    console.log("changing question")
    const data = {
        "1": ["45.0mb", "69ms"],
        "2": ["45.0mb", "69ms"],
        "3": ["45.0mb", "69ms"],
        "4": ["45.0mb", "69ms"],
        "5": ["45.0mb", "69ms"],
    }
    change_results(data)
}

function change_results(data) {
    waitForElm(".masterTooltip").then(() => {
        const trials = document.querySelectorAll(".masterTooltip")
        for (var i = 0; i < trials.length; i++) {
            var replace_value = data[i + 1]
            if (replace_value === undefined) {
                continue
            }
            var symbol = trials[i].querySelector(".res-symbol")
            var info = trials[i].querySelector(".info").querySelectorAll("span")
            symbol.innerText = "*"
            info[0].innerText = replace_value[0]
            info[1].innerText = replace_value[1]
        }
    })
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
