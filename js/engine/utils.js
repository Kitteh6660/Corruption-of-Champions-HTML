// Miscellenious functions


const NUMBER_WORDS_NORMAL       = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
const NUMBER_WORDS_CAPITAL      = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];
const NUMBER_WORDS_POSITIONAL   = ["zeroth", "first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth"];

//Format string
function formatStringArray(stringList) { //Changes an array of values into "1", "1 and 2" or "1, (x, )y and z"
    switch (stringList.length) {
        case  0: return "";
        case  1: return stringList[0];
        case  2: return stringList[0] + " and " + stringList[1];
        default:
    }
    var concat = stringList[0];
    for (var x = 1; x < stringList.length - 1; x++) concat += ", " + stringList[x];
    return concat + " and " + stringList[stringList.length - 1];
}

//Number to words
function num2Text(number) {
    if (number >= 0 && number <= 10) return NUMBER_WORDS_NORMAL[number];
    return number.toString();
}
function num2Text2(number) {
    if (number < 0) return number.toString(); //Can't really have the -10th of something
    if (number <= 10) return NUMBER_WORDS_POSITIONAL[number];
    switch (number % 10) {
        case 1: return number.toString() + "st";
        case 2: return number.toString() + "nd";
        case 3: return number.toString() + "rd";
        default:
    }
    return number.toString() + "th";
}
function Num2Text(number) {
    if (number >= 0 && number <= 10) return NUMBER_WORDS_CAPITAL[number];
    return number.toString();
}

//Comma display
function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

//Capitalize letters
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function capitalize(string) { //Alternate function
    return capitalizeFirstLetter(string);
}

//Randomization
function rand(num) {
	var result = Math.random() * num;
	return Math.floor(result);
}
function randomChoice() {
    var choice;
    if (arguments.length == 1) {
        choice = Math.round(Math.random() * (arguments[0].length - 1));
        return arguments[0][choice];
    }
    else {
        choice = Math.round(Math.random() * (arguments.length - 1));
        return arguments[choice];
    }
}

//Lookup
function lookupItem(id) {
    return ItemLib[id];
}

function lookupKeyItem(id) {
    return KeyItemIDs[id];
}

function lookupPerk(id) {
    return PerkIDs[id];
}

function lookupStatusEffects(id) {
    return StatusEffectIDs[id];
}

//Function
function createCallBackFunction(func, arg1, arg2, arg3) {
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
}