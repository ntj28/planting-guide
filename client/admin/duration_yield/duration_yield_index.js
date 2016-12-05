import { durationYields } from '../../../lib/collections/duration_yield.js'

Template.DurationYields.onCreated( () => {

  var currentUser = Meteor.userId();
        if(currentUser){
            // logged-in
            Meteor.subscribe('durationYield')
        } else {
            // not logged-in
            FlowRouter.go('/')

        }
});

Template.DurationYields.helpers ({
	durationYields: function() {
		const _id = FlowRouter.getParam('location_id')
		const cropDurationYield   = durationYields.find({locationID: _id }, {sort:{weekNo: 1 }});  // ).sort({weekNo: 1})
		return cropDurationYield
	}
	 
})


Template.DurationYields.events({
	'click #add-duration-yield-button' : function (e) {
		const id = FlowRouter.getParam('location_id')		
		FlowRouter.go(`/addDurationYield/${id}`)
	},

	'click #exit-duration-yield-button' : function (e) {		
		 FlowRouter.go(`/location`)
	}

})