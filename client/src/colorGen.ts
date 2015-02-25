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
        alpha: 1.03,
        name: "600"
    }, {
        alpha: 1.08,
        name: "700"
    }, {
        alpha: 1.12,
        name: "800"
    }, {
        alpha: 1.195,
        name: "900"
    }, {
        // Doesn't get close right now, may come back to these later
        alpha: 0.34,
        name: "A100"
    }, {
        alpha: 0.0,
        name: "A200"
    }, {
        alpha: 0.0,
        name: "A400"
    }, {
        alpha: 0.0,
        name: "A700"
    }]

    function RGBAtoRGB(r, g, b, a, r2, g2, b2) {
        var r3 = Math.round(((1 - a) * r2) + (a * r))
        var g3 = Math.round(((1 - a) * g2) + (a * g))
        var b3 = Math.round(((1 - a) * b2) + (a * b))
        if (r3 < 0) {
            r3 = r3 * (-1);
        }
        if (g3 < 0) {
            g3 = g3 * (-1);
        }
        if (b3 < 0) {
            b3 = b3 * (-1);
        }
        return [r3, g3, b3];
        //return "rgb(" + r3 + "," + g3 + "," + b3 + ")";
    }

    function RGBtoHEX(rgblist) {
        //var rgb = rgbString.split("(")[1].split(")")[0];
        //var list  = rgb.split(",");

        var temp = rgblist.map(function(x) {
            x = parseInt(x).toString(16);
            return (x.length==1) ? "0"+x : x;
        });
        var hex = '#'+temp.join("");
        return hex;

    }

    function blackText(r, g, b) {
        if (parseInt(r) * 0.299 + parseInt(g) * 0.587 + parseInt(b) * 0.114 > 186) {
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
            if (blackText(color[0], color[1], color[2])) {
                dark.push(bases[i].name)
            } else {
                light.push(bases[i].name)
            }
            if (i <= 13) {
                var colorstr = RGBtoHEX(color);
                }
            palette[bases[i].name] = colorstr;

        }
        if (blackText(r, g, b))
            palette['contrastDefaultColor'] = 'dark';
        else
            palette['contrastDefaultColor'] = 'light';

        palette['contrastDarkColors'] = dark.join(" ");
        palette['contrastStrongLightColors'] = light.join(" ");

        return palette;
    }

    var randR:number = Math.floor(Math.random() * 256);
    var randG:number = Math.floor(Math.random() * 256);
    var randB:number = Math.floor(Math.random() * 256);

    // My twitch color: 103, 69, 135
    //$mdThemingProvider.definePalette('userColor', generateMaterialPalette(63, 81, 181));
    $mdThemingProvider.definePalette('userColor', generateMaterialPalette(randR, randG, randB));

    $mdThemingProvider.theme('default')
        .primaryPalette('userColor')
});
