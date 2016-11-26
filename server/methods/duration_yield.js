import { durationYields } from '../../lib/collections/duration_yield.js'

Meteor.methods ({	'add-duration-yields' : function (locationID,cropType,weekNo,yields) {
		durationYields.insert ({
            cropType:cropType,			
            locationID:locationID,
			weekNo : weekNo,			 
			yield:yields

		})
	},
	'delete-duration-yield': function(id){
        durationYields.remove({
            _id:id
        })
    },

    'update-duration-yield' : function(locationID,cropType,weekNo,yields) {
         durationYields.update (
            {weekNo:weekNo},//filters to be updaated
            {
                $set: {

                    cropType:cropType,
                    locationID: locationID,
                    weekNo : weekNo,            
                    yield:yields

                }
            },

                {upsert : true}
            
        )

    },
})


