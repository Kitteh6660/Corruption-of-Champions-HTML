/**
 * This will clear the text on screen.
 */

clearOutput = function() {
	document.getElementById("maintext").innerHTML = "";
}

/**
 * This will output a text on screen.
 */

outputText = function(text) {
	document.getElementById("maintext").innerHTML += text;
}
