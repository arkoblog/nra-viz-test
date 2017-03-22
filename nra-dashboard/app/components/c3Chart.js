var React = require('react');
var ReactDOM = require('react-dom');
var d3 = require('d3');
var c3 = require('c3');
var _ = require('lodash')

var chartHeight = screen.height * 0.25;
var modalChartHeight = screen.height * .4;

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
    _prepareSections: function(data) {
                var arr = [];
                for(var item in data) {
                    arr.push(item)
                }
        return(arr);
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
                        var values = (this._prepareValues(this.props.data)[i])
                        if (j) {
                            var label = values[j]
                        } else {
                            var label = ""
                        }

                        
                        var current = this._prepareSections(this.props.data)
                        var selected = current[i]
                        var values = (this._prepareValues(this.props.data)[i])
                        // + this.props.data[selected].stats[this._getTitles(this.props.data, j)]
                        // console.log(this.props.data[this._getTitles(this.props.data, i)].stats[id]);
                        // var number = this.props.data[this._getTitles(this.props.data, j)].stats[id]
                        return v + "% / " + this._prepareKeys(this.props.data)[j]  ;
                    }.bind(this),
                    // + " / " + myValues[i]  
                },
                color: function(color,d) {  
                    var keys= this._prepareKeys(this.props.data)
                    var number = keys.indexOf(d.id)
                    // console.log(d)

                    if(d.index == 2) {
                        if (number == 0) {
                            return '#4484ce'
                            }
                        else if (number == 1) {
                            return '#679cdc'
                        }
                        else if (number == 2) {
                            return '#4484ce'
                        }
                        else if (number == 3) {
                            return '#679cdc'
                        }
                        else if (number == 4) {
                            return '#4484ce'
                        }
                        else if (number == 5) {
                            return '#679cdc'
                        }
                        else if (number == 6) {
                            return '#4484ce'
                        }
                        else if (number == 7) {
                            return '#679cdc'
                        }
                        else if (number == 8) {
                            return '#4484ce'
                        } else {
                            return '#679cdc'
                        }
                    } else if (d.index == 0) {
                        if (number == 0) {
                            return '#053064'
                            }
                        else if (number == 1) {
                            return '#0f3f80'
                        }
                        else if (number == 2) {
                            return '#053064'
                        }
                        else if (number == 3) {
                            return '#0f3f80'
                        }
                        else if (number == 4) {
                            return '#053064'
                        }
                        else if (number == 5) {
                            return '#0f3f80'
                        }
                        else if (number == 6) {
                            return '#053064'
                        }
                        else if (number == 7) {
                            return '#0f3f80'
                        }
                        else if (number == 8) {
                            return '#053064'
                        } else {
                            return '#0f3f80'
                        }
                    } else {
                        if (number == 0) {
                            return '#0c4e9d'
                            }
                        else if (number == 1) {
                            return '#2965ae'
                        }
                        else if (number == 2) {
                            return '#0c4e9d'
                        }
                        else if (number == 3) {
                            return '#2965ae'
                        }
                        else if (number == 4) {
                            return '#0c4e9d'
                        }
                        else if (number == 5) {
                            return '#2965ae'
                        }
                        else if (number == 6) {
                            return '#0c4e9d'
                        }
                        else if (number == 7) {
                            return '#2965ae'
                        }
                        else if (number == 8) {
                            return '#0c4e9d'
                        } else {
                            return '#2965ae'
                        }
                    }
                }.bind(this),
                // etc etc
                keys: {
                    y: "x-axis",
                    value: this._prepareKeys(this.props.data)
                },

                type: 'bar'
            },
            // color: {
            //     pattern: ['#4484ce', '#2b6bc0', '#4483ce', '#679cdc', '#4483ce']
            // },
            bar: {
                width: {
                ratio: 0.9
                }
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
            // regions: [
            //     // {axis: 'y', end: 1, class: 'regionY'},
            //     {axis: 'x', start: -0.5, end: 0.5, class: 'region1'},
            //     {axis: 'x', start: 0.5, end: 1.5, class: 'region2'},
            //     {axis: 'x', start: 1.5, end: 2.5, class: 'region1'},
            // ],
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
        ref = "refName" > </div>;
    }
});

var modalMultipleApplyBar = React.createClass({
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

        if (this.props.validity == "applied") {
            var newArr = [arr[0]]
        } else if (this.props.validity == "not applied"){
            var newArr = [arr[1]]
        } else {
            var newArr = arr
        }
        return (newArr)
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
                color: function(color,d) {  
                    var keys= this._prepareKeys(this.props.data)
                    var number = keys.indexOf(d.id)
                    // console.log(d)

                    if(d.index == 2) {
                        if (number == 0) {
                            return '#4484ce'
                            }
                        else if (number == 1) {
                            return '#679cdc'
                        }
                        else if (number == 2) {
                            return '#4484ce'
                        }
                        else if (number == 3) {
                            return '#679cdc'
                        }
                        else if (number == 4) {
                            return '#4484ce'
                        }
                        else if (number == 5) {
                            return '#679cdc'
                        }
                        else if (number == 6) {
                            return '#4484ce'
                        }
                        else if (number == 7) {
                            return '#679cdc'
                        }
                        else if (number == 8) {
                            return '#4484ce'
                        } else {
                            return '#679cdc'
                        }
                    } else if (d.index == 0) {
                        if (number == 0) {
                            return '#053064'
                            }
                        else if (number == 1) {
                            return '#0f3f80'
                        }
                        else if (number == 2) {
                            return '#053064'
                        }
                        else if (number == 3) {
                            return '#0f3f80'
                        }
                        else if (number == 4) {
                            return '#053064'
                        }
                        else if (number == 5) {
                            return '#0f3f80'
                        }
                        else if (number == 6) {
                            return '#053064'
                        }
                        else if (number == 7) {
                            return '#0f3f80'
                        }
                        else if (number == 8) {
                            return '#053064'
                        } else {
                            return '#0f3f80'
                        }
                    } else {
                        if (number == 0) {
                            return '#0c4e9d'
                            }
                        else if (number == 1) {
                            return '#2965ae'
                        }
                        else if (number == 2) {
                            return '#0c4e9d'
                        }
                        else if (number == 3) {
                            return '#2965ae'
                        }
                        else if (number == 4) {
                            return '#0c4e9d'
                        }
                        else if (number == 5) {
                            return '#2965ae'
                        }
                        else if (number == 6) {
                            return '#0c4e9d'
                        }
                        else if (number == 7) {
                            return '#2965ae'
                        }
                        else if (number == 8) {
                            return '#0c4e9d'
                        } else {
                            return '#2965ae'
                        }
                    }
                }.bind(this),
                // etc etc
                keys: {
                    y: "x-axis",
                    value: this._prepareKeys(this.props.data)
                },

                type: 'bar'
            },
            // color: {
            //     pattern: ['#4484ce', '#2b6bc0', '#4483ce', '#679cdc', '#4483ce']
            // },
            bar: {
                width: {
                ratio: 0.9
                }
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
            // regions: [
            //     // {axis: 'y', end: 1, class: 'regionY'},
            //     {axis: 'x', start: -0.5, end: 0.5, class: 'region1'},
            //     {axis: 'x', start: 0.5, end: 1.5, class: 'region2'},
            //     {axis: 'x', start: 1.5, end: 2.5, class: 'region1'},
            // ],
            legend: {
                show: false
            },
            tooltip: {
                show: function(){
                    if(index==1 && this.props.validty == "applied") {
                        return false
                    } else if (index==0 && this.props.validty == " not applied") {
                        return false;
                    } else {
                        return true
                    }                    
                }.bind(this),
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
        ref = "refName" > </div>;
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
        // console.log(this.props.validity,arr)

        if (this.props.validity == "applied") {
            var newArr = [formattedData[0]]
        } else if (this.props.validity == "not applied"){
            var newArr = [formattedData[1]]
        } else {
            var newArr = formattedData
        }
        return (newArr)
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
        console.log(arr)
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
                // color: function(color,d) {  
                //     if(d.index == 0) {
                //         return '#4484ce'
                //     } else if (d.index == 1) {
                //         return 'red'
                //     } else {
                //         return 'yellow'
                //     }
                // },
                labels: {
                    format: function(v, id, i, j) {
                        return labels[i] == "dummy" ? "" : labels[i] + " / " + v + "%"
                    },
                    // + " / " + myValues[i]  
                },
                color: function(color,d) {  
                    // console.log(d)

                    if(d.index == 2) {
                            return '#4484ce'
                    } else if (d.index == 1) {

                            return '#0c4e9d'
                        
                    } else {
                            return '#053064'
                    }
                }
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
                        bar: {
            width: {
            ratio: 0.9
            }
            },
            // regions: [
            //     // {axis: 'y', end: 1, class: 'regionY'},
            //     {axis: 'x', start: -0.5, end: 0.5, class: 'region1'},
            //     {axis: 'x', start: 0.5, end: 1.5, class: 'region2'},
            //     {axis: 'x', start: 1.5, end: 2.5, class: 'region1'},
            // ],
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
        ref = "refName" > </div>;
    }
});

var modalMultipleApplyBarInst = React.createClass({
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

        if (this.props.validity == "applied") {
            var newArr = [arr[0]]
        } else if (this.props.validity == "not applied"){
            var newArr = [arr[1]]
        } else {
            var newArr = arr
        }
        return (newArr)
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
                color: function(color,d) {  
                    var keys= this._prepareKeys(this.props.data)
                    var number = keys.indexOf(d.id)
                    // console.log(d)

                    if(d.index == 2) {
                        if (number == 0) {
                            return '#4484ce'
                            }
                        else if (number == 1) {
                            return '#679cdc'
                        }
                        else if (number == 2) {
                            return '#4484ce'
                        }
                        else if (number == 3) {
                            return '#679cdc'
                        }
                        else if (number == 4) {
                            return '#4484ce'
                        }
                        else if (number == 5) {
                            return '#679cdc'
                        }
                        else if (number == 6) {
                            return '#4484ce'
                        }
                        else if (number == 7) {
                            return '#679cdc'
                        }
                        else if (number == 8) {
                            return '#4484ce'
                        } else {
                            return '#679cdc'
                        }
                    } else if (d.index == 0) {
                        if (number == 0) {
                            return '#053064'
                            }
                        else if (number == 1) {
                            return '#0f3f80'
                        }
                        else if (number == 2) {
                            return '#053064'
                        }
                        else if (number == 3) {
                            return '#0f3f80'
                        }
                        else if (number == 4) {
                            return '#053064'
                        }
                        else if (number == 5) {
                            return '#0f3f80'
                        }
                        else if (number == 6) {
                            return '#053064'
                        }
                        else if (number == 7) {
                            return '#0f3f80'
                        }
                        else if (number == 8) {
                            return '#053064'
                        } else {
                            return '#0f3f80'
                        }
                    } else {
                        if (number == 0) {
                            return '#0c4e9d'
                            }
                        else if (number == 1) {
                            return '#2965ae'
                        }
                        else if (number == 2) {
                            return '#0c4e9d'
                        }
                        else if (number == 3) {
                            return '#2965ae'
                        }
                        else if (number == 4) {
                            return '#0c4e9d'
                        }
                        else if (number == 5) {
                            return '#2965ae'
                        }
                        else if (number == 6) {
                            return '#0c4e9d'
                        }
                        else if (number == 7) {
                            return '#2965ae'
                        }
                        else if (number == 8) {
                            return '#0c4e9d'
                        } else {
                            return '#2965ae'
                        }
                    }
                }.bind(this),
                // etc etc
                keys: {
                    y: "x-axis",
                    value: this._prepareKeys(this.props.data)
                },

                type: 'bar'
            },
            // color: {
            //     pattern: ['#4484ce', '#2b6bc0', '#4483ce', '#679cdc', '#4483ce']
            // },
            bar: {
                width: {
                ratio: 0.9
                }
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
            // regions: [
            //     // {axis: 'y', end: 1, class: 'regionY'},
            //     {axis: 'x', start: -0.5, end: 0.5, class: 'region1'},
            //     {axis: 'x', start: 0.5, end: 1.5, class: 'region2'},
            //     {axis: 'x', start: 1.5, end: 2.5, class: 'region1'},
            // ],
            legend: {
                show: false
            },
            tooltip: {
                show: function(){
                    if(index==1 && this.props.validty == "applied") {
                        return false
                    } else if (index==0 && this.props.validty == " not applied") {
                        return false;
                    } else {
                        return true
                    }                    
                }.bind(this),
                  format: {
                    title: function (x) { return this._getTitles(this.props.data, x) }.bind(this),
                    value: function (value, ratio, id, index) { 
                        // console.log(value, ratio, id, index)
                        var number = this.props.data[this._getTitles(this.props.data, index)].stats[id]
                        return number+" ("+ value + "%)"; }.bind(this)
                  }
            },
            size: {
                height: modalChartHeight*.45
            }
        });
    },
    render() {
        return <div id = { this.props.id }
        className = ""
        ref = "refName" > </div>;
    }
});

var modalSingleBarInst = React.createClass({
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
        // console.log(this.props.validity,arr)

        if (this.props.validity == "applied") {
            var newArr = [formattedData[0]]
        } else if (this.props.validity == "not applied"){
            var newArr = [formattedData[1]]
        } else {
            var newArr = formattedData
        }
        return (newArr)
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
        console.log(arr)
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
                // color: function(color,d) {  
                //     if(d.index == 0) {
                //         return '#4484ce'
                //     } else if (d.index == 1) {
                //         return 'red'
                //     } else {
                //         return 'yellow'
                //     }
                // },
                labels: {
                    format: function(v, id, i, j) {
                        return labels[i] == "dummy" ? "" : labels[i] + " / " + v + "%"
                    },
                    // + " / " + myValues[i]  
                },
                color: function(color,d) {  
                    // console.log(d)

                    if(d.index == 2) {
                            return '#4484ce'
                    } else if (d.index == 1) {

                            return '#0c4e9d'
                        
                    } else {
                            return '#053064'
                    }
                }
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
                        bar: {
            width: {
            ratio: 0.9
            }
            },
            // regions: [
            //     // {axis: 'y', end: 1, class: 'regionY'},
            //     {axis: 'x', start: -0.5, end: 0.5, class: 'region1'},
            //     {axis: 'x', start: 0.5, end: 1.5, class: 'region2'},
            //     {axis: 'x', start: 1.5, end: 2.5, class: 'region1'},
            // ],
            legend: {
                show: false
            },
            tooltip: {
                contents: function(d, defaultTitleFormat, defaultValueFormat, color, index) {
                        return "<div class='test' style='font-size:10px;padding:10px;background-color:rgb(245,245,245); margin-left:400px;'><font color='#4484ce'>" + labels[d[0].index] + "<br/>" + myValues[d[0].index] + " / " + d[0].value + "% </font></div>";
                }
            },
            size: {
                height: modalChartHeight*0.45
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



module.exports = {
    Bar: Bar,
    modalSingleBar: modalSingleBar,
    modalMultipleBar: modalMultipleBar,
    modalMultipleApplyBar: modalMultipleApplyBar,
    modalSingleBarInst: modalSingleBarInst,
    modalMultipleApplyBarInst: modalMultipleApplyBarInst

};
