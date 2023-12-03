console.log("zen mode tracker")
var element = document.querySelector('[mode="zen"]')
var wordbank = document.getElementById("words");
console.log(element)


const config = {attributes: true, childList: true};
let typed = []
let last_size = -1;
const wordaction = (mutationList, observer) => {
    for (const mutation of mutationList) {
        if (element.className.includes("active")) {
            allwords = wordbank.innerText;
            let wordsArray = allwords.split("\n")
            wordsArray.pop()
            if (last_size === -1) {
                last_size = wordsArray.length;
                typed.push()
            }
            console.log(wordsArray)
        }
    }
}


const observer = new MutationObserver(wordaction);
console.log("observing")
observer.observe(wordbank, config);