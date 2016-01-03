//Stats Pane
function refreshStats() {
	//------------
	// NUMBERS
	//------------
	//Core Stats
	document.getElementById("strNum").innerHTML = player.str;
	document.getElementById("touNum").innerHTML = player.tou;
	document.getElementById("speNum").innerHTML = player.spe;
	document.getElementById("intNum").innerHTML = player.inte;
	document.getElementById("libNum").innerHTML = player.lib;
	document.getElementById("senNum").innerHTML = player.sen;
	document.getElementById("corNum").innerHTML = player.cor;
	//Combat Stats
	document.getElementById("hpNum").innerHTML = Math.floor(player.HP) + " / " + player.maxHP();
	document.getElementById("lustNum").innerHTML = Math.floor(player.lust) + " / " + player.maxLust();
	document.getElementById("fatigueNum").innerHTML = Math.floor(player.fatigue) + " / " + player.maxFatigue();
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
	document.getElementById("senBar").style.width = Math.floor((player.sen / 100) * 100) + "%";
	document.getElementById("corBar").style.width = Math.floor((player.cor / 100) * 100) + "%";
	//Combat Stats
	document.getElementById("hpBar").style.width = Math.floor((player.HP / player.maxHP()) * 100) + "%";
	document.getElementById("lustBar").style.width = Math.floor((player.lust / player.maxLust()) * 100) + "%";
	document.getElementById("fatigueBar").style.width = Math.floor((player.fatigue / player.maxFatigue()) * 100) + "%";
    document.getElementById("hungerFrame").style.visibility = "hidden";
	//Advancement
	if ((player.XP / (player.level * 100)) < 1)
		document.getElementById("xpBar").style.width = Math.floor((player.XP / (player.level * 100)) * 100) + "%"
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
function showUpDown(attribute, upDown) {
    //Auto-route parameter
    if (attribute == "inte") attribute = "int";
    //Display arrow
    if (upDown == "up")
        document.getElementById(attribute).style.backgroundImage = "url(assets/interface/arrow-up.png)";
    else if (upDown == "down")
        document.getElementById(attribute).style.backgroundImage = "url(assets/interface/arrow-down.png)";
    document.getElementById(attribute).style.visibility = "visible";
}

//Bottom menu buttons
function menu() {
	for (var i = 0; i < 15; i++) {
		document.getElementById("button" + i).style.visibility = "hidden";
	}
}

function addButton(pos, txt, func, arg1, arg2, arg3) {
	document.getElementById("button" + pos).innerHTML = txt;
	document.getElementById("button" + pos).style.visibility = "visible";
	document.getElementById("button" + pos).onclick = (function() {
		if (arg1 != undefined) {
			if (arg2 != undefined) {
				if (arg3 != undefined) {
					return function() {
						func(arg1, arg2, arg3);
					}
				}
				return function() {
					func(arg1, arg2);
				}
			}
			return function() {
				func(arg1);
			}
		}
		else {
			return function() {
				func();
			}
		}
	})();
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
    if (document.getElementById("button" + index).style.visibility == "visible")
        return true;
    else
        return false;
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