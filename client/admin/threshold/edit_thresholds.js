import { thresholdsCollection } from '../../../lib/collections/thresholds.js'

Template.EditThreshold.onCreated( () => {

  var currentUser = Meteor.userId();
        if(currentUser){
            // logged-in
        } else {
            // not logged-in
            FlowRouter.go('/')

        }
});


Template.EditThreshold.helpers({
	data:()=> {
		const _id = FlowRouter.getParam('threshold_id')
		const data = thresholdsCollection.findOne({_id})
		return data
	}
})


Template.EditThreshold.events ({
	'click #edit-threshold ' : function(e) {
		//getting the  fields as well as the data
        const _id = FlowRouter.getParam('threshold_id')
		const cropField = $('#crop')
        const crop = cropField.val()
        const daysField = $('#days')
        const days = daysField.val()
        const amountRainfallField = $('#amountRainfall')
        const amountRainfall = amountRainfallField.val()
        
        Meteor.call ('update-thresholds',_id,crop,days,amountRainfall)
        console.log ("added")
        cropField.val = " "
        daysField.val = " "
        amountRainfallField.val = " "

        FlowRouter.go ('/threshold')        
	}
})
