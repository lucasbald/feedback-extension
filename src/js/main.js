document.getElementById("feedbackForm").addEventListener("submit", function () {
  const fields = {
    people: document.getElementById("people").value,
    action: document.getElementById("action").value,
    cluster: document.getElementById("cluster").value,
    reference: document.getElementById("reference").value,
    date: document.getElementById("date").value
  }

  chrome.runtime.sendMessage({ message: 'post_form', fields});
})