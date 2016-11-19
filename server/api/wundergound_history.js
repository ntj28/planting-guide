Meteor.methods ({
	'getDataWunderground' : function (date, province,city,awsID) {
    //http://api.wunderground.com/api//history_20161115/q/pws:ICALABAR18.json
    
    // Construct the API URL
    securityKey = "60d1fb8794e7bb72"
    const apiUrl = 'http://api.wunderground.com/api/60d1fb8794e7bb72/history_' + date +'/q/pws:' + awsID +'.json';
    //const apiUrl = 'http://api.wunderground.com/api/60d1fb8794e7bb72/history_' + date +'/q/' + province + '/' + city + '.json';
    console.log('trial', apiUrl);
    // query the API
    var response = HTTP.get(apiUrl);
    return response;
    //console.log(response)

	 
	},

	 
})