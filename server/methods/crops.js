import { cropsCollection } from '../../lib/collections/crops.js'

Meteor.methods ({
	'add-crop' : function (crop) {
		cropsCollection.insert({
			crop : crop
		})
	},

	'delete-crop': function(id){
        cropsCollection.remove({
            _id:id
        })
    },

    'update-crop' : function(_id,crop) {
        cropsCollection.update (
            {_id},//filters to be updaated
            {
                $set: {
                    crop:crop,

                }
            },

                {upsert : true}

        )

    },

    'get-all-crops': function() {
        let resultArray = [];

        cropsCollection
            .find()
            .forEach((item) => {
                resultArray.push(item);
            })
            ;

        return resultArray;
    }



})