var cfb = require('cfb.js');

var defaultClient = cfb.ApiClient.instance;

// Configure API key authorization: ApiKeyAuth
var ApiKeyAuth = defaultClient.authentications['ApiKeyAuth'];
ApiKeyAuth.apiKey = "Bearer vQvF/YyT0brXEi7igtFTBeOYvlQp8K3GpiV46IDCsDrelVWFm5P3L7DNgZpkC02K";

var api = new cfb.BettingApi()

var opts = { 
   //'gameId' : 401282154,// {Number} Game id filter
  'year': 2021, // {Number} Year/season filter for games
   'week': 13, // {Number} Week filter
//   'seasonType': "regular", // {String} Season type filter (regular or postseason)
  //'team': "Alabama", // {String} Team
   //'home': "Alabama", // {String} Home team filter
//   'away': "away_example", // {String} Away team filter
//   'conference': "conference_example" // {String} Conference abbreviation filter
};
api.getLines(opts).then(function(data) {
  console.log('API called successfully. Returned data: ' + JSON.stringify(data));
}, function(error) {
  console.log(error);
});

api.getLines(opts)