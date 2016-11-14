Template.AddCity.events ({
	'click #SaveCity ' : function (e) {
		const cityField = $('#city')
		const city = cityField.val()
		const provinceID = FlowRouter.getParam('province_id')
		Meteor.call ('add-city',provinceID, city)
		console.log ("added")
		cityField.val = " "

		FlowRouter.go(`/city/${provinceID}`)

	},
	'click #Cancel ' : function (e) {
		const provinceID = FlowRouter.getParam('province_id')
		FlowRouter.go(`/city/${provinceID}`)

	}
})