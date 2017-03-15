var React = require('react');
var ReactDOM = require('react-dom')
var L = require('leaflet')
var Sidebar = require('./Sidebar.js')
// var $ = require('jquery');
// var data = require('json!.../data.json');
// var districts = require('../data/districts.geojson')


var markerLayer;

var Maps = React.createClass({
    getInitialState: function() {
        var maxWindowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 55;
        return {
            large:false,
            height: "94.5vh"
        }
    },
    rendermap: function() {
        var map = this.map = L.map(ReactDOM.findDOMNode(this)).setView([28.207, 85.992], 9);
      
        L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors <br> Website developed by <a target = "_blank" href="http://kathmandulivinglabs.org">Kathmandu Living Labs</a>'
        }).addTo(map);

        // var districts = L.geoJson('');

        function getColor(d) {
            return d > 500 ? '#00734E' :
                   d > 400  ? '#008C67' :
                   d > 300  ? '#10A681' :
                   d > 200  ? '#29BF9A' :
                   d > 100   ? '#43D9B4' :
                   d > 50   ? '#5CF2CD' :
                   d > 10   ? '#76FFE7' :
                              '#8FFFFF';
        }

        function style(feature) {
            return {
                fillColor: getColor(feature.properties.total_surveys),
                weight: 1,
                opacity: 1,
                color: '#f8f8f8',
                dashArray: '2',
                fillOpacity: 0.6
            };
        }

        // $.getJSON("../data/districts.geojson", function(data) { console.log(data) });


        function highlightFeature(e) {
            var layer = e.target;

            layer.setStyle({
                weight: 2,
                color: '#005934',
                dashArray: '',
                fillOpacity: 0.7
            });

            if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
                layer.bringToFront();
            }
        }

        function resetHighlight(e) {
            var layer = e.target;


            layer.setStyle({
                weight: 1,
                opacity: 1,
                color: '#f8f8f8',
                dashArray: '2',
                fillOpacity: 0.6
            });
        }

        function zoomToFeature(e) {
            map.fitBounds(e.target.getBounds());
        }

        function onEachFeature(feature, layer) {
            layer.on({
                mouseover: highlightFeature,
                mouseout: resetHighlight,
                click: zoomToFeature
            });
        }

        var polygons = L.geoJSON(data, {
            style: style
            // ,onEachFeature: function (feature, layer) {
            //     console.log(feature);
            //     layer.bindPopup(feature.properties.DISTRICT.toString());
            // }
            ,onEachFeature: onEachFeature
            }).addTo(map);

        L.control.scale().addTo(map);
        var sidebar = L.control.sidebar('sidebar',{ position: 'right' }).addTo(map);
        this.setState({large: !this.state.large})

         sidebar.open('home')
    },
    addMarkers: function(data) {
        markerLayer = new L.featureGroup;
        data.features.map(function(d, i) {
            var marker = new L.marker([d.geometry.coordinates[1], d.geometry.coordinates[0]],{title : d.properties.tags.name || d.properties.tags.amenity }).addTo(markerLayer)
                            $('body').on('click', '#button' + d.properties.id, function(){this.onEditClick(d)}.bind(this));
        }.bind(this));

        markerLayer.addTo(this.map);

    },

    updateMarkers: function(data) {
        // this.map.removeLayer(markerLayer)
        // this.addMarkers(data)
    },


    componentDidMount: function() {
        this.rendermap();

        // this.addMarkers(this.props.data);
    },


    componentDidUpdate: function() {
        // this.updateMarkers(this.props.data);
    },

    render: function() {
        return (
                        
                        <div>

                        <div id="map" className = "sidebar-map" style={{height:this.state.height}}>
                        </div>
                        </div> 
        )

    }
})


module.exports = Maps