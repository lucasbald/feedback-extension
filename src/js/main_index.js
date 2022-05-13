document.getElementById("proceed").addEventListener("submit", () => {
  const spreadsheetURL = document.getElementById("spreadsheetURL").value;

  chrome.runtime.sendMessage({ message: 'post_spreadsheet_url', spreadsheetURL });
});