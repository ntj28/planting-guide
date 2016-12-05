/*jshint node:true, esnext: true, undef:true, unused: true*/

'use strict';

import { Meteor } from 'meteor/meteor';
import { location } from '../../lib/collections/locations.js'

Meteor.startup(() => {
    let dataCount = location.find().count();

    // add location data to the mongodb when location collection is empty
    if (dataCount === 0) {
        location.insert({
            projectName: "sample",
            institution: "institution",
            mapLocation: {
                coords: [13, 122],
                type: "Point"
            },
            latitude:"13",
            longitude:"122",
            city: "manila",
            province: "manila",
        });

        location.insert({
            projectName: "sample",
            institution: "institution",
            mapLocation: {
                coords: [10.931874, 124.870040],
                type: "Point"
            },
            latitude:"10.931874",
            longitude:"124.870040",
            city: "tacloban",
            province: "leyte",

        });
    }

   
});


