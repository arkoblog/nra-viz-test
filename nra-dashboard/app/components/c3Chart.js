var React = require('react');
var ReactDOM = require('react-dom');
var d3 = require('d3');
var c3 = require('c3');
var _ = require('lodash')

var chartHeight = screen.height * 0.25;
var modalChartHeight = screen.height * .5;

var Bar = React.createClass({
    componentWillMount: function() {
        this._updateChart();
    },
    _formatData: function(data) {
        var formattedData = []
        _.forEach(data, function(value, key) {
            var emptyObject = {}
            emptyObject.title = key;
            emptyObject.value = value;
            emptyObject.percentage = Number(this.props.values[key])
            formattedData.push(emptyObject)

        }.bind(this))
        return formattedData;
    },
    componentDidMount: function() {
        this._updateChart();
    },
    componentDidUpdate: function() {
        this._updateChart();
    },
    _chartHeight: function() {
        chartHeight = screen.height * 0.1;
        var length = Object.keys(this.props.percentageData).length
        chartHeight = chartHeight * length / 3
    },
    _updateChart: function() {
        var myChartData = this._formatData(this.props.percentageData);
        var myValues = _.values(this.props.values)
        this._chartHeight()
        var labels = _.map(myChartData, "title")

        c3.generate({
            bindto: '#' + this.props.id,
            data: {
                json: myChartData,
                keys: {
                    x: 'title', // it's possible to specify 'x' when category axis
                    value: ['value'],
                },
                type: "bar",
                labels: {
                    format: function(v, id, i, j) {
                        return labels[i] == "dummy" ? "" : labels[i] + " / " + v + "%"
                    },
                    // + " / " + myValues[i]  
                }
            },
            color: {
                pattern: ['#4484ce']
            },
            axis: {
                rotated: true,
                x: {
                    show: false,
                    type: 'category'
                },
                y: {
                    show: false,
                    max: 100
                }
            },
            legend: {
                show: false
            },
            tooltip: {
                contents: function(d, defaultTitleFormat, defaultValueFormat, color, index) {
                    return "<div class='test' style='font-size:10px;padding:10px;background-color:rgb(245,245,245)'><font color='#4484ce'>" + labels[d[0].index] + "<br/>" + myValues[d[0].index] + " / " + d[0].value + "% </font></div>";
                }
            },
            size: {
                height: chartHeight
            }
        });
    },
    render() {
        return <div id = { this.props.id }
        className = ""
        style = {
            { "height": "100%", "width": "100%" }
        }
        ref = "refName" > </div>;
    }
});

var modalMultipleBar = React.createClass({
    componentWillMount: function() {
        this._updateChart();
    },
    _prepareData: function(data) {
        var arr = [];

        for (var item in data) {
            var obj = {}

            obj["axis"] = item
            for (var i in data[item].percentageStats) {
                obj[i] = data[item].percentageStats[i]
            }

            arr.push(obj)

        }
        return (arr)
    },
    _getTitles: function(data, i) {
        var titles = Object.keys(data)
        return titles[i]
    },
    _prepareKeys: function(data) {
        for (var item in data) {
            var arr = []
            for (var i in data[item].percentageStats) {
                arr.push(i)
            }
        }

        return arr;
    },
    _prepareValues: function(data) {
        var arr = [];
        for (var item in data) {
            var seconarr = [];
            for (var i in data[item].stats) {
                seconarr.push(data[item].stats[i])
            }
            arr.push(seconarr);
        }
        return arr

    },
    componentDidMount: function() {
        this._updateChart();
    },
    componentDidUpdate: function() {
        this._updateChart();
    },
    _updateChart: function() {
        var myValues = this._prepareValues(this.props.data)
        c3.generate({
            bindto: '#' + this.props.id,
            data: {
                y: "x-axis",
                json: this._prepareData(this.props.data),
                labels: {
                    format: function(v, id, i, j) {
                        var myVals = myValues[i]
                        if (j) {
                            var label = myVals[j]
                        } else {
                            var start = 0
                            var label = myValues[start][0]
                        }
                        return v + "% / " + this._prepareKeys(this.props.data)[j];
                    }.bind(this),
                    // + " / " + myValues[i]  
                },
                // etc etc
                keys: {
                    y: "x-axis",
                    value: this._prepareKeys(this.props.data)
                },

                type: 'bar'
            },
            color: {
                pattern: ['#4484ce', '#2b6bc0', '#4483ce', '#679cdc', '#4483ce']
            },
            axis: {
                rotated: true,
                x: {
                    show: false,
                    type: 'category'
                },
                y: {
                    show: false,
                    max: 100
                }
            },
            legend: {
                show: false
            },
            tooltip: {
                show: true,
                  format: {
                    title: function (x) { return this._getTitles(this.props.data, x) }.bind(this),
                    value: function (value, ratio, id, index) { 
                        // console.log(value, ratio, id, index)
                        var number = this.props.data[this._getTitles(this.props.data, index)].stats[id]
                        return number+" ("+ value + "%)"; }.bind(this)
                  }
            },
            size: {
                height: modalChartHeight
            }
        });
    },
    render() {
        return <div id = { this.props.id }
        className = ""
        ref = "refName" > < /div>;
    }
});

var modalSingleBar = React.createClass({
    componentWillMount: function() {
        this._updateChart();
    },
    _formatData: function(data) {
        var formattedData = []
        _.forEach(data, function(value, key) {
            var emptyObject = {}
            emptyObject.title = key;
            emptyObject.value = value;
            emptyObject.percentage = Number(this.props.values[key])
            formattedData.push(emptyObject)

        }.bind(this))
        return formattedData;
    },
    componentDidMount: function() {
        this._updateChart();
    },
    componentDidUpdate: function() {
        this._updateChart();
    },

    _updateChart: function() {
        var myChartData = this._formatData(this.props.percentageData);
        var myValues = _.values(this.props.values)
        var labels = _.map(myChartData, "title")

        c3.generate({
            bindto: '#' + this.props.id,
            data: {
                json: myChartData,
                keys: {
                    x: 'title', // it's possible to specify 'x' when category axis
                    value: ['value'],
                },
                type: "bar",
                labels: {
                    format: function(v, id, i, j) {
                        return labels[i] == "dummy" ? "" : labels[i] + " / " + v + "%"
                    },
                    // + " / " + myValues[i]  
                }
            },
            color: {
                pattern: ['#4484ce']
            },
            axis: {
                rotated: true,
                x: {
                    show: false,
                    type: 'category'
                },
                y: {
                    show: false,
                    max: 100
                }
            },
            legend: {
                show: false
            },
            tooltip: {
                contents: function(d, defaultTitleFormat, defaultValueFormat, color, index) {
                    return "<div class='test' style='font-size:10px;padding:10px;background-color:rgb(245,245,245); margin-left:400px;'><font color='#4484ce'>" + labels[d[0].index] + "<br/>" + myValues[d[0].index] + " / " + d[0].value + "% </font></div>";
                }
            },
            size: {
                height: modalChartHeight
            }
        });
    },
    render() {
        return <div id = { this.props.id }
        className = ""
        style = {
            { "height": "100%", "width": "100%" }
        }
        ref = "refName" > < /div>;
    }
});


module.exports = {
    Bar: Bar,
    modalSingleBar: modalSingleBar,
    modalMultipleBar: modalMultipleBar
};
