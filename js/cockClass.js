function Cock(length, thickness, type) {
    //Because WebStorm complains!
    if (length == undefined) length = 5.5;
    if (thickness == undefined) thickness = 1;
    if (type == undefined) type = 0;
	//Base info
	this.cockType = type;
	this.cockLength = length;
	this.cockThickness = thickness;
	//Special, for dog and dragon cocks
	this.knotMultiplier = 1;
    //Other
    this.pierced = false;
    this.sock = "";
}

Cock.prototype.cockArea = function() {
	return (this.cockLength * this.cockThickness)
}
Cock.prototype.thickenCock = function(amount) {
    //Diminishing returns!
    if (!hyperHappy) {
        if (this.cockThickness >= 6 && this.cockThickness < 10)
            amount *= 0.8;
        else if (this.cockThickness >= 10 && this.cockThickness < 14)
            amount *= 0.6;
        else if (this.cockThickness >= 14 && this.cockThickness < 18)
            amount *= 0.5;
        else if (this.cockThickness >= 18 && this.cockThickness < 24)
            amount *= 0.4;
        else if (this.cockThickness >= 24)
            amount *= 0.3;
    }
    //Apply growth
    this.cockThickness += amount;
    //Apply hard cap
    if (this.cockThickness > 40) this.cockThickness = 40;
}
Cock.prototype.increaseCock = function(amount) {
    //Diminishing returns!
    if (!hyperHappy) {
        if (this.cockLength >= 30 && this.cockLength < 50)
            amount *= 0.8;
        else if (this.cockLength >= 50 && this.cockLength < 70)
            amount *= 0.6;
        else if (this.cockLength >= 70 && this.cockLength < 90)
            amount *= 0.5;
        else if (this.cockLength >= 90 && this.cockLength < 120)
            amount *= 0.4;
        else if (this.cockLength >= 120)
            amount *= 0.3;
    }
    //Apply growth
    this.cockLength += amount;
    //Apply hard cap
    if (this.cockLength > 240) this.cockLength = 240;
}
Cock.prototype.cArea = function() {
    return this.cockLength * this.cockThickness;
}

function fixCock(cock) { //Fix any undefined numbers.
    if (cock.cockType == undefined)
        cock.cockType = 0;
    if (cock.cockLength == undefined)
        cock.cockLength = 5;
    if (cock.cockThickness == undefined)
        cock.cockThickness = 1;
    if (cock.knotMultiplier == undefined)
        cock.knotMultiplier = 1;
    if (cock.pierced == undefined)
        cock.pierced = false;
    if (cock.sock == undefined)
        cock.sock = "";
    return cock;
}