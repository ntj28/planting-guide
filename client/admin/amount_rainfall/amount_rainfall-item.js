Template.RainfallItem.onCreated( () => {

  var currentUser = Meteor.userId();
        if(currentUser){
            // logged-in
        } else {
            // not logged-in
            FlowRouter.go('/')

        }
});

Template.RainfallItem.events({
	'click #edit-rainfall-button' : function (e) {
		//const id = FlowRouter.getParam('location_id')
		const id = this._id
		const awsID = this.awsID
		//console.log(id)	
		//kulang p
		FlowRouter.go(`/editRainfall/${id}/${awsID}`)
	}

})

