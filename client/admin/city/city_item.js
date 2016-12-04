Template.CityItem.onCreated( () => {

  var currentUser = Meteor.userId();
        if(currentUser){
            // logged-in
        } else {
            // not logged-in
            FlowRouter.go('/')

        }
});

Template.CityItem.events({
	'click #edit-city-button' : function(e) {
		const _id = FlowRouter.getParam('province_id')		 
		FlowRouter.go(`/edit_city/${this._id}/${_id}`)
	},

	'click #delete-city-button' :  function (e) {
		//delete from city collection
		Meteor.call('delete-city', this._id)

		//delete from locations collection 
		Meteor.call('delete-location-city', this.city)

	}
	
	 
})