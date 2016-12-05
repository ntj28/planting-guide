import { province } from '../../../lib/collections/province.js'

Template.EditProvince.onCreated( () => {

  var currentUser = Meteor.userId();
        if(currentUser){
            // logged-in
            Meteor.subscribe('province')
        } else {
            // not logged-in
            FlowRouter.go('/')

        }
});

Template.EditProvince.helpers({
	data:()=> {
		const _id = FlowRouter.getParam('province_id')
		const data = province.findOne({_id})
		return data
	}
})


Template.EditProvince.events ({
	'click #update-province-button ' : function(e) {
		//getting the  fields as well as the data
		const provinceID = FlowRouter.getParam('province_id')
        const provinceField = $('#province')
        const provinceEntry = provinceField.val()

        //retrieve the old province name
        const data = province.findOne({_id:provinceID})
        provinceOld = (data && data.province)

        let exist = province.findOne({ province : {
                     $regex : new RegExp(provinceEntry, "i") } })

        if (exist == null){

            //update the locations entries
            Meteor.call('update-province-location',provinceOld,provinceEntry)
            
            //calling the meteor method to save to province collections
            Meteor.call('update-province',provinceID, provinceEntry)
            
            //clearing the entries
            provinceField.val = ''
             
            //redirects to main page for 
            FlowRouter.go('/province')

         } else {
            alert("Province is already in the collection");         
        }
	}
})