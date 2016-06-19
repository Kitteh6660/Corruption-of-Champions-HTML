function Vagina(wetness, looseness, virgin, vagType) {
    //Because WebStorm complains!
	if (wetness == undefined) wetness = 1;
	if (looseness == undefined) looseness = 0;
	if (virgin == undefined) virgin = false;
    if (vagType == undefined) vagType = 0;
	//Base info
	this.type = vagType;
    this.clitLength = 0.25;
	this.vaginalWetness = wetness;
	this.vaginalLooseness = looseness;
	this.virgin = virgin;
    //Misc
    this.clitPierced = 0;
}

function fixVagina(pussy) { //Fix any undefined numbers.
    if (pussy.type == undefined)
        pussy.type = 0;
    if (pussy.clitLength == undefined)
        pussy.clitLength = 0.25;
    if (pussy.vaginalWetness == undefined)
        pussy.vaginalWetness = 1;
    if (pussy.vaginalLooseness == undefined)
        pussy.vaginalLooseness = 0;
    if (pussy.virgin == undefined)
        pussy.virgin = false;
    return pussy;
}