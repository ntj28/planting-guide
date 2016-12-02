import { weekNoCollection  } from '../../../lib/collections/week_no.js'

Template.editWeekNumber.onCreated( () => {

  var currentUser = Meteor.userId();
        if(currentUser){
            // logged-in
            Meteor.subscribe('WeekNo')
        } else {
            // not logged-in
            FlowRouter.go('/')

        }
});

Template.editWeekNumber.helpers({
	data:()=> {
		const _id = FlowRouter.getParam('date_id')
		const data = weekNoCollection.findOne({_id})
		return data
	}
})


Template.editWeekNumber.events ({
	'click #edit-week-button ' : function(e) {

		//getting the  fields as well as the data
                const _id = FlowRouter.getParam('date_id')
        	const dateField = $('#date')
                const date = dateField.val()
                const weekField = $('#weekNo')
                const week = weekField.val()
               
                Meteor.call ('update-week-no',_id,date,week)
                console.log ("edited")
                dateField.val = " "
                weekField.val = " "
                

                FlowRouter.go ('/setUpWeek')        
	}
})
