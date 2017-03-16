var React = require('react');
var ReactDOM = require('react-dom')
var L = require('leaflet');
var $ = require('jquery');
var polygons = require('../data/polygons');
// var Sidebar = require('./Sidebar')

var baseMapUrl = 'http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
var allDistricts = ["dhading", "nuwakot", "sindhupalchok", "gorkha", "dolakha"]
var selected = ""





var Body = React.createClass({
    getInitialState: function() {
        return {
            height: "94.5vh",
            level: "all",
            name: "all"
        }
    },
    addLayer: function (layer, type) {
            var layers = {
                        districts: {
                            dhading: L.geoJSON(polygons.districts.dhading, {style:this.styleDistrict, onEachFeature:this.onEachFeature}),
                            gorkha: L.geoJSON(polygons.districts.gorkha, {style:this.styleDistrict, onEachFeature:this.onEachFeature}),
                            sindhupalchok: L.geoJSON(polygons.districts.sindhupalchok, {style:this.styleDistrict, onEachFeature:this.onEachFeature}),
                            dolakha: L.geoJSON(polygons.districts.dolakha, {style:this.styleDistrict, onEachFeature:this.onEachFeature}),
                            nuwakot: L.geoJSON(polygons.districts.nuwakot, {style:this.styleDistrict, onEachFeature:this.onEachFeature})
                        },
                        vdcs: {
                            dhading: L.geoJSON(polygons.vdcs.dhading, {style:this.styleVdc, onEachFeature:this.onEachFeature}),
                            gorkha: L.geoJSON(polygons.vdcs.gorkha, {style:this.styleVdc, onEachFeature:this.onEachFeature}),
                            sindhupalchok: L.geoJSON(polygons.vdcs.sindhupalchok, {style:this.styleVdc, onEachFeature:this.onEachFeature}),
                            dolakha: L.geoJSON(polygons.vdcs.dolakha, {style:this.styleVdc, onEachFeature:this.onEachFeature}),
                            nuwakot: L.geoJSON(polygons.vdcs.nuwakot, {style:this.styleVdc, onEachFeature:this.onEachFeature})
                        }
                }

            switch(type) {

                case "district":
                    layers.districts[layer].addTo(this.map);

                    break;
                case "vdc":
                    layers.vdcs[layer].addTo(this.map);

                    break;
                default:
                    // console.log("default response");
            }
    },
    updateState: function(code, level,name) {
        // console.log(code,name, level)
        if(level=="district") {
            this.setState({
                code:code,
                name:name,
                level:level,
                district: name
            }, this.props.onSelectionUpdate(code,level,name,name))
        } else {
            this.setState({
                code:code,
                name:name,
                level:level,
            }, this.props.onSelectionUpdate(code,level,name,this.state.district))  
        }
    },
    getColor: function(d, type) {
        if (type == "district") {
            return d > 500 ? '#00734E' :
                   d > 400  ? '#008C67' :
                   d > 300  ? '#10A681' :
                   d > 200  ? '#29BF9A' :
                   d > 100   ? '#43D9B4' :
                   d > 50   ? '#5CF2CD' :
                   d > 10   ? '#76FFE7' :
                              '#29BF9A';
        } else {
            return d > 500 ? '#00734E' :
                   d > 400  ? '#008C67' :
                   d > 300  ? '#10A681' :
                   d > 200  ? '#29BF9A' :
                   d > 100   ? '#43D9B4' :
                   d > 50   ? '#5CF2CD' :
                   d > 10   ? '#76FFE7' :
                              '#00734E';
        }


    },
    styleDistrict: function(feature) {
        return {
            fillColor: this.getColor(feature.properties.total_surveys, "district"),
            weight: 1,
            opacity: 1,
            color: '#f8f8f8',
            dashArray: '2',
            fillOpacity: 0.6
        };
    },
    styleVdc: function(feature) {
        return {
            fillColor: this.getColor(feature.properties.total_surveys, "vdc"),
            weight: 1,
            opacity: 1,
            color: '#f8f8f8',
            dashArray: '2',
            fillOpacity: 0.6
        };
    },
    highlightFeature: function(e) {
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
    },
    resetHighlight: function(e) {
            // console.log(this.state)
            var layer = e.target;
            selected = e.target.feature.properties.name
            if (e.target.feature.properties.name != this.state.name) {


                layer.setStyle({
                    weight: 0.5,
                    opacity: 1,
                    color: '#f8f8f8',
                    dashArray: '2',
                    fillOpacity: 0.6
                });
                
            } else {
                layer.setStyle({
                    weight: 4,
                    opacity: 1,
                    color: '#f00',
                    dashArray: '0',
                    fillOpacity: 0.6
                });
            }
    },
    zoomToFeature: function(e) {
            
            if (e.target.feature.properties.type) {
                var selectedDistrict =e.target.feature.properties.name.toLowerCase()
                this.map.setView(e.target.getCenter(), 10)
                this.removeLayers();
                this.addLayer(selectedDistrict, "vdc");
                this.addRemainingDistricts(selectedDistrict);
                this.updateState(e.target.feature.properties.DIST_ID, "district", e.target.feature.properties.name );
            } else {
                // console.log("Not a district")
                this.removeLayers();
                this.addLayer(this.state.district, "vdc");
                this.addRemainingDistricts(this.state.district);
                var layer = e.target;
                layer.setStyle({
                    weight: 2,
                    opacity: 1,
                    color: '#005934',
                    dashArray: '1',
                    fillOpacity: 0.6
                });

            // if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            //     layer.bringToFront();
            // }
                this.updateState(e.target.feature.properties.code, "vdc", e.target.feature.properties.name);
            }
    },
    onEachFeature: function(feature, layer) {
            layer.on({
                mouseover: this.highlightFeature,
                mouseout: this.resetHighlight,
                click: this.zoomToFeature
            });
    },

    removeLayers: function() {
            this.map.eachLayer(function (layer){
                if (layer._url != baseMapUrl) {
                        this.map.removeLayer(layer)
                }
            }.bind(this))
    },


    addRemainingDistricts: function(district) {
            allDistricts.map(function(item){
                if(item != district) {
                    this.addLayer(item,"district")
                }
            }.bind(this))        
    },


    addDistricts: function() {
            this.addLayer("nuwakot","district");
            this.addLayer("gorkha","district");
            this.addLayer("sindhupalchok","district");
            this.addLayer("dhading","district");
            this.addLayer("dolakha","district");        
    },

    loadMap: function() {
		var map = this.map = L.map(ReactDOM.findDOMNode(this)).setView([28.207, 85.992], 8);
      	
      	var baseLayer = L.tileLayer(baseMapUrl, {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors <br> Website developed by <a target = "_blank" href="http://kathmandulivinglabs.org">Kathmandu Living Labs</a>'
        }).addTo(map);

        this.addDistricts();

        map.on('zoomend', function() {
            // console.log("Current Zoom Level:", map.getZoom())
            if (map.getZoom()<9){
                this.removeLayers();
                this.addDistricts();
            }
            if (map.getZoom() >= 9){
                if (true){


                } else {

                }
            }
        }.bind(this))

        L.control.scale().addTo(map);
        
        var sidebar = L.control.sidebar('sidebar',{ position: 'right' }).addTo(map);
        this.props.sidebarOpener(false);
        sidebar.open('home')

    },
    componentDidMount: function() {
        console.log(this.props.children)
        this.loadMap();
    },
	render: function () {
		return (
			<div>
                {this.props.children}
                <div id="map" className = "sidebar-map" style={{height:this.state.height}}>
				</div>
			</div> 
		)
	}
})

module.exports = Body