import { location } from '../../lib/collections/locations.js'


Meteor.methods({

    'add-location': function(projectName, institution, latitude, longitude, city, province,awsID) {
        location.insert({
            projectName: projectName,
            institution: institution,
            mapLocation: {
                coords:[latitude,longitude],
                type: "Point"
            },
            latitude:latitude,
            longitude:longitude,
            city: city,
            province: province,
            awsID:awsID,
        })

    },
    
    'delete-location': function(id){
        location.remove({
            _id:id
        })
    },

    'update-location' : function(_id, projectName,institution,latitude,longitude,city,province,awsID) {
        location.update (
            {_id},//filters to be updaated
            {
                $set: {
                    projectName:projectName,
                    institution: institution,
                    mapLocation: {
                        coords:[latitude,longitude],
                        type: "Point"
                    },
                    latitude:latitude,
                    longitude:longitude,
                    city: city,
                    province: province,
                    awsID:awsID

                }
            },

                {upsert : true}
            
        )

    },
})