Meteor.methods ({
	'getDataWunderground' : function (date, province,city,awsID) {
    
    // Construct the API URL
    securityKey = "60d1fb8794e7bb72"
    const apiUrl = 'http://api.wunderground.com/api/60d1fb8794e7bb72/history_' + date +'/q/pws:' + awsID +'.json';
    // query the API
    var response = HTTP.get(apiUrl);
    return response;
    

	 
	},

	 
})