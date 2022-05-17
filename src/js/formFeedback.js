const fieldsName = [
  'people',
  'action',
  'cluster',
  'reference',
  'date'
];

document.getElementById("feedbackForm").addEventListener("submit", function () {
  const fields = {
    people: document.getElementById("people").value,
    action: document.getElementById("action").value,
    cluster: document.getElementById("cluster").value,
    reference: document.getElementById("reference").value,
    date: document.getElementById("date").value
  }

  chrome.runtime.sendMessage({ message: 'post_form', fields});
  chrome.storage.sync.remove(fieldsName);
})

document.addEventListener("DOMContentLoaded", () => {
  for (let fieldName of fieldsName) {
    let field = document.getElementById(fieldName);
    field.oninput = updateData;
  }

  chrome.storage.sync.get(elements => {
    for (let fieldName of fieldsName) {
      if (elements[fieldName] !== undefined) {
        let field = document.getElementById(fieldName);
        field.value = elements[fieldName];
      }
    }
  });
});

function updateData(event) {
  chrome.storage.sync.set({[this.id]: this.value});
}
