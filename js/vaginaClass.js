

function Vagina(wetness, looseness, virgin, vagType) {
    //Because WebStorm complains!
	if (wetness == undefined) wetness = 1;
	if (looseness == undefined) looseness = 0;
	if (virgin == undefined) virgin = false;
    if (vagType == undefined) vagType = 0;
	//Base info
	this.vaginaType = vagType;
	this.vaginalWetness = wetness;
	this.vaginalLooseness = looseness;
	//Virginity info
	this.virgin = virgin;
}
