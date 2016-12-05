Template.AddCrop.onCreated( () => {

  var currentUser = Meteor.userId();
        if(currentUser){
            // logged-in
        } else {
            // not logged-in
            FlowRouter.go('/')

        }
});

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