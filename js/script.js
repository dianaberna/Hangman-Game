
init();
var pokemon;
var position;
var length;
var numberCharactersEntered;
var countErrors;
var found;
var keyboardLayout;
var playsWon, playsLost;

/* 
    Functions to initialize the game
*/

// function to reset the counters of the games played
function init(){
    playsWon=0;
    playsLost=0;
    // print score
    document.getElementById("won").innerHTML = playsWon;
    document.getElementById("lost").innerHTML = playsLost;
    newPlay();
}
 
function resolve(){
    return document.getElementById("hiddenPrint").textContent;
}

// function for retrieve new pokemon and call the reset game
function newPlay(){
    newPokemon();
    setTimeout(function() {
        pokemon=resolve();
        // print for debug
        console.log(pokemon);
        setNewPlay(pokemon);
    }, 1000);
}

// function for clean and set all data for a new play
function setNewPlay(){
    // call the function for draw on canvas 
    drawHangman();
    // reset the segment of randow word
    document.getElementById("randomWord").innerHTML = '';
    // print segment for empty word
    for (var i = 0; i < pokemon.length; i++) {
        var node = document.createElement("span");
        var textnode = document.createTextNode("_");
        node.appendChild(textnode);
        document.getElementById("randomWord").appendChild(node);
    }
    loadLayout();
    // save the pokemon length
    length = pokemon.length;
    // initialize the counters for the game
    numberCharactersEntered = 0;
    countErrors = 0;
    found = 0;
    document.getElementById("result").innerHTML = '';
    document.getElementById("errors").innerHTML = '';
    // enable all key of keyboard
    disableKeyboard(false);
}

/*
    Functions for keyboard 
*/

// function for print the keyboard layout selected by radio button
function keyboard(option){
    // call functon reset for empty the lines of the keyboard layout
    reset();
    // print the first line
    for(var i=0; i<10; i++){
        var valInput = keyboardLayout.layout[option].key[i];
        var node = document.createElement("button");
        node.setAttribute("onclick", "check('"+valInput+"')");
        node.setAttribute("id",valInput);
        var textnode = document.createTextNode(valInput);
        node.appendChild(textnode);
        document.getElementById("keyboard-row1").appendChild(node);
    }
    // print the second line
    for(var i=10; i<19; i++){
        var valInput = keyboardLayout.layout[option].key[i];
        var node = document.createElement("button");
        node.setAttribute("onclick", "check('"+valInput+"')");
        node.setAttribute("id",valInput);
        var textnode = document.createTextNode(valInput);
        node.appendChild(textnode);
        document.getElementById("keyboard-row2").appendChild(node);
    }
    // print the third line
    for(var i=19; i<26; i++){
        var valInput = keyboardLayout.layout[option].key[i];
        var node = document.createElement("button");
        node.setAttribute("onclick", "check('"+valInput+"')");
        node.setAttribute("id",valInput);
        var textnode = document.createTextNode(valInput);
        node.appendChild(textnode);
        document.getElementById("keyboard-row3").appendChild(node);
    }
}

// function for load the json layout
function loadLayout(callback) {   
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'keyboard.json', true);
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            keyboardLayout=JSON.parse(xobj.responseText);
          }
    };
    xobj.send(null);  
}

// function for reset the keyboard layout
function reset(){
    document.getElementById("keyboard-row1").innerHTML = '';
    document.getElementById("keyboard-row2").innerHTML = '';
    document.getElementById("keyboard-row3").innerHTML = '';
}

// function to disable/enable all keys on the keyboard
function disableKeyboard(option){
    for(var i=0; i<26; i++){
        document.querySelectorAll('.keyboard button').forEach(elem => {
            elem.disabled = option;
          });
    }  
}

/* 
    Functions for draw on canvas Hangman
*/

function drawHangman(){
    // draw hangman canvas with HTMLCanvasElement methods
    var c = document.getElementById("myCanvas");
    // assign a drawing context on the canvas
    var context = c.getContext("2d");
    // reset canvas 
    context.clearRect(0, 0, 400, 350);
    // start to draw in the canvas with CanvasRenderingContext2D methods 
    context.beginPath();
    // draw scaffold
    context.moveTo(93,303);
    context.lineTo(151,303);
    context.moveTo(123,303);
    context.lineTo(123,110);
    context.moveTo(123,110);
    context.lineTo(247,110);
    context.moveTo(247,110);
    context.lineTo(247,141);
    context.moveTo(247, 162.5 - 23.5);
    // draw head
    context.bezierCurveTo(247 + (0.5522847498307936 * 27), 162.5 - 23.5,  247 + 27, 162.5 - (0.5522847498307936 * 23.5), 247 + 27, 162.5);
    context.bezierCurveTo(247 + 27, 162.5 + (0.5522847498307936 * 23.5), 247 + (0.5522847498307936 * 27), 162.5 + 23.5, 247, 162.5 + 23.5);
    context.bezierCurveTo(247 - (0.5522847498307936 * 27), 162.5 + 23.5, 247 - 27, 162.5 + (0.5522847498307936 * 23.5), 247 - 27, 162.5);
    context.bezierCurveTo(247 - 27, 162.5 - (0.5522847498307936 * 23.5), 247 - (0.5522847498307936 * 27), 162.5 - 23.5, 247, 162.5 - 23.5);
    // actually draws the path you have defined with all those moveTo() and lineTo() methods
    context.stroke();
}

function drawBody(){
    var c = document.getElementById("myCanvas");
    var context = c.getContext("2d");
    context.moveTo(247,187);
    context.lineTo(247,245);
    context.stroke();
}

function drawArms(){
    var c = document.getElementById("myCanvas");
    var context = c.getContext("2d");
    context.moveTo(247,187);
    context.lineTo(230,208);
    context.moveTo(247,189);
    context.lineTo(263,207);
    context.stroke();
}

function drawLegs(){
    var c = document.getElementById("myCanvas");
    var context = c.getContext("2d");
    context.moveTo(246,245);
    context.lineTo(233,268);
    context.moveTo(248,245);
    context.lineTo(260,264);
    context.stroke();
}

/*
    Function for check new key pressed
*/

function check(onechar){
    found = 0;
    document.getElementById(onechar).disabled = true;
    // iterates the word array to find if onechar is a present character
    for(var i = 0; i < pokemon.length; i++){
        var span = document.getElementById("randomWord").getElementsByTagName("span")[i].innerHTML;
        // if the character is present and has not yet been identified
        if(pokemon[i] === onechar && span == "_"){
            // replace the segment character with the letter
            document.getElementById("randomWord").getElementsByTagName("span")[i].innerHTML = onechar;
            // updates the occurrence count of the letter
            numberCharactersEntered ++;
            found = 1;
        }else if(pokemon[i] === onechar && span != "-"){
            found = 1;
        }
    }
    // error case management, character not present in the word
    if(found == 0){
        // updates the error counter
        countErrors++;
        document.getElementById("errors").innerHTML = countErrors;
        // add body on canvas
        drawBody();
        if(countErrors == 2){
            // print a tip
            // add arms on canvas
            drawArms();
        }else if(countErrors == 3){
            // game over 
            // add legs on canvas
            drawLegs();
            document.getElementById("result").innerHTML = "Game over :(";
            playsLost++;
            document.getElementById("lost").innerHTML = playsLost;
            disableKeyboard(true);
        }
    }
    // check the winning condition, that is, I completed the word by guessing all the letters
    // and remaining with a number of errors less than or equal to two
    if(numberCharactersEntered == length){
        document.getElementById("result").innerHTML = "Win!";
        playsWon++;
        document.getElementById("won").innerHTML = playsWon;
        disableKeyboard(true);
    }
}

/* API call for retrieve pokemon json from pokeapi */
function newPokemon() {
    fetch("https://pokeapi.co/api/v2/pokemon/").then(response => {
        if (response.ok) {
            console.log("Content received");
            return response.json();
        }
        if (response.status >= 100 && response.status < 200) {
        console.log("Information for the client");
        }
        if (response.status >= 300 && response.status < 399) {
        console.log("Redirect");
        }
        if (response.status >= 400 && response.status < 499) {
        console.log("Wrong request");
        }
        if (response.status >= 500 && response.status < 599) {
        console.log("Error on the server");
        }

    }).then(output => {
        var index = Math.floor(Math.random() * output.results.length)
        var p = output.results[index].name;
        document.getElementById("hiddenPrint").innerHTML = p
    }).catch(error => console.log("Si è verificato un errore!"))
}

