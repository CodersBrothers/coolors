var supportsColor = require('supports-color');
var ansi = require('ansi-styles');

// Use ansi-styles to build function that returns coloured strings
var plugins = {};
Object.keys(ansi).forEach(function(filter){
    plugins[filter] = function(msg){
        return ansi[filter].open + msg + ansi[filter].close;
    }
});

// Map default styles
var styles = {
    decorators: {
        bold: plugins.bold,
        dim: plugins.dim,
        italic: plugins.italic,
        underline: plugins.underline,
        inverse: plugins.inverse,
        hidden: plugins.hidden,
        strikethrough: plugins.strikethrough
    },
    text: {
        white: plugins.white,
        gray: plugins.gray,
        black: plugins.black,
        red: plugins.red,
        green: plugins.green,
        yellow: plugins.yellow,
        blue: plugins.blue,
        magenta: plugins.magenta,
        cyan: plugins.cyan
    },
    background: {
        white: plugins.bgWhite,
        black: plugins.bgBlack,
        red: plugins.bgRed,
        green: plugins.bgGreen,
        yellow: plugins.bgYellow,
        blue: plugins.bgBlue,
        magenta: plugins.bgMagenta,
        cyan: plugins.bgCyan
    }
};

// Store name of styles for method availableStyles
var stylesKeys = {};
Object.keys(styles).forEach(function(style){
    stylesKeys[style] = Object.keys(styles[style]);
});

/**
 * CREATE A COOL LOG
 *
 * @param {String} msg
 * @param {String|Object} config
 */
function coolors(msg, config){
    if(supportsColor) {
        switch (typeof config) {
            case 'string':
                    if(plugins[config]){
                        msg = plugins[config](msg);
                    }
                break;
            case 'object':
                var decorators = Object.keys(styles.decorators);
                decorators.forEach(function (decorator) {
                    if (config[decorator]) {
                        msg = styles.decorators[decorator](msg);
                    }
                });
                ['text', 'background'].forEach(function (option) {
                    if (config[option] && styles[option][config[option]]) {
                        msg = styles[option][config[option]](msg);
                    }
                });
                break;
        }
    }
    return msg;
}

/**
 * EXTEND COOLORS
 *
 * @param {String} name Plugin name
 * @param {Function} fn Function for process
 */
coolors.addPlugin = function(name, fn){
    plugins[name] = fn;
};

/**
 * GET STYLES THAT WE CAN USE
 */
coolors.availableStyles = function(){
    return stylesKeys;
};

module.exports = coolors;