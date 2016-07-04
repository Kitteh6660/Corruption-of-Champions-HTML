function StatusEffect(type, val1, val2, val3, val4) {
    //Default values
    if (type == undefined) type = 0; //Fixed now
    if (val1 == undefined) val1 = 0;
    if (val2 == undefined) val2 = 0;
    if (val3 == undefined) val3 = 0;
    if (val4 == undefined) val4 = 0;
    //Variables
    this.stype = type;
    this.value1 = val1;
    this.value2 = val2;
    this.value3 = val3;
    this.value4 = val4;
}

function StatusEffectType(id) {
    //Variables
    this.id = id;
    StatusEffectIDs[this.id] = this;
}