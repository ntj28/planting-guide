import { cropYields } from '../../lib/collections/crop_yield.js'

Meteor.methods ({
	'add-crop-yield' : function (locationID, cropType, cropYield) {
		cropYields.insert({
			locationID : locationID,
			cropType :  cropType,
			cropYield : cropYield
		})
	},

	'delete-crop-yield': function(id){
        cropYields.remove({
            _id:id
        })
    },

    'update-crop-yield' : function(_id, cropType,cropYield) {
        cropYields.update (
            {_id},//filters to be updaated
            {
                $set: {
                    cropType:cropType,
                    cropYield: cropYield                    
                }
            },

                {upsert : true}
            
        )

    },
})