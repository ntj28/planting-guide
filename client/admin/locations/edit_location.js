import { location } from '../../../lib/collections/locations.js'
import { province } from '../../../lib/collections/province.js'
import { cityCollection } from '../../../lib/collections/city.js'

Template.EditLocation.onCreated( () => {

  var currentUser = Meteor.userId();
        if(currentUser){
            // logged-in
             Meteor.subscribe('locations')
             Meteor.subscribe('province')
             Meteor.subscribe('cities')
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


Meteor.autorun(() => {

    const _id = FlowRouter.getParam('location_id')
    const data = location.findOne({_id})

    //populate the  province select
    const provinceData  = province.find({}).fetch()
    const provinceField = $('#provinceSelections')
    provinceField.empty()
    provinceData.forEach((item) => {
        if ((data && data.province) == item.province) {
            provinceField.append("<option selected='selected' value =" + item._id +">" + item.province + "</option>");
        } else {
            provinceField.append("<option value =" + item._id +">" + item.province + "</option>");
        } 
    }); 

    //populate the city select
    const cityField = $('#citySelections')
    cityField.empty()
    const provinceID =  provinceField.val()
    const cityData  = cityCollection.find({provinceID: provinceID}).fetch()
    //adds options to the select tag
    
    cityData.forEach((item) => {
        if ((data && data.city) == item.city) {
            cityField.append("<option selected='selected' value =" + item.city +">" + item.city + "</option>");
        } else {
            cityField.append("<option value =" + item.city +">" + item.city + "</option>");
        } 

          
    });
 
    
});


Template.EditLocation.events ({

    'change #provinceSelections' : function(e){
        
        //get the value of  the  province field
        const provinceField = $('#provinceSelections') 
        const provinceID =  provinceField.val()
               
        //gets the variety field and empty its options
        const cityField = $('#citySelections')
        cityField.empty()
        //retrieves the list of varieties as specified by what crop is selected        
        const cityData  = cityCollection.find({provinceID: provinceID}).fetch() 
        //adds options to the select tag
        cityData.forEach((item) => {
            cityField.append("<option value =" + item.city +">" + item.city + "</option>");
        }); 
    },

	'click #editLocationButton ' : function(e) {
		//getting the  fields as well as the data
		const locationId = FlowRouter.getParam('location_id')
        //retrieve the old AWSID         
        const data = location.findOne({_id:locationId})
        //get the new AWSID
        const awsField = $('#awsID')
        const awsID  = awsField.val() 

        
        


        //update the locations collection
        const projectNameField = $('#projectName')
        const projectName = projectNameField.val()
        const institutionField = $('#insttitution')
        const insttitution = institutionField.val()
        const latitudeField = $('#latitude')
        const latitude = latitudeField.val()
        const longitudeField = $('#longitude')
        const longitude = longitudeField.val()
        const province = $('#provinceSelections').find('option:selected').text()        
        const city = $('#citySelections').find('option:selected').text()
       
         let exist = location.findOne({ city : {
                     $regex : new RegExp(city, "i") },
                     province : {
                     $regex : new RegExp(province, "i") },
                     latitude: latitude,
                     longitude:longitude 
                      })
         if (exist == null){ 
            
            //calling the meteor method to save
            Meteor.call('update-location',locationId, projectName, insttitution, latitude, longitude, city, province,awsID)

            //update the old AWSID of amount of rainfall to ensure data integrity
            AWSIDold = (data && data.awsID)
            
            Meteor.call('update-awsID',AWSIDold,awsID)
                 
            //clearing the entries
            projectNameField.val = ''
            institutionField.val = ''
            latitudeField.val = ''
            longitudeField.val = ''
            //redirects to main page for 
            FlowRouter.go('/location')

        } else {
            alert("Location is already in the collection");         
        }
	}
})