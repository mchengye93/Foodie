
'use strict';

const yelp = require('yelp-fusion');

// Place holder for Yelp Fusion's API Key. Grab them
// from https://www.yelp.com/developers/v3/manage_app
const apiKey = 'vilsC_dxi8j0B-zlZe5mJ4ia3E_12HK4-Q4xeOnYQchP8671Q2iFRFcCD3KhgA70UidkPlRUkbI0TyQSsUGzPm3D_pity25C9mcFpRpFpDmGJ_HqkE_yewIVkWQOXXYx';

const searchRequest = {
  term:'San Tung',
  location: 'san francisco, ca',
 
};

const client = yelp.client(apiKey);

client.search(searchRequest).then(response => {
  const firstResult = response.jsonBody.businesses[0];
  const prettyJson = JSON.stringify(firstResult, null, 4);
  console.log(prettyJson);
}).catch(e => {
  console.log(e);
});

