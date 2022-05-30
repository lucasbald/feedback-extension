document.getElementById("proceed").addEventListener("click", () => {
  const spreadsheetURL = document.getElementById("spreadsheetURL").value;

  chrome.runtime.sendMessage({ message: 'post_spreadsheet_url', spreadsheetURL });
  chrome.storage.sync.set({
    spreadsheetURL
  });
  window.location.href = '../formFeedback.html';
});

document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.sync.get(['spreadsheetURL'], elements => {
    document.getElementById("spreadsheetURL").value = elements['spreadsheetURL'];
  })
});
