import { cityCollection  } from '../../../lib/collections/city.js'

Template.AddCity.onCreated( () => {

  var currentUser = Meteor.userId();
        if(currentUser){
            // logged-in
            Meteor.subscribe('cities')
        } else {
            // not logged-in
            FlowRouter.go('/')

        }
});

Template.AddCity.events ({
	'click #SaveCity ' : function (e) {

		const cityField = $('#city')
		const city = cityField.val()
		const provinceID = FlowRouter.getParam('province_id')
		let exist = cityCollection.findOne({ city : {
                     $regex : new RegExp(city, "i") } })

		if (exist == null){
			Meteor.call ('add-city',provinceID, city)			
			FlowRouter.go(`/city/${provinceID}`)
		} else {
			alert("City is already in the collection");			
		}
		cityField.val = " "

				
		

	},
	'click #Cancel ' : function (e) {
		const provinceID = FlowRouter.getParam('province_id')
		FlowRouter.go(`/city/${provinceID}`)

	}
})