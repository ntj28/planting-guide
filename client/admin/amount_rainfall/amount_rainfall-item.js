Template.RainfallItem.onCreated( () => {

  var currentUser = Meteor.userId();
        if(currentUser){
        } else {
            // not logged-in
            FlowRouter.go('/')

        }
});

Template.RainfallItem.events({
	'click #edit-rainfall-button' : function (e) {		
		const id = this._id
		const awsID = this.awsID		
		FlowRouter.go(`/editRainfall/${id}/${awsID}`)
	},
	'click #delete-rainfall-button' : function (e) {
		//delete fron rainfall collection	
		Meteor.call('delete-rainfall-data', this._id)
		
		
	}

})

