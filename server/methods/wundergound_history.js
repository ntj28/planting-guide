Meteor.methods ({
	'getDataWunderground' : function (date, province,city) {
    //after ng q / weather station id
    
    // Construct the API URL
    const apiUrl = 'http://api.wunderground.com/api/60d1fb8794e7bb72/history_' + date +'/q/' + province + '/' + city + '.json';
    console.log('trial', apiUrl);
    // query the API
    var response = HTTP.get(apiUrl);
    return response;
    console.log(response)

	 
	},

	 
})