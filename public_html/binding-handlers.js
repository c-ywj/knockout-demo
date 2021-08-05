(function () {
    ko.bindingHandlers.enter = {
        init: function (element, valueAccessor) {
            console.log('enter custom binding init',);
            // Start visible/invisible according to initial value
            var inputTicker = valueAccessor();
        },
        update: function (element, valueAccessor, allBindingsAccessor) {

            console.log('enter custom binding update');
            // On update, fade in/out
            var inputTicker = valueAccessor();
            if(inputTicker().length > 0)
                my.vmi.searchTicker();

        }
    };
})();
