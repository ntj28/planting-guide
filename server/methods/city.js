import { cityCollection } from '../../lib/collections/city.js'

Meteor.methods ({
	'add-city' : function (provinceID, city) {
		cityCollection.insert({
			provinceID : provinceID,
			city :  city			 
		})
	},

	'delete-city': function(id){
        cityCollection.remove({
            _id:id
        })
    },

    'update-city' : function(_id, city ) {
        cityCollection.update (
            {_id},//filters to be updaated
            {
                $set: {
                    city:city
                                       
                }
            },

                {upsert : true}
            
        )

    },

    
})