var supportsColor = require('supports-color');

var styles = {
    decorators: {
        bold: [1, 22],
        dim: [2, 22],
        italic: [3, 23],
        underline: [4, 24],
        inverse: [7, 27],
        hidden: [8, 28],
        strikethrough: [9, 29]
    },
    text: {
        white: [37, 39],
        gray: [90, 39],
        black: [30, 39],
        red: [31, 39],
        green: [32, 39],
        yellow: [33, 39],
        blue: [34, 39],
        magenta: [35, 39],
        cyan: [36, 39]
    },
    background: {
        BGwhite: [47, 49],
        BGgray: ['49;5;8', 49],
        BGblack: [40, 49],
        red: [41, 49],
        green: [42, 49],
        yellow: [43, 49],
        blue: [44, 49],
        magenta: [45, 49],
        cyan: [46, 49]
    }
};

var stylesKeys = {};
Object.keys(styles).forEach(function(style){
    stylesKeys[style] = Object.keys(styles[style]);
});

function getStringOfCode(code){
    // '\x1B[37m' | \u001b[37m
    return '\u001b[' + code + 'm';
}

function generateOpenClose(codes, msg){
    return getStringOfCode(codes[0]) + msg + getStringOfCode(codes[1]);
}

function coolors(msg, config){
    if(supportsColor) {
        switch (typeof config) {
            case 'string':
                config = styles.decorators[config] || styles.text[config] || styles.background[config];
                if (config) {
                    msg = generateOpenClose(config, msg);
                }
                break;
            case 'object':
                var decorators = Object.keys(styles.decorators);
                decorators.forEach(function (decorator) {
                    if (config[decorator]) {
                        msg = generateOpenClose(styles.decorators[decorator], msg);
                    }
                });
                ['text', 'background'].forEach(function (option) {
                    if (config[option] && styles[option][config[option]]) {
                        msg = generateOpenClose(styles[option][config[option]], msg);
                    }
                });
                break;
        }
    }
    return msg;
}
coolors.filters = function(){
    return stylesKeys;
};
module.exports = coolors;