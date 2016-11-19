Template.AddThreshold.events ({
	'click #add-threshold ' : function (e) {
		
		const cropField = $('#crop')
        const crop = cropField.val()
        const daysField = $('#days')
        const days = daysField.val()
        const amountRainfallField = $('#amountRainfall')
        const amountRainfall = amountRainfallField.val()
		
		Meteor.call ('add-thresholds',crop,days,amountRainfall)
		console.log ("added")
		cropField.val = " "
		daysField.val = " "
		amountRainfallField.val = " "

		FlowRouter.go ('/threshold')

	},
	'click #cancel-threshold ' : function (e) {
        
        FlowRouter.go('/threshold')

    }
})