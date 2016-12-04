import { durationYields } from '../../lib/collections/duration_yield.js'

Meteor.methods ({	'add-duration-yields' : function (locationID,cropType,cropVariety,weekNo,yields) {
		durationYields.insert ({
            cropType:cropType,			
            locationID:locationID,
            cropVariety:cropVariety,
			weekNo:weekNo,			 
			yield:yields

		})
	},
	'delete-duration-yield': function(id){
        durationYields.remove({
            _id:id
        })
    },

    'delete-duration-yield-variety': function(cropVariety){
        durationYields.remove({
            cropVariety:cropVariety
        })
    },

    'delete-duration-yield-cropType': function(cropType){
        durationYields.remove({
            cropType:cropType
        })
    },


    'update-duration-yield' : function(locationID,cropType,cropVariety,weekNo,yields) {
         durationYields.update (
            {weekNo,cropType,cropVariety},//filters to be updaated
            {
                $set: {

                    cropType:cropType,                    
                    locationID:locationID,
                    cropVariety:cropVariety,
                    weekNo:weekNo,            
                    yield:yields

                }
            },

                {upsert : true}
            
        )

    },

    'update-crop-name' : function(cropType, cropTypeNew) {
        durationYields.update (
            {cropType},//filters to be updaated
            {
                $set: {
                         
                    cropType:cropTypeNew,
                                                            
                }
            },

                { multi: true}
            
        )

    },

    'update-crop-variety' : function(cropVariety, cropVarietyNew) {
        durationYields.update (
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


