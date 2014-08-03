var coolors = require('./coolors');
var msg = 'My cool console log';

/**
 * SIMPLE
 */
console.log(coolors(msg, 'red'));
console.log(coolors(msg, 'bgBlue'));
var msgWordColors = msg.split(' ');
console.log(coolors(msgWordColors[0], 'green') + ' ' + coolors(msgWordColors[1], 'bgMagenta') + ' ' + coolors(msgWordColors[2], 'bold') + ' ' + coolors(msgWordColors[3], 'strikethrough'));

/**
 * CONFIGURATION
 */
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

/**
 * EXTENDING
 * (Stupids example :D)
 */
function ligthRed(msg){
    return '\u001b[91m' + msg + '\u001b[39m';
}
coolors.addPlugin('ligthRed', ligthRed);
console.log(coolors('New color', 'ligthRed'));

function rainbown(msg){
    var colorsText = coolors.availableStyles().text;
    var rainbownColors = colorsText.splice(3);
    var lengthColorsText = rainbownColors.length;
    var msgInLetters = msg.split('');
    var rainbownEndText = '';
    var i = 0;
    msgInLetters.forEach(function(letter){
        if(letter != ' '){
            if(i === lengthColorsText) i = 0;
            rainbownEndText += coolors(letter, rainbownColors[i]);
            i++;
        }else{
            rainbownEndText += ' ';
        }
    });
    return rainbownEndText;
}
coolors.addPlugin('rainbown', rainbown);
console.log(coolors('This its a creative example extending core with a cool rainbown style', 'rainbown'));