import { thresholdsCollection  } from '../../lib/collections/thresholds.js'

Meteor.methods ({
	'add-thresholds' : function(crop,days,rainfall) {
		thresholdsCollection.insert ({
			crop: crop,
			days:days,
			rainfall:rainfall

		})
	},

	'delete-thresholds': function(id){
        thresholdsCollection.remove({
            _id:id
        })
    },

    'update-thresholds' : function(_id, crop,days,rainfall) {
        thresholdsCollection.update (
            {_id},//filters to be updaated
            {
                $set: {
                    crop:crop,
                    days:days,
                    rainfall:rainfall


                }
            },

                {upsert : true}
            
        )

    },
	


})


