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

        //update the locations entries
         Meteor.call('update-province-location',provinceOld,provinceEntry)


         
        //calling the meteor method to save to province collections
        Meteor.call('update-province',provinceID, provinceEntry)
            //log the  console to see if it has been saved
        console.log('added')
            //clearing the entries
        provinceField.val = ''
         
            //redirects to main page for 
        FlowRouter.go('/province')
	}
})