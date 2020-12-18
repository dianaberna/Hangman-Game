
var words = ["HOME", "PANCAKE", "UNNECESSARY", "DOG"];
var word = words[Math.floor(Math.random() * words.length)];
console.log(word);


for (var i = 0; i < word.length; i++) {
    var node = document.createElement("span");
    var textnode = document.createTextNode("- ");
    node.appendChild(textnode);
    document.getElementById("randomWord").appendChild(node);
}

for( var i=65; i<= 90; i++){
    var node = document.createElement("button");
    node.setAttribute("onclick", "check("+i+")");
    var textnode = document.createTextNode(String.fromCharCode(i));
    node.appendChild(textnode);
    document.getElementById("keyboard").appendChild(node);
}

var length = word.length;
var countOccorrenze = 0;
var countErrors = 0;
var flagTrovato = 0;

function check(onechar){
    flagTrovato = 0;
    onechar = String.fromCharCode(onechar); 
    console.log(onechar);
    for(var i = 0; i < word.length; i++){
        if(word[i] == onechar){
            var elem = document.getElementById("randomWord").getElementsByTagName("span")[i].innerHTML = onechar;
            countOccorrenze ++;
            flagTrovato = 1;
        }
    }
    if(flagTrovato == 0){
        countErrors++;
        document.getElementById("errors").innerHTML = countErrors;
        if(countErrors == 2){
            console.log("suggerimento");
        }else if(countErrors == 3){
            console.log("hai perso");
        }
    }
    console.log(countOccorrenze);
    console.log(countErrors);

    if(countOccorrenze == length){
        console.log("hai vinto");
    }
}