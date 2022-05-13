/* global chrome */

const API_KEY = 'AIzaSyCJ_vChC1Da_TnhAG3qnBPcNTttxmuYiko';
// 'https://docs.google.com/spreadsheets/d/1UBEid46AWIBr3sXT2F6AKYKVXNeVutZhJKZeXK84mUk/edit?usp=sharing';

let spreadsheetId = ''

const defaultCallback = () => {
  console.log('Command not found!');
};

const getAuthToken = () => {
  chrome.identity.getAuthToken({ interactive: true }, function (token) {
    console.log(token);
  });
};

const postForm = request => {
  const RANGE = 'feedback!A3:F3';
  const SPREADSHEET_ID = spreadsheetId;
  const QUERY_PARAM = '?valueInputOption=RAW';
  const { people, action, cluster, reference, date } = request.fields;
  const status = 'Not Mentioned';

  console.log(SPREADSHEET_ID);

  chrome.identity.getAuthToken({ interactive: true }, function (token) {
    const fetch_url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}:append${QUERY_PARAM}`;
    const fetch_options = {
      headers: {
        Authorization: `Bearer ${token}`,
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
        ],
      }),
    };

    fetch(fetch_url, fetch_options)
      .then(res => res.json())
      .then(res => console.log(res));
  });
};

const postSpreadsheetUrl = request => {
  spreadsheetId = request.spreadsheetURL.split('/')[5];

  console.log(spreadsheetId);
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'get_auth_token') getAuthToken();
  else if (request.message === 'post_form') postForm(request);
  else if (request.message === 'post_spreadsheet_url') postSpreadsheetUrl(request);
  else defaultCallback();

  return true;
});
