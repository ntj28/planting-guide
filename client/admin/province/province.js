import { province  } from '../../../lib/collections/province.js'

Template.Province.helpers ({
	provinces: function() {
		const provinces = province.find({}).fetch()
		return provinces
	}
	 
})


Template.Province.events({
	'click #add-province-button' : function (e) {
		 FlowRouter.go('/addProvince')
	}
})