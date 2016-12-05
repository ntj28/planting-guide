Meteor.methods ({
	'getDataWundergroundForecast' : function (province,city,awsID) {
    //http://api.wunderground.com/api//history_20161115/q/pws:ICALABAR18.json
    
    securityKey = "60d1fb8794e7bb72"
    // Construct the API URL http://api.wunderground.com/api/60d1fb8794e7bb72/forecast10day/q/Ilocos_Norte/Batac.json
    const apiUrl = 'http://api.wunderground.com/api/60d1fb8794e7bb72/forecast10day/q/pws:' + awsID +'.json';
    // query the API
    var response = HTTP.get(apiUrl);
    return response;    

	 
	},

	 
})