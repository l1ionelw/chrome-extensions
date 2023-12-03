let API_KEY = "AIzaSyAyAw09VgCFlU3qXdnWb-PGXQsWfApW4C8"

const raw = document.querySelectorAll("span.TermText.notranslate.lang-zh-CN");
console.log(raw)
for (const raw1 of raw) {
    let elementText = raw1.innerText
    let translation = translate(elementText)
    console.log(elementText + " | " + translation)
}

function translate(text) {
    const encodedParams = new URLSearchParams();
    encodedParams.append("q", text);
    encodedParams.append("target", "zh-TW");
    encodedParams.append("source", "zh");

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Accept-Encoding': 'application/gzip',
            'X-RapidAPI-Key': API_KEY,
        },
        body: encodedParams
    };

    fetch('https://translation.googleapis.com/language/translate/v2', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
}
