document.getElementById("oauth-button").addEventListener("click", function () {
  alert("oi");
  console.log("front");
  chrome.runtime.sendMessage({ message: "get_auth_token" });
});
