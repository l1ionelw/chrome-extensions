
setTimeout(() => {
  setupObserver();
  doFilter();
}, 3750);

function setupObserver() {
  const observer = new MutationObserver(() => {
    doFilter();
  });
  console.log("SETTING UP OBSERVERS");
  const viewPlayerHeader = document.querySelector("header.RI_header");
  console.log(viewPlayerHeader);
  observer.observe(viewPlayerHeader, { attributes: true, childList: true, subtree: true });
}

function doFilter() {
  console.log("FILTERING");
  // remove red score at questions tab
  let allWrongDivs = document.querySelectorAll(".text-red-500");
  for (var x of allWrongDivs) {
    x.remove();
  }
  // remove green score at questions tab
  let allRightDivs = document.querySelectorAll(".text-green-500");
  for (var x of allRightDivs) {
    x.remove();
  }

  // remove performance at top when clicking inside question
  let performanceIcon = document.querySelector(".performance_icon");
  if (performanceIcon) performanceIcon.remove();

  // remove icons from answer choices
  let wrongIcon = document.querySelector("div.icon.--incorrect");
  if (wrongIcon) wrongIcon.remove();

  let rightIcon = document.querySelector("div.icon.--correct");
  if (wrongIcon) rightIcon.remove();

  let incorrectWrapper = document.querySelector('.AccessibilityWrapper.--incorrect');
  if (incorrectWrapper) incorrectWrapper.classList.remove("--incorrect");
  incorrectWrapper.addEventListener("click", () => { incorrectWrapper.classList.add("--incorrect") })

  let correctWrapper = document.querySelector('.AccessibilityWrapper.--correct');
  if (correctWrapper) correctWrapper.classList.remove("--correct");
  correctWrapper.addEventListener("click", () => { correctWrapper.classList.add("--correct") })

  let chosen = document.querySelector("div.letter.--chosen");
  if (chosen) chosen.classList.remove("--chosen");

  // remove feedback at bottom
  let feedbackDivs = document.querySelectorAll(".LearnosityDistractor");
  for (var x of feedbackDivs) {
    x.remove();
  }
}