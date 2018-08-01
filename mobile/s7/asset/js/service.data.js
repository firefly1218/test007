var dataService = (function () {
    
    dataService = {};
    
    dataService._option = {};
    
    dataService._option["login"] = {
        type: "POST",
        url: "/phidata/s7/login/"
    }
    
    dataService._option["device-count-fresh"] = {
        type: "GET",
        url: "/phidata/s7/query/totaluserMac/"
    }
    
    dataService._option["total-index"] = {
        type: "GET",
        url: "/phidata/s7/totaldwmRate/"
    };
    
    dataService._option["device-compose"] = {
        type: "GET",
        url: "/phidata/s7/deviceComp/"
    };
    
    dataService._option["index-day-query"] = {
        type: "GET",
        url: "/phidata/s7/query/dailylivingRate/"
    }
    dataService._option["index-week-query"] = {
        type: "get",
        url: "/phidata/s7/query/weeklivingRate/"
    }
    
    dataService._option["index-month-query"] = {
        type: "get",
        url: "/phidata/s7/query/monthlivingRate/"
    }
    
    dataService._option["device-compose-query"] = {
        type: "GET",
        url: "/phidata/s7/deviceComp/"
    }
    
    dataService._option["device-active"] = {
        type: "GET",
        url: "/phidata/s7/livingDevice/"
    };
    dataService._option["device-newly"] = {
        type: "GET",
        url: "/phidata/s7/addDevice/"
    };
    
    dataService._option["device-keep"] = {
        type: "GET",
        url: "/phidata/s7/remainDevice/"
    };
    dataService._option["user-map"] = {
        type: "GET",
        url: "/phidata/s7/totalUserDistri/"
    };
    
    dataService._option["user-tgi"] = {
        type: "GET",
        url: "/phidata/s7/userTGIDistri/ "
    };
    
    dataService._option["user-sex-query"] = {
        type: "GET",
        url: "/phidata/s7/querydata/sexDistri/"
    };
    
    dataService._option["user-age-query"] = {
        type: "GET",
        url: "/phidata/s7/querydata/ageDistri/"
    };
    dataService._option["user-region-query"] = {
        type: "GET",
        url: "/phidata/s7/querydata/regionDistri/"
    };
    
    dataService._option["user-region-age-query"] = {
        type: "GET",
        url: "/phidata/s7/querydata/ageRegionTGI/"
    };
    
    dataService._option["user-sex-age-query"] = {
        type: "GET",
        url: "/phidata/s7/querydata/sexAgeTGI/"
    };
    
    dataService._option["user-sex-region-query"] = {
        type: "GET",
        url: "/phidata/s7/querydata/sexRegionTGI/"
    };
    
    dataService._option["health-prev-load"] = {
        type: "GET",
        url: "/phidata/s7/userHealth/"
    };
    
    dataService._option["health-body-query"] = {
        type: "GET",
        url: "/phidata/s7/querydata/bodytype/"
    };
    
    dataService._option["health-map-query"] = {
        type: "GET",
        url: "/phidata/s7/querydata/healthindex/"
    };
    
    dataService.request = function (name, param) {
        var option = dataService._option[name];
        if (option) {
            return $.ajax($.extend({}, option, !param ? {} : {data: param}));
        } else {
            throw new Error("No available request service!");
        }
    };
    
    return dataService;
})();