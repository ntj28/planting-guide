import { location } from '../../../lib/collections/locations.js'

Template.EditLocation.onCreated( () => {

  var currentUser = Meteor.userId();
        if(currentUser){
            // logged-in
        } else {
            // not logged-in
            FlowRouter.go('/')

        }
});

Template.EditLocation.helpers({
	data:()=> {
		const _id = FlowRouter.getParam('location_id')
		const data = location.findOne({_id})
		return data
	}
})


Template.EditLocation.events ({
	'click #editLocationButton ' : function(e) {
		//getting the  fields as well as the data
		const locationId = FlowRouter.getParam('location_id')
        const projectNameField = $('#projectName')
        const projectName = projectNameField.val()
        const institutionField = $('#insttitution')
        const insttitution = institutionField.val()
        const latitudeField = $('#latitude')
        const latitude = latitudeField.val()
        const longitudeField = $('#longitude')
        const longitude = longitudeField.val()
        const cityField = $('#city')
        const city = cityField.val()
        const provinceField = $('#province')
        const province = provinceField.val()
        const awsField = $('#awsID')
        const awsID  = awsField.val() 

        //calling the meteor method to save
        Meteor.call('update-location',locationId, projectName, insttitution, latitude, longitude, city, province,awsID)
            //log the  console to see if it has been saved
        console.log('added')
            //clearing the entries
        projectNameField.val = ''
        institutionField.val = ''
        latitudeField.val = ''
        longitudeField.val = ''
        cityField.val = ''
        provinceField.val = ''
            //redirects to main page for 
        FlowRouter.go('/location')
	}
})