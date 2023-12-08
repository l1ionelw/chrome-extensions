const render = document.getElementById("render")
chrome.storage.local.get(null, function (result) {
    main(result)
});

function main(all) {
    console.log("main function loaded")
    console.log(all)
    for (var x in all) {
        console.log(x)
        let id = x.replaceAll(" ", "_")
        let render_button = '<button id=' + id + ">" + x + "</button><br><br>"
        console.log(id)
        render.innerHTML += render_button
    }
    var hello = document.querySelectorAll("button")
    console.log(hello)
    for (var y of hello) {
        y.addEventListener("click", () => {
            handleButton(y.id);
        })
    }
}

function handleButton(id) {
    console.log("button clicked id: " + id)
    let quiz_name = id.replaceAll("_", " ")
    console.log(quiz_name)
    chrome.storage.local.get([quiz_name], function(result) {
        console.log(result[quiz_name])
    });
}

