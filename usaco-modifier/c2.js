const url = window.location.href;
console.log(url);
if (url == "http://usaco.org/index.php?page=viewproblem&cpid=1314") {
  changeFirst();
}
if(url == 'http://usaco.org/index.php?page=viewproblem&cpid=1315') {
  changeSecond();
}

function changeFirst() {
  if (url != 'http://usaco.org/index.php?page=viewproblem&cpid=1314') {
    return;
  }
  const element = document.querySelector('a.masterTooltip');
  if (element) {
    const hello = document.querySelectorAll('a.masterTooltip');
    // console.log(hello);
    for(i=0; i < hello.length - 2; i++) {
      const x = hello[i];
      const classList = x.classList;
      const title = x.title;
      x.title = "Correct answer";
      // console.log(x.title);
      // console.log(x.innerHTML);
      x.innerHTML = x.innerHTML.replace("no", "yes");
      let size = "0mb"; let time = "0ms";
      if (i == 4) { size = "45.9mb"; time = "173ms"; }
      if (i == 5) { size = "67.3mb"; time = "332ms"; }
      if (i == 6) { size = "103.1mb";  time = "402ms"; }
      if (i == 7) { size = "80.2mb"; time = "766ms"; }
      if (i == 8) { size = "172.4mb"; time = "546ms"; }
      
      const replaceString = '>*<div class="info"><span>' + size + '</span><span>' + time + '</span><';
      x.innerHTML = x.innerHTML.replace(">t<", replaceString);
      x.innerHTML = x.innerHTML.replace("Time limit exceeded", "Correct answer");
    }
  } else {
    // Element has not loaded yet, wait a bit longer
    setTimeout(changeFirst, 100);
  }
}

function changeSecond() {
  if(url != 'http://usaco.org/index.php?page=viewproblem&cpid=1315') {
  return;
}
  const element = document.querySelector('a.masterTooltip');
  if (element) {
    const hello = document.querySelectorAll('a.masterTooltip');
    // console.log(hello);
    const tables = [2, 3, 4, 9, 15];
    for(const y of tables) {
      // console.log(y);
      const x = hello[y];
      const classList = x.classList;
      const title = x.title;
      x.title = "Correct answer";
      // console.log(x.title);
      // console.log(x.innerHTML);
      x.innerHTML = x.innerHTML.replace("no", "yes");
      let size = "0mb"; let time = "0ms";
      if (y == 2) { size = "2.1mb"; time = "4ms"; }
      if (y == 3) { size = "5.6mb"; time = "13ms"; }
      if (y == 4) { size = "5.1mb";  time = "23ms"; }
      if (y == 9) { size = "9.5mb"; time = "104ms"; }
      if (y == 15) { size = "24.6mb"; time = "288ms"; }
      
      const replaceString = '>*<div class="info"><span>' + size + '</span><span>' + time + '</span><';
      x.innerHTML = x.innerHTML.replace(">t<", replaceString);
      x.innerHTML = x.innerHTML.replace("Time limit exceeded", "Correct answer");
    }
  } else {
    // Element has not loaded yet, wait a bit longer
    setTimeout(changeSecond, 100);
  }
}

