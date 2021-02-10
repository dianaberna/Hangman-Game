
// initialize word array
var words = ["HOME", "PANCAKE", "UNNECESSARY", "DOG"];
// initialize array of suggestions
var suggestions = ["Where do you live", "Perfect with maple syrup", "!necessary", "The best friend of human"];
// randomly pick a word from the words array
var word = words[Math.floor(Math.random() * words.length)];
// save the position of the extracted word to access the array of suggestions
var position = words.indexOf(word);
// print for debug
console.log(word);

// draw hangman canvas with HTMLCanvasElement methods
var c = document.getElementById("myCanvas");
// assign a drawing context on the canvas
var context = c.getContext("2d");
// start to draw in the canvas with CanvasRenderingContext2D methods 
context.beginPath();
// draw body, arms and legs
context.moveTo(93,303);
context.lineTo(151,303);
context.moveTo(123,303);
context.lineTo(123,110);
context.moveTo(123,110);
context.lineTo(247,110);
context.moveTo(247,110);
context.lineTo(247,141);
context.moveTo(247, 162.5 - 23.5);
// draw circle/head
context.bezierCurveTo(247 + (0.5522847498307936 * 27), 162.5 - 23.5,  247 + 27, 162.5 - (0.5522847498307936 * 23.5), 247 + 27, 162.5);
context.bezierCurveTo(247 + 27, 162.5 + (0.5522847498307936 * 23.5), 247 + (0.5522847498307936 * 27), 162.5 + 23.5, 247, 162.5 + 23.5);
context.bezierCurveTo(247 - (0.5522847498307936 * 27), 162.5 + 23.5, 247 - 27, 162.5 + (0.5522847498307936 * 23.5), 247 - 27, 162.5);
context.bezierCurveTo(247 - 27, 162.5 - (0.5522847498307936 * 23.5), 247 - (0.5522847498307936 * 27), 162.5 - 23.5, 247, 162.5 - 23.5);
// actually draws the path you have defined with all those moveTo() and lineTo() methods
context.stroke();

// print segment for empty word
for (var i = 0; i < word.length; i++) {
    var node = document.createElement("span");
    var textnode = document.createTextNode("_");
    node.appendChild(textnode);
    document.getElementById("randomWord").appendChild(node);
}

// print keyboard
for( var i=65; i<= 90; i++){
    var node = document.createElement("button");
    node.setAttribute("onclick", "check("+i+")");
    var textnode = document.createTextNode(String.fromCharCode(i));
    node.appendChild(textnode);
    document.getElementById("keyboard").appendChild(node);
}

var length = word.length;
// initialize the counters for the game
var countOccorrenze = 0;
var countErrors = 0;
var flagTrovato = 0;

// reload page for new play
function newPlay(){
    location.reload();
}

// function for check char of the word
function check(onechar){
    flagTrovato = 0;
    onechar = String.fromCharCode(onechar); 
    // iterates the word array to find if onechar is a present character
    for(var i = 0; i < word.length; i++){
        var span = document.getElementById("randomWord").getElementsByTagName("span")[i].innerHTML;
        // if the character is present and has not yet been identified
        if(word[i] == onechar && span == "_"){
            // replace the segment character with the letter
            document.getElementById("randomWord").getElementsByTagName("span")[i].innerHTML = onechar;
            // updates the occurrence count of the letter
            countOccorrenze ++;
            flagTrovato = 1;
        }else if(word[i] == onechar && span != "-"){
            flagTrovato = 1;
        }
    }
    // error case management, character not present in the word
    if(flagTrovato == 0){
        // updates the error counter
        countErrors++;
        document.getElementById("errors").innerHTML = countErrors;
        // add body on canvas
        var c = document.getElementById("myCanvas");
        var context = c.getContext("2d");
        context.moveTo(247,187);
        context.lineTo(247,245);
        context.stroke();
        if(countErrors == 2){
            // print a tip
            // add arms on canvas
            var c = document.getElementById("myCanvas");
            var context = c.getContext("2d");
            context.moveTo(247,187);
            context.lineTo(230,208);
            context.moveTo(247,189);
            context.lineTo(263,207);
            context.stroke();
            document.getElementById("result").innerHTML = "Suggestion: "+suggestions[position];
        }else if(countErrors == 3){
            // game over 
            // add legs on canvas
            var c = document.getElementById("myCanvas");
            var context = c.getContext("2d");
            context.moveTo(246,245);
            context.lineTo(233,268);
            context.moveTo(248,245);
            context.lineTo(260,264);
            context.stroke();
            document.getElementById("result").innerHTML = "Game over :(";
            document.getElementById("new").style.display = "inline";
        }
    }
    // check the winning condition, that is, I completed the word by guessing all the letters
    // and remaining with a number of errors less than or equal to two
    if(countOccorrenze == length){
        document.getElementById("result").innerHTML = "Win!";
        document.getElementById("new").style.display = "inline";
    }
}