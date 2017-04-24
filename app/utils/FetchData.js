var React = require('react');
var axios = require('axios');
var rootURL = 'http://139.59.227.15:8848'


var fetchData = function(params) {
    return axios({
        method: 'get',
        url: rootURL + '/api/v1/mis/region/records',
        params: params
    })
}



var fetchModalData = function(params) {
    return axios({
        method: 'get',
        url: rootURL + '/api/v1/mis/assessment/queries',
        params: params
    })
}

module.exports = {fetchData:fetchData,
fetchModalData: fetchModalData};
