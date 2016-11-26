import { cityCollection } from '../../../lib/collections/city.js'

Template.EditCity.onCreated( () => {

  var currentUser = Meteor.userId();
        if(currentUser){
            // logged-in
        } else {
            // not logged-in
            FlowRouter.go('/')

        }
});


Template.EditCity.helpers({
	data:()=> {
		const _id = FlowRouter.getParam('city_id')
		const data = cityCollection.findOne({_id})
		return data
	}
})


Template.EditCity.events ({
	'click #edit-city-button ' : function(e) {
		//getting the  fields as well as the data
		const cityID = FlowRouter.getParam('city_id')
        const _id = FlowRouter.getParam('province_id')
        const cityField = $('#city')
        const city = cityField.val()
         

        //calling the meteor method to save
        Meteor.call('update-city',cityID, city)
            //log the  console to see if it has been saved
        console.log('added')
            //clearing the entries
        cityField.val = ''                
            //redirects to main page for 
        FlowRouter.go(`/city/${_id}`)
	}
})