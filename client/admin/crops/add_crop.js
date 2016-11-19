Template.AddCrop.events ({
	'click #SaveCrop ' : function (e) {
		const cropField = $('#crop')
		const crop = cropField.val()
		Meteor.call ('add-crop',crop)
		console.log ("added")
		cropField.val = " "
		FlowRouter.go ('/crop')

	},
	'click #Cancel ' : function (e) {
        
        FlowRouter.go('/crop')

    }
})