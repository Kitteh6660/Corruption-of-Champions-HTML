function Ass(wetness, looseness, virgin) {
    //Because WebStorm complains!
    if (wetness == undefined) wetness = 1;
    if (looseness == undefined) looseness = 0;
    if (virgin == undefined) virgin = false;
	//Base info
	this.analWetness = wetness;
	this.analLooseness = looseness;
	//Virginity info
	this.virgin = virgin;
}
Ass.constructor = Ass;
