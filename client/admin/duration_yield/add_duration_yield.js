import { location } from '../../../lib/collections/locations.js'
import { province } from '../../../lib/collections/province.js'
import { cityCollection } from '../../../lib/collections/city.js'
Template.AddDurationYield.helpers ({

	dataProvince: function() {
        const dataProvince  = province.find({}).fetch()         
        return dataProvince
    },

    dataCity: function() {
        const dataCity  = cityCollection.find({}).fetch()         
        return dataCity
    }
})

Template.AddDurationYield.events({
	'change #provinceSelection' : function(e){
        //get the value of  the  province field
        const provinceField = $('#provinceSelection') 
        const provinceID =  provinceField.val()    

        //gets the city field and empty its options
        const cityField = $('#citySelection')
        cityField.empty()
        //retrieves the list of city as specified by what province is selected
        const dataCity  = cityCollection.find({provinceID: provinceID}).fetch() 
        //adds options to the select tag
        dataCity.forEach((item) => {
            cityField.append("<option>" + item.city + "</option>");
        });   

    },

	'click #add-yield-button' : function (e) {
		//getting the entries
		const locationID = FlowRouter.getParam('location_id')
		const locationField = $("#location")
		const location = locationField.val()
		const weekNoField = $("#weekNo")
		const weekNo = weekNoField.val()
		const startDateField = $("#startDate")
		const startDate = startDateField.val()
		const endDateField = $("#endDate")
		const endDate = endDateField.val()
		const yieldField = $("#yield")
		const yields = yieldField.val()
		const cityField = $('#citySelection')
        const city = cityField.val()               
        const province = $('#provinceSelection').find('option:selected').text()

		Meteor.call('add-duration-yields',locationID,province,city,weekNo,startDate,endDate,yields)
		console.log("added")
		locationField.val = " "
		weekNoField.val = " "
		startDateField.val = " "
		endDateField.val = " "
		yieldField.val = " "

		FlowRouter.go(`/duration_yield/${locationID}`)

	},

	'click #Cancel ' : function (e) {
		const locationID = FlowRouter.getParam('location_id')
		FlowRouter.go(`/duration_yield/${locationID}`)

	}

})