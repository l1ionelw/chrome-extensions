console.log("[MonkeyType Progress] Extension started v1.07")
var change = document.getElementById("result")

let mutationRepeat = 0;
var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        console.log("test finished! getting wpm data")
        data = gatherdata();
        console.log(data)
        sendRequest(data)
        mutationRepeat++
    })
    console.log(mutationRepeat)
})

var config = {attributes: true, characterData: true}
console.log("observer started")
observer.observe(change, config)


function sendRequest(data) {
    let url = "http://98.42.152.32:5000/googleapi/sheets/append/"
    let datasend = JSON.stringify(data)
    console.log(datasend)
    fetch(url, {
        method: "POST",
        body: datasend,
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        mode: "no-cors"
    })
}
function gatherdata() {
    var data = [];
    console.log("gathering data");
    let wpm = document.getElementsByClassName("group wpm")[0].innerText.replace("wpm\n", "")
    let accuracy = document.getElementsByClassName("group acc")[0].innerText.replace("acc\n", "")
    let test_type = document.getElementsByClassName("group testType")[0].innerText.replace(/\n/g, " ")
    let raw_wpm = document.getElementsByClassName("group raw")[0].innerText.replace("raw\n", "")
    let characters = document.getElementsByClassName("group key")[0].innerText.replace("characters\n", "")
    let consistency = document.getElementsByClassName("group flat consistency")[0].innerText.replace("consistency\n", "")
    let json = {
        "wpm": wpm,
        "accuracy": accuracy,
        "mode": test_type,
        "raw_wpm": raw_wpm,
        "characters": characters,
        "consistency": consistency,
    }
    return json
}