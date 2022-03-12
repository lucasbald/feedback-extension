const API_KEY = "AIzaSyCJ_vChC1Da_TnhAG3qnBPcNTttxmuYiko";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "get_auth_token") {
    chrome.identity.getAuthToken({ interactive: true }, function (token) {
      console.log("back");
      console.log(token);
    });
  } else if (request.message === "spread_sheet") {
    chrome.identity.getAuthToken({ interactive: true }, function (token) {
      const fetch_url = `https://sheets.googleapis.com/v4/spreadsheets/1EEivp2ETb-SvN5S3fKt8Cg7qyP9aasmlArtrKzNtuL4/values/A1?key=${API_KEY}`;
      const fetch_options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: 'GET'
      };

      fetch(fetch_url, fetch_options)
        .then((res) => res.json())
        .then((res) => console.log(res));
    });
  } else if (request.message === "post_form") {
    const { people, action, cluster, reference, date } = request.fields;
    console.log(people);
    console.log(action);
    console.log(cluster);
    console.log(reference);
    console.log(date);
  }
});
