// Clears the main screen completely.
clearOutput = function() {
	document.getElementById("maintext").innerHTML = "";
}

// Outputs text to the main screen. Use HTML to modify the text.
// e.g. Use <br><br> instead of \n\n for a newline.
outputText = function(text) {
	document.getElementById("maintext").innerHTML += text;
}
