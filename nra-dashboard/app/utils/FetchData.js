var React = require('react');
var axios = require('axios');

var rootURL = 'https://nra-viz-api.herokuapp.com'

var fetchWards = function() {
    return axios({
        method: 'get',
        url: rootURL + '/v1/wards'
    })
}

var fetchInsights = function(params) {
    return axios({
        method: 'get',
        url: rootURL + '/v1/features',
        params: params
    })
}

var fetchChartData = function(params) {
    return axios({
        method: 'get',
        url: rootURL + '/chartData',
        params: params
    })
}


var fetchData = {
    getChart : function(params){
        var myInsights = fetchChartData(params);
        return axios.all([myInsights])
            .then(function(response){
                console.log("Response",response[0].data[0].data)
                var array = response[0].data[0].data;
                if(response[0].data[0].data.installment_status.length==2) {
                    array.installment_status.push({"title":"dummy","value":0})
                }
                return (array)
            }).catch(function(err){
                console.warn('Error in getChart:', err)
            })
    }
}




module.exports = fetchData;
