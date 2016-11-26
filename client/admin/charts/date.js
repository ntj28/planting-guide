Template.EnterDate.onCreated( () => {

  var currentUser = Meteor.userId();
        if(currentUser){
            // logged-in
        } else {
            // not logged-in
            FlowRouter.go('/')

        }
});

Template.EnterDate.events({
	'click #date-button ' : function (e) {
		const awsID = FlowRouter.getParam('awsID')
		const locationID = FlowRouter.getParam('locationID')

		const dateField = $('#date') 
        const date =  dateField.val()  
		FlowRouter.go(`/chart/${awsID}/${date}/${locationID}`)

	}
})