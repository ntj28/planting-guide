import { cityCollection } from '../../../lib/collections/city.js'

Template.EditCity.onCreated( () => {

  var currentUser = Meteor.userId();
        if(currentUser){
            // logged-in
            Meteor.subscribe('cities')
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

        //retrieve the old city name
        const data = cityCollection.findOne({_id:cityID})
        cityOld = (data && data.city)
        //update the  location entries
        let exist = cityCollection.findOne({ city : {
                     $regex : new RegExp(city, "i") } })
        if (exist == null){
            Meteor.call ('update-city-location',cityOld,city)
            //calling the meteor method to save to city COllection
            Meteor.call('update-city',cityID, city)  
            cityField.val = ''                
            //redirects to main page for 
            FlowRouter.go(`/city/${_id}`)
        } else {
            alert("City is already in the collection");         
        }


	},

    'click #Cancel ' : function (e) {
        const provinceID = FlowRouter.getParam('province_id')
        FlowRouter.go(`/city/${_id}`)

    }
})