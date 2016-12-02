/*jshint node:true, esnext: true, undef:true, unused: true*/

/*!
 * Meteor Boilerplate Code
 *
 * Copyright(c) Exequiel Ceasar Navarrete <development.lkexi@gmail.com>
 * Licensed under MIT
 */
'use strict';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { location } from '../../../lib/collections/locations.js'
import 'meteor/bevanhunt:leaflet';
import './map.html';

let map;




Template.map.rendered = () => {
    // create the map
    map = L.map('map', {});

    // set the lat, long and zoom levels.
    map.setView([13, 122], 6);

    // create the basemap tile layer
    var tileLayer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: `Map data &copy; <a href="http://openstreetmap.org" target="_blank">
            OpenStreetMap</a> contributors`
    });

    // add the layer to the map
    tileLayer.addTo(map);


    //place the marker
    let markerData = location.find();
    

    console.log(markerData.count(), map)

    if (typeof map !== 'undefined' && markerData.count() > 0) {
        // get location data from the mongo db and add it to the map
        markerData.forEach((item) => {
            let marker = L.marker(item.mapLocation.coords);

            let popup = marker.bindPopup(`Location Name: ${item.city}`)

            //listen for cick events in the market and oepn the popup once clock is detect
            marker.on('click', ( ) =>{
                popup.openPopup();
                FlowRouter.go(`/date/${item.awsID}/${item._id}`)
                //console.log(`location Id :${item._id}` )
            })

            marker.addTo(map);
        });
    }
       

   
};



Meteor.autorun(() => {
    let markerData = location.find();
    //console.log("autorun called")

    console.log(markerData.count(), map)

    if (typeof map !== 'undefined' && markerData.count() > 0) {
        // get location data from the mongo db and add it to the map
        markerData.forEach((item) => {
            let marker = L.marker(item.mapLocation.coords);

            let popup = marker.bindPopup(`Location Name: ${item.city}`)

            //listen for cick events in the market and oepn the popup once clock is detect
            marker.on('click', ( ) =>{
                popup.openPopup();
                FlowRouter.go(`/date/${item.awsID}/${item._id}`)
                //console.log(`location Id :${item._id}` )
            })

            marker.addTo(map);
        });
    }
       
    
});


Template.map.helpers ({

    map: function() {

   let markerData = location.find();

    console.log(markerData.count(), map)

    if (typeof map !== 'undefined' && markerData.count() > 0) {
        // get location data from the mongo db and add it to the map
        markerData.forEach((item) => {
            let marker = L.marker(item.location.coords);

            let popup = marker.bindPopup(`Location Name: ${item.city}`)

            //listen for cick events in the market and oepn the popup once click is detect
            marker.on('click', ( ) =>{
                popup.openPopup();
                FlowRouter.go(`/date/${item.awsID}/${item._id}`)
            })

            marker.addTo(map);
        });
    }
}

     
})