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
        case "y":
            pressYesByKey();
        case "n":
            pressNoByKey();
        default:
    }
}
document.addEventListener("keydown", keyPress);

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