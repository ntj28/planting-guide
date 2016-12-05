Template.AddVariety.onCreated( () => {

  var currentUser = Meteor.userId();
        if(currentUser){
            // logged-in
        } else {
            // not logged-in
            FlowRouter.go('/')

        }
});

Template.AddVariety.events ({
	'click #SaveVariety ' : function (e) {
		const varietyField = $('#variety')
		const variety = varietyField.val()
		const cropID = FlowRouter.getParam('crop_id')
		Meteor.call ('add-variety',cropID, variety)
		console.log ("added")
		varietyField.val = " "

		FlowRouter.go(`/cropVariety/${cropID}`)

	},
	'click #Cancel ' : function (e) {
		const cropID = FlowRouter.getParam('crop_id')
		FlowRouter.go(`/cropVariety/${cropID}`)

	}
})