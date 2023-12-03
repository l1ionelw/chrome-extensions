// Find all anchor tags on the page
const links = document.getElementsById("a.masterTooltip");
console.log(links);
// Loop through all anchor tags
for (let i = 0; i < links.length; i++) {
  const link = links[i];
  console.log(link[i]);
  console.log(link);
  console.log(link.getAttribute("class"));
  // Check if the title attribute of the anchor tag is "Time Limit Exceeded"
  if (link.title === "Time limit exceeded" || link.getAttribute("class") == "masterToolTip") {
  console.log("found one");
    // Find the closest ancestor div element with class "trial-result" and change its class to "trial-status-yes"
    const ancestorDiv = link.closest(".trial-result");
    if (ancestorDiv) {
      ancestorDiv.classList.remove("trial-status-no");
      ancestorDiv.classList.add("trial-status-yes");
    }
  }
}
