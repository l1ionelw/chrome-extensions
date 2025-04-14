let string = "<h1 style='color:black'>get to work little boy</h1><h1 style='color:white'>get to work little boy</h1>"
window.onload = function () {
  setInterval(() => {
    var deleteAll = document.querySelector("body");
    deleteAll.innerHTML = string;
  }, 1000);
}
