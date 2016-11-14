import { cityCollection  } from '../../../lib/collections/city.js'

Template.City.helpers ({
	city: function() {
		const _id = FlowRouter.getParam('province_id')
		const city = cityCollection.find({provinceID: _id }).fetch()
		return city
	}
	 
})


Template.City.events({
	'click #add-city-button' : function (e) {
		const _id = FlowRouter.getParam('province_id')
		FlowRouter.go(`/addCity/${_id}`)
	},

	'click #done-button' : function (e) {
		//const id = FlowRouter.getParam('location_id')
		//console.log(id)	
		//kulang p
		 FlowRouter.go(`/province`)
	}
})