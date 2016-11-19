import { location } from '../../../lib/collections/locations.js'
import { province } from '../../../lib/collections/province.js'
import { cityCollection } from '../../../lib/collections/city.js'

Template.AddLocation.helpers ({
    dataProvince: function() {
        const dataProvince  = province.find({}).fetch()         
        return dataProvince
    },

    dataCity: function() {
        const dataCity  = cityCollection.find({}).fetch()         
        return dataCity
    }     
})


Template.AddLocation.events({
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

    'click #addLocationButton': function(e) {
        //getting the  fields as well as the data
        const projectNameField = $('#projectName')
        const projectName = projectNameField.val()
        const institutionField = $('#insttitution')
        const insttitution = institutionField.val()
        const latitudeField = $('#latitude')
        const latitude = latitudeField.val()
        const longitudeField = $('#longitude')
        const longitude = longitudeField.val()
        const cityField = $('#citySelection')
        const city = cityField.val() 
        const awsField = $('#awsID')
        const awsID  = awsField.val()               
        const province = $('#provinceSelection').find('option:selected').text() 

        //calling the meteor method to save
        Meteor.call('add-location', projectName, insttitution, latitude, longitude, city, province,awsID)
            //log the  console to see if it has been saved
        console.log('added')
            //clearing the entries
        projectNameField.val = ''
        institutionField.val = ''
        latitudeField.val = ''
        longitudeField.val = ''
        
            //redirects to main page for 
        FlowRouter.go('/location')
    },
    'click #Cancel ' : function (e) {
        
        FlowRouter.go('/location')

    }
})