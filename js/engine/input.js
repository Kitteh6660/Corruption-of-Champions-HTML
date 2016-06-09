// The functions in this file allow for keyboard input.
// Top row of buttons = 12345
// Second row of buttions = 67890 OR qwerty
// Third row of buttons = asdfg
//
// Uncertain if these are implemented anywhere yet:
// Space will handle a screen with a Next button
// Y and N will handle a yes or No
// Also will register a shift depress.

function keyPress(e) {
    var event = window.event ? window.event : e;
    switch(event.key) {
        //Standard buttons
        case "1":
            pressButtonByKey(0);
            break;
        case "2":
            pressButtonByKey(1);
            break;
        case "3":
            pressButtonByKey(2);
            break;
        case "4":
            pressButtonByKey(3);
            break;
        case "5":
            pressButtonByKey(4);
            break;
        case "6":
        case "q":
            pressButtonByKey(5);
            break;
        case "7":
        case "w":
            pressButtonByKey(6);
            break;
        case "8":
        case "e":
            pressButtonByKey(7);
            break;
        case "9":
        case "r":
            pressButtonByKey(8);
            break;
        case "0":
        case "t":
            pressButtonByKey(9);
            break;
        case "a":
            pressButtonByKey(10);
            break;
        case "s":
            pressButtonByKey(11);
            break;
        case "d":
            pressButtonByKey(12);
            break;
        case "f":
            pressButtonByKey(13);
            break;
        case "g":
            pressButtonByKey(14);
            break;
        //Next and yes/no
        case " ":
            pressNextByKey();
            break;
        case "y":
            pressYesByKey();
            break;
        case "n":
            pressNoByKey();
            break;
        case "Shift":
            shiftKeyDown = true;
            break;
        default:
    }
}
function keyDepress(e) {
    var event = window.event ? window.event : e;
    switch(event.key) {
        case "Shift":
            shiftKeyDown = false;
            break;
        default:
    }
}
document.addEventListener("keydown", keyPress);
document.addEventListener("keyup", keyDepress);

function pressButtonByKey(index) {
    if (isButtonVisible(index)) {
        document.getElementById("button" + index).onclick();
    }
}
function pressNextByKey() {
    if (document.getElementById("button0").innerHTML == "Next") {
        document.getElementById("button0").onclick();
    }
}
function pressYesByKey() {
    if (document.getElementById("button0").innerHTML == "Yes") {
        document.getElementById("button0").onclick();
    }
}
function pressNoByKey() {
    if (document.getElementById("button1").innerHTML == "No") {
        document.getElementById("button1").onclick();
    }
}