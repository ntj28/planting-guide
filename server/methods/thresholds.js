import { thresholdsCollection  } from '../../lib/collections/thresholds.js'

Meteor.methods ({
	'add-thresholds' : function(cropType,cropVariety,days,rainfall) {
		thresholdsCollection.insert ({
			cropType: cropType,
            cropVariety:cropVariety,
			days:days,
			rainfall:rainfall

		})
	},

	'delete-thresholds': function(id){
        thresholdsCollection.remove({
            _id:id
        })
    },

    'delete-thresholds-cropVariety': function(cropVariety){
        thresholdsCollection.remove({
            cropVariety:cropVariety
        })
    },

    'delete-thresholds-cropType': function(cropType){
        thresholdsCollection.remove({
            cropType:cropType
        })
    },

    
    


    'update-thresholds' : function(_id, cropType,cropVariety,days,rainfall) {
        thresholdsCollection.update (
            {_id},//filters to be updaated
            {
                $set: {
                    cropType: cropType,
                    cropVariety:cropVariety,
                    days:days,
                    rainfall:rainfall


                }
            },

                {upsert : true}
            
        )

    },

    'update-crop-type-threshold' : function(cropType, cropTypeNew) {
        thresholdsCollection.update (
            {cropType},//filters to be updaated
            {
                $set: {
                         
                    cropType:cropTypeNew,
                                                            
                }
            },

                { multi: true}
            
        )

    },

    'update-variety-threshold' : function(cropVariety, cropVarietyNew) {
        thresholdsCollection.update (
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


