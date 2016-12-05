import { weekNoCollection  } from '../../../lib/collections/week_no.js'

Template.SetUpWeekNumber.onCreated( () => {

  var currentUser = Meteor.userId();
        if(currentUser){
            // logged-in
            Meteor.subscribe('WeekNo')
            
        } else {
            // not logged-in
            FlowRouter.go('/')

        }
});


Template.SetUpWeekNumber.events ({
	'click #set-up-week ' : function (e) {

		let dateCurrent  = new Date()
		let yearCurrent = dateCurrent.getFullYear();
		let highestDate = weekNoCollection.findOne({})	
		let maxDate = new Date(highestDate.date)
		let maxYear = maxDate.getFullYear();

		if(yearCurrent != maxYear ){

			//deletes all entries in mongo week number
			weekNoCollection.remove({})

			let date = year + "-01-01"			
			let dateStart = new Date(date)

			

			for (let week =1; week<=52 ; week++){

				for (let day =1; day <=7; day ++) {

					
					let dateFormatted  = dateStart.toISOString().slice(0,10).replace(/-/g,"-");
					Meteor.call('add-week-no',dateFormatted, week)				
					dateStart.setDate(dateStart.getDate() + 1)

					if (dateFormatted ==yearCurrent + '-12-29') {

						for (let x = 1 ; x<=2 ; x++){						
							dateFormatted  = dateStart.toISOString().slice(0,10).replace(/-/g,"-");
							Meteor.call('add-week-no',dateFormatted, week)							
							dateStart.setDate(dateStart.getDate() + 1)

						}	 

					}			

				}		

			}

		}

		

			
		 

	} 
})