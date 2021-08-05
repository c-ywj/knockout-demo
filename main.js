var my = my || {};

my.dataService = (function(){
    console.log('dataService init');
    var getSampleData = function () {
        return my.sampleData;
    }

    return {
        getSampleData: getSampleData
    };
})(my)

my.sampleData = (function (my) {
    console.log('sampleData init');
    var data = {
        sampleKey: 'sampleText'
    };

    return {
        data: data
    };
})()