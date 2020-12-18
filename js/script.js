
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

