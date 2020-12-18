
var words = ["HOME", "PANCAKE", "UNNECESSARY", "DOG"];
var suggestions = ["Where do you live", "Perfect with maple syrup", "!necessary", "The best friend of human"];
var word = words[Math.floor(Math.random() * words.length)];
var position = words.indexOf(word);
console.log(word);

var c = document.getElementById("myCanvas");
var context = c.getContext("2d");
context.beginPath();
context.moveTo(93,303);
context.lineTo(151,303);
context.moveTo(123,303);
context.lineTo(123,110);
context.moveTo(123,110);
context.lineTo(247,110);
context.moveTo(247,110);
context.lineTo(247,141);
context.moveTo(247, 162.5 - 23.5);
context.bezierCurveTo(247 + (0.5522847498307936 * 27), 162.5 - 23.5,  247 + 27, 162.5 - (0.5522847498307936 * 23.5), 247 + 27, 162.5);
context.bezierCurveTo(247 + 27, 162.5 + (0.5522847498307936 * 23.5), 247 + (0.5522847498307936 * 27), 162.5 + 23.5, 247, 162.5 + 23.5);
context.bezierCurveTo(247 - (0.5522847498307936 * 27), 162.5 + 23.5, 247 - 27, 162.5 + (0.5522847498307936 * 23.5), 247 - 27, 162.5);
context.bezierCurveTo(247 - 27, 162.5 - (0.5522847498307936 * 23.5), 247 - (0.5522847498307936 * 27), 162.5 - 23.5, 247, 162.5 - 23.5);
context.stroke();

for (var i = 0; i < word.length; i++) {
    var node = document.createElement("span");
    var textnode = document.createTextNode("_");
    node.appendChild(textnode);
    document.getElementById("randomWord").appendChild(node);
}

for( var i=65; i<= 90; i++){
    var node = document.createElement("button");
    node.setAttribute("onclick", "check("+i+")");
    var textnode = document.createTextNode(String.fromCharCode(i));
    node.appendChild(textnode);
    // if(i == 75 || i==85){
    //     document.getElementById("keyboard").appendChild(document.createElement("br"));
    // }
    document.getElementById("keyboard").appendChild(node);
}

var length = word.length;
var countOccorrenze = 0;
var countErrors = 0;
var flagTrovato = 0;

function check(onechar){
    flagTrovato = 0;
    onechar = String.fromCharCode(onechar); 
    for(var i = 0; i < word.length; i++){
        var span = document.getElementById("randomWord").getElementsByTagName("span")[i].innerHTML;
        if(word[i] == onechar && span == "_"){
            document.getElementById("randomWord").getElementsByTagName("span")[i].innerHTML = onechar
            countOccorrenze ++;
            flagTrovato = 1;
        }else if(word[i] == onechar && span != "-"){
            flagTrovato = 1;
        }
    }
    if(flagTrovato == 0){
        countErrors++;
        document.getElementById("errors").innerHTML = countErrors;
        //add body on canvas
        var c = document.getElementById("myCanvas");
        var context = c.getContext("2d");
        context.moveTo(247,187);
        context.lineTo(247,245);
        context.stroke();
        if(countErrors == 2){
            //add arms on canvas
            var c = document.getElementById("myCanvas");
            var context = c.getContext("2d");
            context.moveTo(247,187);
            context.lineTo(230,208);
            context.moveTo(247,189);
            context.lineTo(263,207);
            context.stroke();
            document.getElementById("result").innerHTML = "Suggestion: "+suggestions[position];
        }else if(countErrors == 3){
            //add legs on canvas
            var c = document.getElementById("myCanvas");
            var context = c.getContext("2d");
            context.moveTo(246,245);
            context.lineTo(233,268);
            context.moveTo(248,245);
            context.lineTo(260,264);
            context.stroke();
            document.getElementById("result").innerHTML = "Game over :(";
        }
    }

    if(countOccorrenze == length){
        document.getElementById("result").innerHTML = "Win!";
    }
}