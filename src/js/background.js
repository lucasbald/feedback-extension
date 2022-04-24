/* global chrome */

const API_KEY = 'AIzaSyCJ_vChC1Da_TnhAG3qnBPcNTttxmuYiko';

const defaultCallback = () => {
  console.log('Command not found!');
};

const getAuthToken = () => {
  chrome.identity.getAuthToken({ interactive: true }, function (token) {
    console.log(token);
  });
};

const getSpreadsheet = () => {
  chrome.identity.getAuthToken({ interactive: true }, function (token) {
    const fetch_url = `https://sheets.googleapis.com/v4/spreadsheets/1EEivp2ETb-SvN5S3fKt8Cg7qyP9aasmlArtrKzNtuL4/values/A1?key=${API_KEY}`;
    const fetch_options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    };

    fetch(fetch_url, fetch_options)
      .then((res) => res.json())
      .then((res) => console.log(res));
  });
};

const postForm = (request) => {
  const RANGE = 'feedback!A3:E4';
  const SPREADSHEET_ID = '1SjXKfl-Hn7W8suslgtY5eG2V1gXJlCopp3F-tDYUGZw';
  const QUERY_PARAM = '?valueInputOption=RAW';
  const { people, action, cluster, reference, date } = request.fields;
  const status = 'Not Mentioned';

    chrome.identity.getAuthToken({ interactive: true }, function (token) {
      const fetch_url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}:append${QUERY_PARAM}`;
      const fetch_options = {
        headers: {
          Authorization: `Bearer ${token}`
        },
        method: 'POST',
        body: JSON.stringify({
          range: RANGE,
          values: [
            [
              people,
              action,
              cluster,
              reference,
              date,
              status
            ]
          ]
        })
      }

      fetch(fetch_url, fetch_options)
        .then((res) => res.json())
        .then((res) => console.log(res))
  });
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'get_auth_token') getAuthToken();
  else if (request.message === 'spread_sheet') getSpreadsheet();
  else if (request.message === 'post_form') postForm(request);
  else defaultCallback();

  return true;
});
