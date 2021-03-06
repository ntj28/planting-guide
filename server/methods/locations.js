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

    'delete-location-city': function(city){
        location.remove({
            city:city
        })
    },

    'delete-location-province': function(province){
        location.remove({
            province:province
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

    'update-city-location' : function(city, cityNew) {
        location.update (
            {city},//filters to be updaated
            {
                $set: {

                    city:cityNew,

                }
            },

                { multi: true}

        )

    },

    'update-province-location' : function(province, provinceNew) {
        location.update (
            {province},//filters to be updaated
            {
                $set: {

                    province:provinceNew,

                }
            },

                { multi: true}

        )

    },

    'get-all-location' : function() {
        let resultArray = [];

        location.find().forEach((item) => {
            resultArray.push(item);
        })

        return resultArray;
    }

})
