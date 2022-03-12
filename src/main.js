// document.getElementById("oauth-button").addEventListener("click", function () {
//   alert("oi");
//   console.log("front");
//   // chrome.runtime.sendMessage({ message: "get_auth_token" });
//   chrome.runtime.sendMessage({ message: "spread_sheet" });
// });

// document.getElementById("feedbackForm").onsubmit = function () {
//   alert("Button clicked!");
// };

document.getElementById("feedbackForm").addEventListener("submit", function () {
  alert('bla')

  const fields = {
    people: document.getElementById("people").value,
    action: document.getElementById("action").value,
    cluster: document.getElementById("cluster").value,
    reference: document.getElementById("reference").value,
    date: document.getElementById("date").value
  }

  chrome.runtime.sendMessage({ message: "post_form", fields});
})