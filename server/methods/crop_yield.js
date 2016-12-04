import { cropYields } from '../../lib/collections/crop_yield.js'

Meteor.methods ({
	'add-crop-yield' : function (locationID, cropType,cropVariety,cropYield) {
		cropYields.insert({
			locationID : locationID,
			cropType :  cropType,
            cropVariety: cropVariety,
			cropYield : cropYield
		})
	},

	'delete-crop-yield': function(id){
        cropYields.remove({
            _id:id
        })
    },

    'update-crop-yield' : function(_id, cropType,cropVariety,cropYield) {
        cropYields.update (
            {_id},//filters to be updaated
            {
                $set: {
                    cropType:cropType,
                    cropVariety: cropVariety,
                    cropYield: cropYield                    
                }
            },

                {upsert : true}
            
        )

    },

    'update-crop-type' : function(cropType, cropTypeNew) {
        cropYields.update (
            {cropType},//filters to be updaated
            {
                $set: {
                         
                    cropType:cropTypeNew,
                                                            
                }
            },

                { multi: true}
            
        )

    },

    'update-variety-history' : function(cropVariety, cropVarietyNew) {
        cropYields.update (
            {cropVariety},//filters to be updaated
            {
                $set: {
                         
                    cropVariety:cropVarietyNew,
                                                            
                }
            },

                { multi: true}
            
        )

    },
})