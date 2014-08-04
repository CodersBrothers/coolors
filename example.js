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
 * (Stupids examples :D)
 */
function ligthRed(msg){
    return '\u001b[91m' + msg + '\u001b[39m';
}
coolors.addPlugin('ligthRed', ligthRed);
console.log(coolors('New color', 'ligthRed'));

function rainbowLog(msg){
    var colorsText = coolors.availableStyles().text;
    var rainbowColors = colorsText.splice(3);
    var lengthRainbowColors = rainbowColors.length;
    var msgInLetters = msg.split('');
    var rainbowEndText = '';
    var i = 0;
    msgInLetters.forEach(function(letter){
        if(letter != ' '){
            if(i === lengthRainbowColors) i = 0;
            rainbowEndText += coolors(letter, rainbowColors[i]);
            i++;
        }else{
            rainbowEndText += ' ';
        }
    });
    return rainbowEndText;
}
coolors.addPlugin('rainbow', rainbowLog);
console.log(coolors('This its a creative example extending core with a cool rainbow style', 'rainbow'));