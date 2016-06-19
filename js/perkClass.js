function Perk(type, val1, val2, val3, val4) {
    //Default values
    if (val1 == undefined) val1 = 0;
    if (val2 == undefined) val2 = 0;
    if (val3 == undefined) val3 = 0;
    if (val4 == undefined) val4 = 0;
    //Variables
    this.ptype = type;
    this.value1 = val1;
    this.value2 = val2;
    this.value3 = val3;
    this.value4 = val4;
}
Perk.prototype.perkName = {
    get perkName() { return this.ptype.name; }
}

function PerkType(id, name, desc, longDesc, keepOnAscension) {
    //Defaults
    if (longDesc == undefined) longDesc = null;
    if (keepOnAscension == undefined) keepOnAscension = false;
    //Variables
    this.id = id;
    this.name = name;
    this.desc = desc;
    this.longDesc = longDesc;
    this.keepOnAscension = keepOnAscension;
    PerkIDs[this.id] = this;
}
