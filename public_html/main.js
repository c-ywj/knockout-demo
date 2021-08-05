var my = my || {};

my.dataService = (function(){
    var getSampleData = function () {
        return my.sampleData;
    }

    return {
        getSampleData: getSampleData
    };
})(my)

my.sampleData = (function (my) {
    var data = {
        sampleKey: 'sampleText'
    };

    return {
        data: data
    };
})()