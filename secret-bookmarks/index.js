const debug = false
const render = document.getElementById("render")
console.log("index loaded")
document.getElementById("submit").addEventListener("click", () => {
    const password = document.getElementById('password').value
    console.log(password)
    if (password === "359356" || debug === true) {
        console.log("password correct")
        wipe_all()
        render_outline()
    }
})
document.onkeydown = function (e) {
    e = e || window.event;
    if (e.keyCode === 13) {
        document.getElementById("submit").click()
    }
}

function register_eventListeners() {
    console.log("event listeners registered")
    document.getElementById("clear-all").addEventListener("click", () => {
        console.log("clear all pressed")
        clear_all_bookmarks()
    })
    const deleteButtons = document.querySelectorAll("#delete")
    for (var x of deleteButtons) {
        console.log(x)
        x.addEventListener("click", delete_bookmarks)
    }
    document.getElementById("export").addEventListener("click", () => {
        console.log("exporting bookmarks")
        chrome.storage.local.get(null, function (result) {
            export_all(JSON.stringify(result))
        });
    })
    document.getElementById("import").addEventListener("click", () => {
        console.log("importing from file")
        let imported_bookmarks = document.getElementById("import-input").value
        console.log(imported_bookmarks)
        imported_bookmarks = JSON.parse(imported_bookmarks)
        console.log(imported_bookmarks)
        for (var x in imported_bookmarks) {
            console.log(x + imported_bookmarks[x])
            chrome.storage.local.set({[x]: imported_bookmarks[x]}).then(() => {
                render.innerHTML += `<p>Value added</p>`
            });
        }
    })
}

function wipe_all() {
    render.innerHTML = "";
}

function render_outline() {
    render.innerHTML += "<h2>Bookmarks</h2>"
    render.innerHTML += "<button id='clear-all'>Clear All Bookmarks</button>"
    render.innerHTML += "<br><br><button id='import'>Import Bookmarks</button>"
    render.innerHTML += "<br><input type='text' id='import-input'/>"
    render.innerHTML += "<br><br><button id='export'>Export All Bookmarks</button><br><br>"
    console.log("outline elements added")
    chrome.storage.local.get(null, function (result) {
        render_bookmarks(result)
    });
}

function render_bookmarks(json) {
    console.log(json)
    for (var key in json) {
        console.log(key)
        console.log(json[key])
        const title_html = `<p><strong>${key}</strong></p>`
        const delete_bookmark = `<button id="delete" name="${key}">Delete Bookmark</button><br>`
        const url_html = `<a style="padding-bottom: 10px" href="${json[key]}" target="_blank">${json[key]}</a>`
        render.innerHTML += title_html + delete_bookmark + url_html
    }
    register_eventListeners()
}

function clear_all_bookmarks() {
    chrome.storage.local.clear(function () {
        var error = chrome.runtime.lastError;
        if (error) {
            console.error(error);
        }
    })
    wipe_all()
    render_outline()
}

const delete_bookmarks = e => {
    console.log(e.target.name)
    chrome.storage.local.remove(e.target.name, function () {
        console.log("bookmark removed")
    });
    wipe_all()
    render_outline()
}

function export_all(json_export) {
    function download(file, text) {
        var element = document.createElement('a');
        element.setAttribute('href',
            'data:text/json;charset=utf-8, '
            + encodeURIComponent(text));
        element.setAttribute('download', file);
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    download("bookmarks.json", json_export);
}

