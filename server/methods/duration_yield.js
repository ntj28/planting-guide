import { durationYields } from '../../lib/collections/duration_yield.js'

Meteor.methods ({
	'add-duration-yields' : function (locationID,province,city, weekNo, startingDate, endingDate, yields) {
		durationYields.insert ({
			locationID : locationID,
			province: province,
            city:city,
			weekNo : weekNo,
			startingDate: startingDate,
			endingDate: endingDate,
			yield:yields

		})
	},
	'delete-duration-yield': function(id){
        durationYields.remove({
            _id:id
        })
    },

    'update-duration-yield' : function(_id,locationID, province,city,weekNo,startingDate,endingDate,yields) {
         durationYields.update (
            {_id},//filters to be updaated
            {
                $set: {
                     locationID : locationID,
                     province: province,
                     city:city,
                     weekNo: weekNo,
                     startingDate : startingDate,
                     endingDate : endingDate,
                     yield :yields

                }
            },

                {upsert : true}
            
        )

    },
})


