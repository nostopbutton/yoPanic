'use strict';

var designBuildFilter = angular.module('panicApp.designBuildFilters', []);

designBuildFilter.filter('filterSets', function () {

    return function (sets, filter) {

        var filteredResult = [];

        for (var filterFabric in filter)
            for (var fabricSet in sets) {
                if (filter[filterFabric].setId == sets[fabricSet].setId) {
                    filteredResult.push(sets[fabricSet]);
                    break;
                }
            }

        return filteredResult;

    };
});

designBuildFilter.filter('rollover', function () {
    return function (img) {
        alert('rollover: ' + img.replace(/_bk$/, ""));
        return img.replace(/_bk$/, "");
    };
});

designBuildFilter.filter('designString', function () {
    return function (design) {
        var returnString = JSON.stringify(design);
//    alert("Here");
//    for (var element in design){
//      returnString += element.type + element.id + "\n";
//    }
        console.log("Returning---: " + returnString);
        return returnString;
    };
});

designBuildFilter.filter('path', function () {
    return function (name, pre, post) {
        return (name && pre + name + post || '');
//        return img.replace(/_bk$/, "");
    };
});

designBuildFilter.filter('lookup', function () {
    return function (design) {

        var code = design.type+"-"+design.id+"-"+design.size;
//        console.log("design.fabric: " + design.fabric);
        if("000" === design.fabric)
        {
            if("blt" === design.type){
                return "No belt selected";
            } else if (("ext" === design.type)&&("002" ===design.id)){
                return "No peplum selected";
            } else if (("ext" === design.type)&&("003" ===design.id)){
                return "No rosetta selected";
            }

        }
        var codes = [{"id":"nek-001-00","label":"Bateau neck"},
            {"id":"nek-001-01","label":"Short bateau neck swing dress"},
            {"id":"nek-001-02","label":"Knee length bateau neck swing dress"},
            {"id":"nek-001-04","label":"Long bateau neck swing dress"},
            {"id":"nek-001-10","label":"Top with bateau neck"},
            {"id":"nek-002-00","label":"Scoop neck"},
            {"id":"nek-002-10","label":"Top with scoop neck"},
            {"id":"nek-003-00","label":"V-slit neck"},
            {"id":"nek-003-10","label":"Top with V-slit neck"},
            {"id":"nek-004-00","label":"Tailored wrap"},
            {"id":"nek-004-10","label":"Tailored wrap top"},
            {"id":"nek-005-00","label":"V neck"},
            {"id":"nek-005-01","label":"Short V neck swing dress"},
            {"id":"nek-005-02","label":"Knee length V neck swing dress"},
            {"id":"nek-005-04","label":"Long V neck swing dress"},
            {"id":"nek-005-10","label":"Top with V neck"},
            {"id":"nek-006-00","label":"Dolomon top"},
            {"id":"nek-007-00","label":"V neck Dolomon top"},
            {"id":"nek-008-00","label":"Bustier top"},
            {"id":"nek-008-01","label":"Short bustier dress"},
            {"id":"nek-008-02","label":"Knee length bustier dress"},
            {"id":"nek-008-04","label":"long bustier dress"},
            {"id":"nek-009-00","label":"Asymmetrical neckline"},
            {"id":"nek-010-00","label":"Scoop neckline"},
            {"id":"nek-011-00","label":"Low scoop neckline"},
            {"id":"nek-009-01","label":"Short swoosh dress with an asymmetrical neckline"},
            {"id":"nek-010-01","label":"Short swoosh dress with scoop neckline"},
            {"id":"nek-011-01","label":"Short swoosh dress with a low scoop neckline"},
            {"id":"nek-009-02","label":"Knee length swoosh dress with an asymmetrical neckline"},
            {"id":"nek-010-02","label":"Knee length swoosh dress with scoop neckline"},
            {"id":"nek-011-02","label":"Knee length swoosh dress with a low scoop neckline"},
            {"id":"nek-009-04","label":"Long swoosh dress with an asymmetrical neckline"},
            {"id":"nek-010-04","label":"Long swoosh dress with scoop neckline"},
            {"id":"nek-011-04","label":"Long swoosh dress with a low scoop neckline"},
            {"id":"nek-014-00","label":"Shift dress with scoop neckline"},
            {"id":"nek-015-00","label":"Shift dress with kaftan style neckline"},
            {"id":"nek-014-03","label":"Mid length shift dress with scoop neckline"},
            {"id":"nek-015-03","label":"Mid length shift dress with kaftan style neckline"},
            {"id":"nek-017-02","label":"Knee Length Shirt dress with collar"},
            {"id":"nek-018-02","label":"Knee Length Collarless Shirt dress "},
            {"id":"nek-014-02","label":"Knee length shift dress with scoop neckline"},
            {"id":"nek-015-02","label":"Knee length shift dress with kaftan style neckline"},
            {"id":"nek-017-05","label":"Maxi shirt dress with collar"},
            {"id":"nek-018-05","label":"Maxi collarless Shirt dress  "},
            {"id":"slv-000-00","label":"Sleeveless"},
            {"id":"slv-002-00","label":"Cap sleeves"},
            {"id":"slv-006-00","label":"Elbow length sleeves"},
            {"id":"slv-009-00","label":"Flared sleeves"},
            {"id":"slv-001-00","label":"Cap sleeves"},
            {"id":"slv-008-00","label":"Bell sleeves"},
            {"id":"slv-011-00","label":"Long sleeved"},
            {"id":"slv-016-00","label":"Short shirt sleeves"},
            {"id":"skt-001-00","label":"pencil"},
            {"id":"skt-002-00","label":"pencil - ruffle"},
            {"id":"skt-005-00","label":"swing"},
            {"id":"skt-007-00","label":"flare"},
            {"id":"skt-001-01","label":"Short pencil skirt"},
            {"id":"skt-002-01","label":"Short pencil skirt with ruffle"},
            {"id":"skt-005-01","label":"Short swing skirt"},
            {"id":"skt-007-01","label":"Short flare skirt"},
            {"id":"skt-001-02","label":"Knee length pencil skirt"},
            {"id":"skt-002-02","label":"Knee length pencil skirt with ruffle"},
            {"id":"skt-005-02","label":"Knee length swing skirt"},
            {"id":"skt-007-02","label":"Knee length flare skirt"},
            {"id":"skt-001-04","label":"Long pencil skirt"},
            {"id":"skt-002-04","label":"Long pencil skirt with ruffle"},
            {"id":"skt-005-04","label":"Long swing skirt"},
            {"id":"skt-007-04","label":"Long flare skirt"},
            {"id":"ext-000-00","label":"None"},
            {"id":"ext-002-00","label":"Peplum"},
            {"id":"ext-003-00","label":"Rosetta"},
            {"id":"blt-000-00","label":"No belt"},
            {"id":"blt-002-00","label":"Ribbon belt"},
            {"id":"blt-004-00","label":"Obi belt"},
            {"id":"blt-003-00","label":"Silk belt"}]
//        console.log("code: " + code);
        var result = _.find(codes, function (item) {
            return item.id == code;
        })
//        console.log("result: " + result);
//        console.log("result && result.label: " + (result && result.label));
        return (result && result.label ? result.label : code);
    };
});



designBuildFilter.filter('fablookup', function () {
    return function (design) {

        var code = design.fabric;
//        console.log("design.fabric: " + design.fabric);
        if("000" === design.fabric)
        {
            return " ";
        }
        var codes = [{"id":"003","label":"Red viscose crepe"},
            {"id":"011","label":"Black viscose crepe"},
            {"id":"013","label":"Aubergine viscose crepe"},
            {"id":"010","label":"Teal viscose crepe"},
            {"id":"008","label":"Cream viscose crepe"},
            {"id":"014","label":"Midnight blue viscose crepe"},
            {"id":"085","label":"Turquoise silk"},
            {"id":"087","label":"Cobalt blue silk"},
            {"id":"088","label":"Hot pink silk"},
            {"id":"089","label":"Coral silk"},
            {"id":"091","label":"Pewter"},
            {"id":"103","label":"Red leather"},
            {"id":"108","label":"Cream leather"},
            {"id":"111","label":"Black leather"},
            {"id":"112","label":"Metallic slate leather"},
            {"id":'113',"label":"Aubergine leather"},
            {"id":'114',"label":"Cobalt blue leather"},
            {"id":"115","label":"Navy leather"},
            {"id":"116","label":"Hot pink leather"},
            {"id":"118","label":"Stone leather"},
            {"id":"120","label":"Black faux-leather"},
            {"id":"300","label":"Printed cotton rose blue"},
            {"id":"301","label":"Printed cotton rose red"},
            {"id":"302","label":"Printed cotton rose teal"},
            {"id":"303","label":"Printed cotton rose pink"},
            {"id":"304","label":"Printed cotton rose monochrome"},
            {"id":"305","label":"Printed cotton rose yellow"},
            {"id":"306","label":"Printed cotton zebra blue"},
            {"id":"307","label":"Printed cotton zebra red & yellow"},
            {"id":"308","label":"Printed cotton zebra teal"},
            {"id":"309","label":"Printed cotton zebra pink"},
            {"id":"310","label":"Printed cotton zebra black"},
            {"id":"311","label":"Printed cotton zebra grey"},
            {"id":"312","label":"Printed cotton zebra yellow"},
            {"id":"400","label":"Printed silk rose blue"},
            {"id":'401',"label":"Printed silk rose red"},
            {"id":"402","label":"Printed silk rose teal"},
            {"id":'403',"label":"Printed silk rose pink"},
            {"id":"404","label":"Printed silk rose monochrome"},
            {"id":"405","label":"Printed silk rose yellow"},
            {"id":"406","label":"Printed silk zebra blue"},
            {"id":"407","label":"Printed silk zebra red & yellow"},
            {"id":"408","label":"Printed silk zebra teal"},
            {"id":'409',"label":"Printed silk zebra pink"},
            {"id":"410","label":"Printed silk zebra black"},
            {"id":"411","label":"Printed silk zebra grey"},
            {"id":"412","label":"Printed silk zebra yellow"}]

//        console.log("code: " + code);
        var result = _.find(codes, function (item) {
            return item.id == code;
        })
//        console.log("result: " + result);
//        console.log("result && result.label: " + (result && result.label));
        return (result && result.label ? result.label : code);
    };
});

designBuildFilter.filter('trimlookup', function () {
    return function (trim) {

//        var code = design.trim;
//        console.log("trim: " + trim);
        if("120" === trim) {
            return " with black faux-leather trim";
        } else {
            return "";
        }
//        }
//        var codes = [{"id":"120","label":"Black faux leather trim"}
//          ]
//
//        console.log("code: " + code);
//        var result = _.find(codes, function (item) {
//            return item.id == code;
//        })
//        console.log("result: " + result);
//        console.log("result && result.label: " + (result && result.label));
//        return (result && result.label ? result.label : code);
    };
});
