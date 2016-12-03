import { cropVarietiesCollection } from '../../lib/collections/crop_varieties.js'

Meteor.methods ({
	'add-variety' : function (cropID, variety) {
		cropVarietiesCollection.insert({
			cropID : cropID,
			variety :  variety			 
		})
	},

	'delete-variety': function(id){
        cropVarietiesCollection.remove({
            _id:id
        })
    },

    'update-variety' : function(_id, variety ) {
        cropVarietiesCollection.update (
            {_id},//filters to be updaated
            {
                $set: {
                    variety:variety
                                       
                }
            },

                {upsert : true}
            
        )

    },

    
})