// =================================================== Constructors ===================================================
my.vm = function(t)  {
    var title = ko.observable(t),
        userFullName = ko.observable('c y'),
        inputTicker = ko.observable(''),
        data = ko.observableArray([]),
        intraData = ko.observableArray([]),
        isLoading = ko.observable(false),
        sampleData = ko.observable(my.dataService.getSampleData()),
        tickers = [{id: 1, symbol: 'VALE'}, 
            {id: 2, symbol: 'MTTR'}, 
            {id: 3, symbol: 'GM'}, 
            {id: 4, symbol: 'BODY'}, 
            {id: 5, symbol: 'SOFI'}],
        selectedTicker = ko.observable(tickers[1]),
        symbolTitle = ko.computed(() => {
            return inputTicker().toUpperCase();
        }),
        url = ko.computed(() => {
            return `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${selectedTicker().symbol}&apikey=TLLLXNFNDTE63G5H`;
        }),
        createDailyPriceObservableAry = function(data) {
            my.vmi.data.removeAll();
            for (const key in data) {
                my.vmi.data.push(new my.dailyPrice(key, 
                data[key]['2. high'],
                data[key]['3. low'],
                data[key]['1. open'],
                data[key]['4. close'],
                data[key]['5. volume']))
            }
        },
        searchTicker = function() {
            let url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${inputTicker()}&apikey=TLLLXNFNDTE63G5H`;
            $.get(url, (res) => {
                my.vmi.isLoading(true);
                // my.vmi.symbolTitle(res['Meta Data']['2. Symbol'].toUpperCase());
                my.vmi.createDailyPriceObservableAry(res['Time Series (Daily)']);
            }).then(() => {
                my.vmi.isLoading(false)
            }).catch((err) => {
                console.log('err: ', err);
            })
        }
    return {
        title: title,
        userFullName: userFullName,
        inputTicker: inputTicker,
        data: data,
        isLoading: isLoading,
        symbolTitle: symbolTitle,
        sampleData, sampleData,
        tickers: tickers,
        selectedTicker: selectedTicker,
        url: url,
        createDailyPriceObservableAry: createDailyPriceObservableAry,
        searchTicker: searchTicker
    };
};

my.dailyPrice = function(date, high, low, open, close, volume) {
    var self = this;
    self.date = ko.observable(date);
    self.high = ko.observable(high);
    self.low = ko.observable(low);
    self.open = ko.observable(open);
    self.close = ko.observable(close);
    self.volume = ko.observable(volume);
    self.avg = ko.computed(() => {
        return ((parseFloat(self.high()) + parseFloat(self.low())) / 2).toFixed(4);
    });
}