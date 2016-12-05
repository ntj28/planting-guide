import { weekNoCollection } from '../../lib/collections/week_no.js'

Meteor.methods ({
	'add-week-no' : function (date, weekNo) {
		weekNoCollection.insert({
			date : date,
			weekNo: weekNo						 
		})
	} ,

	'update-week-no' : function(_id,date,weekNo) {
        weekNoCollection.update (
            {_id:_id},//filters to be updaated
            {
                $set: {
                    date:date,
                    weekNo :  weekNo
                                       
                }
            },

                {upsert : true}
            
        )

    },

    
	'delete-week-no': function(id){
        weekNoCollection.remove({
            _id:id
        })
    },

	 
})