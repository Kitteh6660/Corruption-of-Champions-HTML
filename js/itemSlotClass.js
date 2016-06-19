function ItemSlot() {
    this.quantity = 0;
    this.itype = Item.NOTHING;
}

ItemSlot.prototype.setItemAndQty = function(itype, quant) {
    if (itype == null) itype = Items.NOTHING;
    if (quant == 0 && itype == Items.NOTHING) {
        this.emptySlot();
        return;
    }
    if (quant < 0 || quant == 0 && itype != Item.NOTHING || quant > 0 && itype == Item.NOTHING){
        quant = 0;
        itype = Items.NOTHING;
    }
    this.quantity = quant;
    this.itype = itype;

}
ItemSlot.prototype.removeItem = function() {

}
ItemSlot.prototype.removeOneItem = function() {
    if (this.quantity > 0) {
        this.quantity--;
        if (this.quantity <= 0)
            this.itype = Items.NOTHING;
    }
}
ItemSlot.prototype.emptySlot = function() {
    this.quantity = 0;
    this.itype = Items.NOTHING;
}