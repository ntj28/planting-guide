Template.ProvinceItem.onCreated( () => {

  var currentUser = Meteor.userId();
        if(currentUser){
            // logged-in
        } else {
            // not logged-in
            FlowRouter.go('/')

        }
});

Template.ProvinceItem.events({
	'click #edit-province-button' : function(e) {
		FlowRouter.go(`/editProvince/${this._id}`)
	},

	'click #delete-province-button' :  function (e) {
		Meteor.call('delete-province', this._id)
		Meteor.call('delete-city',this._id )
	},

	'click #view-city' : function(e){
		FlowRouter.go(`/city/${this._id}`)
	}

	 
})