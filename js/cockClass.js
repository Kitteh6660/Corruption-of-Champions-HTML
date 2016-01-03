function Cock(length, thickness, type) {
	//Base info
	this.cockType = type;
	this.cockLength = length;
	this.cockThickness = thickness;
	//Special, for dog and dragon cocks
	this.knotMultiplier = 1;
}

Cock.prototype.cockArea = function() {
	return (this.cockLength * this.cockThickness)
}