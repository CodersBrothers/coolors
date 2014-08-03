var coolors = require('./coolors');

var msg = 'Hello world';
console.log(coolors(msg));
console.log(coolors(msg, 'hidden'));
console.log(coolors(msg, {
    text: 'yellow'
}));
console.log(coolors(msg, {
    text: 'yellow',
    background: 'blue'
}));
console.log(coolors(msg, {
    text: 'yellow',
    background: 'blue',
    bold: true
}));
console.log(coolors(msg, {
    text: 'yellow',
    background: 'red',
    bold: true,
    underline: true,
    inverse: true,
    strikethrough: true
}));

coolors.rainbownLog = function rainbownLog(msg){
    var colorsText = coolors.filters().text;
    colorsText = colorsText.splice(3);
    var lengthColorsText = colorsText.length;
    var msgInLetters = msg.split('');
    var rainbownEndText = '';
    var i = 0;
    msgInLetters.forEach(function(letter){
        i++;
        rainbownEndText += coolors(letter, colorsText[i]);
        if(i === lengthColorsText) i = 0;
    });
    return rainbownEndText;
};
console.log(coolors.rainbownLog('This its a creative example extending core'));