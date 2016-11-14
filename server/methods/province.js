import { province  } from '../../lib/collections/province.js'

Meteor.methods ({
	'add-province' : function(provinceData) {
		province.insert ({
			province: provinceData
		})
	},

	'delete-province': function(id){
        province.remove({
            _id:id
        })
    },

    'update-province' : function(_id, provinceData) {
        province.update (
            {_id},//filters to be updaated
            {
                $set: {
                    province:provinceData                                    
                }
            },

                {upsert : true}
            
        )

    },
	


})

