function BreastRow(breastSize, nipplesPerBreast) {
	//Base info
	this.breasts = 2;
	this.breastSize = breastSize;
	//Other info
	this.lactationMultiplier = 0;
	this.milkFullness = 0; //Goes up to 100.
	this.fuckable = false;
    this.nipplesPerBreast = nipplesPerBreast;
    this.nippleLength = 0.25;
}

function unfuckBreastRow(breastRow) { //Fix any undefined numbers.
    if (breastRow.breasts == undefined)
        breastRow.breasts = 2;
    if (breastRow.breastSize == undefined)
        breastRow.breastSize = 0;
    if (breastRow.lactationMultiplier == undefined)
        breastRow.lactationMultiplier = 0;
    if (breastRow.milkFullness == undefined)
        breastRow.milkFullness = 0;
    if (breastRow.fuckable == undefined)
        breastRow.fuckable = false;
    if (breastRow.nipplesPerBreast == undefined)
        breastRow.nipplesPerBreast = 1;
    if (breastRow.nippleLength == undefined)
        breastRow.nippleLength = 0.25;
    return breastRow;
}