/// ts:ref=app.ts
/// <reference path="./app.ts"/> ///ts:ref:generated

class map {
    stringMap: { [s: string]: string; } = {};
    numberMap: { [s: number]: string; } = <any>{};
}

app.config(function ($mdThemingProvider) {

    var bases = [{
        alpha: 0.13,
        name: "50"
    }, {
        alpha: 0.31,
        name: "100"
    }, {
        alpha: 0.50,
        name: "200"
    }, {
        alpha: 0.7,
        name: "300"
    }, {
        alpha: 0.85,
        name: "400"
    }, {
        alpha: 1,
        name: "500"
    }, {
        alpha: 0.91,
        name: "600"
    }, {
        alpha: 0.81,
        name: "700"
    }, {
        alpha: 0.71,
        name: "800"
    }, {
        alpha: 0.52,
        name: "900"
    }, {
        alpha: 0.61,
        name: "A100"
    }, {
        alpha: 0.58,
        name: "A200"
    }, {
        alpha: 0.49,
        name: "A400"
    }, {
        alpha: 0.41,
        name: "A700"
    }]


    function RGBAtoRGB(r, g, b, a, r2, g2, b2) {
        var r3 = Math.round(((1 - a) * r2) + (a * r))
        var g3 = Math.round(((1 - a) * g2) + (a * g))
        var b3 = Math.round(((1 - a) * b2) + (a * b))
        console.log("rgb(" + r3 + "," + g3 + "," + b3 + ")");
        return "rgb(" + r3 + "," + g3 + "," + b3 + ")";
    }

    function RGBtoHEX(rgbString) {
        var rgb = rgbString.split("(")[1].split(")")[0];
        rgb.split(",");
        console.log(rgb);

        //var hex = rgb.map(function(x) {
        //    x = parseInt(x).toString(16);
        //    return (x.length==1) ? "0"+x : x;
        //});

    }

    function blackText(r, g, b) {
        if (r * 0.299 + g * 0.587 + b * 0.114 > 186) {
            return true
        } else {
            return false
        }
    }

    function generateMaterialPalette(r, g, b) {
        var palette = {};
        var light = [];
        var dark = [];

        for (var i = 0; i < bases.length; i++) {
            var a = bases[i].alpha
            var color = RGBAtoRGB(r, g, b, a, 255, 255, 255);
            RGBtoHEX(color);
            palette[bases[i].name] = color;

        }
        if (blackText(r, g, b))
            palette['contrastDefaultColor'] = 'dark';
        else
            palette['contrastDefaultColor'] = 'light';

        palette['contrastDarkColors'] = '50 100 200 300 A100'
        palette['contrastStrongLightColors'] = '500 600 A200'

        return palette;
    }

    $mdThemingProvider.definePalette('userColor', generateMaterialPalette(103, 69, 135));

    $mdThemingProvider.theme('default')
        .primaryPalette('userColor')
});
