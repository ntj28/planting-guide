import { durationYields } from '../../../lib/collections/duration_yield.js'

Template.EditDurationYield.helpers({
	data:()=> {
		const _id = FlowRouter.getParam('yield_id')
		const data = durationYields.findOne({_id})
		return data
	}
})


Template.EditDurationYield.events ({
	'click #update-duration-yield-button ' : function(e) {
		//getting the  fields as well as the data
        const locationID = FlowRouter.getParam('location_id')
	const durationYieldID = FlowRouter.getParam('yield_id')
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
        

        Meteor.call('update-duration-yield',durationYieldID,locationID,weekNo,startDate,endDate,yields)
                
        
        console.log("added")
        locationField.val = " "
        weekNoField.val = " "
        startDateField.val = " "
        endDateField.val = " "
        yieldField.val = " "

        FlowRouter.go(`/duration_yield/${locationID}`)
	}
})