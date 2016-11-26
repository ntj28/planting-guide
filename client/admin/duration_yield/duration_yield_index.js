import { durationYields } from '../../../lib/collections/duration_yield.js'

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
		console.log(id)	
		//kulang p
		FlowRouter.go(`/addDurationYield/${id}`)
	},

	'click #exit-duration-yield-button' : function (e) {
		//const id = FlowRouter.getParam('location_id')
		//console.log(id)	
		//kulang p
		 FlowRouter.go(`/location`)
	}

})