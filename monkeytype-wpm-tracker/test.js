let url = "http://98.42.152.32:5000/googleapi/sheets/append/"
console.log("hello!")
let datasend = JSON.stringify('{"wpm":"80","accuracy":"93%","mode":"test type time 15 english","raw_wpm":"84","characters":"100/1/0/0","consistency":"64%"}')
console.log(datasend)
fetch(url, {
    method: "POST",
    body: datasend,
    mode: "no-cors"
}).then(function(text) {
    console.log(text)
}).then((response)=> {
    console.log(response)
})