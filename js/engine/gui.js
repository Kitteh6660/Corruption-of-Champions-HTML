// This code holds the positioning of the GUI display. The look of the display is handled through the CSS file.
// This holds some of the most important code for the engine of the game. It turns the buttons on and off, sets their labels and tool tips
// and tells the program which function to go to next.


//Events
document.onmousemove = getMousePosition;
initializeTooltipEvents();

function getMousePosition(event) {
    document.getElementById("tooltip").style.top = (event.clientY - 220) + "px";
    if (event.clientX + 20 < document.documentElement.clientWidth - 320)
        document.getElementById("tooltip").style.left = (event.clientX + 20) + "px";
    else
        document.getElementById("tooltip").style.left = (document.documentElement.clientWidth - 320) + "px";
}

//Stats Pane
function refreshStats() {
	//------------
	// NUMBERS
	//------------
	//Core Stats
	document.getElementById("strNum").innerHTML = Math.floor(player.str);
	document.getElementById("touNum").innerHTML = Math.floor(player.tou);
	document.getElementById("speNum").innerHTML = Math.floor(player.spe);
	document.getElementById("intNum").innerHTML = Math.floor(player.inte);
	document.getElementById("libNum").innerHTML = Math.floor(player.lib);
	document.getElementById("senNum").innerHTML = Math.floor(player.sens);
	document.getElementById("corNum").innerHTML = Math.floor(player.cor);
	//Combat Stats
	document.getElementById("hpNum").innerHTML = Math.floor(player.HP) + " / " + player.maxHP();
    document.getElementById("hpNum").title = "HP: " + Math.floor(player.HP) + " / " + player.maxHP();
	document.getElementById("lustNum").innerHTML = Math.floor(player.lust) + " / " + player.maxLust();
    document.getElementById("lustNum").title = "Lust: " + Math.floor(player.lust) + " / " + player.maxLust() + " \nMinimum: " + player.minLust() + "\nLust Resistance: " + (Math.floor((1 - player.lustVuln) * 1000) / 10) + "%";
	document.getElementById("fatigueNum").innerHTML = Math.floor(player.fatigue) + " / " + player.maxFatigue();
    document.getElementById("fatigueNum").title = "Fatigue: " + Math.floor(player.fatigue) + " / " + player.maxFatigue();
	//Advancement
	document.getElementById("levelNum").innerHTML = player.level;
	document.getElementById("xpNum").innerHTML = player.XP + " / " + (player.level * 100);
	document.getElementById("gemNum").innerHTML = player.gems;

	//------------
	// BARS
	//------------
	//Core Stats
	document.getElementById("strBar").style.width = Math.floor((player.str / 100) * 100) + "%";
	document.getElementById("touBar").style.width = Math.floor((player.tou / 100) * 100) + "%";
	document.getElementById("speBar").style.width = Math.floor((player.spe / 100) * 100) + "%";
	document.getElementById("intBar").style.width = Math.floor((player.inte / 100) * 100) + "%";
	document.getElementById("libBar").style.width = Math.floor((player.lib / 100) * 100) + "%";
	document.getElementById("senBar").style.width = Math.floor((player.sens / 100) * 100) + "%";
	document.getElementById("corBar").style.width = Math.floor((player.cor / 100) * 100) + "%";
	//Combat Stats
	document.getElementById("hpBar").style.width = Math.floor((player.HP / player.maxHP()) * 100) + "%";
	document.getElementById("lustBar").style.width = Math.floor((player.lust / player.maxLust()) * 100) + "%";
	document.getElementById("fatigueBar").style.width = Math.floor((player.fatigue / player.maxFatigue()) * 100) + "%";
    document.getElementById("hungerFrame").style.visibility = "hidden";
	//Advancement
	if ((player.XP / (player.level * 100)) < 1)
		document.getElementById("xpBar").style.width = Math.floor((player.XP / (player.level * 100)) * 100) + "%";
	else 
		document.getElementById("xpBar").style.width = "100%";
	//Name
    document.getElementById("charName").innerHTML = player.name;
	//Time
	var timeText = "";
    timeText += "Day#: " + time.days + "<br>Time: ";
    if (use12Hours) {
        if (time.hours < 12) { //am
            if (time.hours == 0)
                timeText += (time.hours + 12) + ":" + (time.minutes < 10 ? "0" : "") + time.minutes;
            else
                timeText += time.hours + ":" + (time.minutes < 10 ? "0" : "") + time.minutes;
            timeText += "am";
        }
        else { //pm
            if (time.hours == 0)
                timeText += time.hours + ":" + (time.minutes < 10 ? "0" : "") + time.minutes;
            else
                timeText += (time.hours - 12) + ":" + (time.minutes < 10 ? "0" : "") + time.minutes;
            timeText += "pm";
        }
    }
    else
        timeText += time.hours + ":" + (time.minutes < 10 ? "0" : "") + time.minutes;
    document.getElementById("timeDisplay").innerHTML = timeText;
}
function showStats() {
	refreshStats();
	document.getElementById("stats").style.visibility = "visible";
}
function hideStats() {
	document.getElementById("stats").style.visibility = "hidden";
}

function hideUpDown() {
    var arrows = ["strArrow", "touArrow", "speArrow", "intArrow", "libArrow", "senArrow", "corArrow", "hpArrow", "lustArrow", "fatigueArrow"];
    for (var i = 0; i < arrows.length; i++) {
        document.getElementById(arrows[i]).style.visibility = "hidden";
    }
}
function showUpDown(arrowToDisplay, upDown) {
    //Auto-route parameter
    if (arrowToDisplay == "sensArrow") arrowToDisplay = "senArrow";
    if (arrowToDisplay == "inteArrow") arrowToDisplay = "intArrow";
    //Display arrow
    if (upDown == "up")
        document.getElementById(arrowToDisplay).style.backgroundImage = "url(assets/interface/arrow-up.png)";
    else if (upDown == "down")
        document.getElementById(arrowToDisplay).style.backgroundImage = "url(assets/interface/arrow-down.png)";
    document.getElementById(arrowToDisplay).style.visibility = "visible";
}
function displaySprite(spriteId) {
    if (spriteId == undefined) {
        document.getElementById("spriteDisplay").innerHTML = "";
    }
    else {
        var image = new Image();
        image.src = "assets/sprites/" + spriteId + ".png";

        document.getElementById("spriteDisplay").innerHTML = "<img src=\"assets/sprites/" + spriteId + ".png\">"
    }
}

//Bottom menu buttons
function menu() {
	for (var i = 0; i < 15; i++) {
		document.getElementById("button" + i).style.visibility = "hidden";
	}
}

function addButton(pos, txt, func, arg1, arg2, arg3, tooltipText, tooltipHeader) {
    if (tooltipHeader == undefined) tooltipHeader = txt;
    var callback = createCallBackFunction(func, arg1, arg2, arg3);
	document.getElementById("button" + pos).innerHTML = txt;
	document.getElementById("button" + pos).style.visibility = "visible";
    //document.getElementById("button" + pos).style.opacity = "1";
	document.getElementById("button" + pos).onclick = callback;
    document.getElementById("button" + pos).tooltipHeader = tooltipHeader;
    document.getElementById("button" + pos).tooltipText = tooltipText;
    return document.getElementById("button" + pos);
}
function addButtonDisabled(pos, txt, tooltipText, tooltipHeader) {
    if (tooltipHeader == undefined) tooltipHeader = txt;
    document.getElementById("button" + pos).innerHTML = txt;
    document.getElementById("button" + pos).style.visibility = "visible";
    //document.getElementById("button" + pos).style.opacity = "0.4";
    document.getElementById("button" + pos).onclick = null;
    document.getElementById("button" + pos).tooltipHeader = tooltipHeader;
    document.getElementById("button" + pos).tooltipText = tooltipText;
}
function removeButton(pos) {
    document.getElementById("button" + pos).style.visibility = "hidden";
}

function doNext(func) {
	    menu();
	addButton(0, "Next", func);
}
function doYesNo(yesFunc, noFunc) {
	menu();
	addButton(0, "Yes", yesFunc);
	addButton(1, "No", noFunc);
}

function isButtonVisible(index) {
    return document.getElementById("button" + index).style.visibility == "visible";
}

//Top menu buttons
function showMenus() {
	document.getElementById("buttonMain").style.visibility = "visible";
	document.getElementById("buttonData").style.visibility = "visible";
	//document.getElementById("buttonLevel").style.visibility = "visible";
	document.getElementById("buttonStats").style.visibility = "visible";
	document.getElementById("buttonPerks").style.visibility = "visible";
	document.getElementById("buttonAppearance").style.visibility = "visible";
}
function hideMenus() {
	document.getElementById("buttonMain").style.visibility = "hidden";
	document.getElementById("buttonData").style.visibility = "hidden";
	document.getElementById("buttonLevel").style.visibility = "hidden";
	document.getElementById("buttonStats").style.visibility = "hidden";
	document.getElementById("buttonPerks").style.visibility = "hidden";
	document.getElementById("buttonAppearance").style.visibility = "hidden";
}
function hideMenuButton(menuButton) {
	document.getElementById(menuButton).style.visibility = "hidden";
}
function showMenuButton(menuButton) {
	document.getElementById(menuButton).style.visibility = "visible";
}
function setMenuButton(menuButton, text, func) {
	document.getElementById(menuButton).innerHTML = text;
	document.getElementById(menuButton).onclick = func;
}

//Tooltip
function initializeTooltipEvents() {
    for (var i = 0; i < 15; i++) {
        //Create blank variable
        document.getElementById("button" + i).tooltipHeader = undefined;
        document.getElementById("button" + i).tooltipText = undefined;
        //Hook events
        document.getElementById("button" + i).onmouseover = (function(event) {
            if (event.currentTarget.tooltipText != undefined) {
                document.getElementById("tooltip").style.visibility = "visible";
                document.getElementById("tooltip").innerHTML = "<h4>" + event.currentTarget.tooltipHeader + "</h4><p>" + event.currentTarget.tooltipText + "</p>";
            }
        });
        document.getElementById("button" + i).onmouseout = function() {
            document.getElementById("tooltip").style.visibility = "hidden";
        }
    }
}
