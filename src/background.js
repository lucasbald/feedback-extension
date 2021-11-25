const API_KEY = "";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "get_auth_token") {
    chrome.identity.getAuthToken({ interactive: true }, function (token) {
      console.log("back");
      console.log(token);
    });
  }
});
