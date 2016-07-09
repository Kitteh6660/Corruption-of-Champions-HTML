StatusEffectIDs = []; //Hold status effect IDs for purpose of looking up.
StatusEffects = [];

BIND_TYPE_GOO = 0;
BIND_TYPE_NAGA = 1;
BIND_TYPE_TENTACLE = 2;

VENOM_TYPE_BEE = 0;
VENOM_TYPE_NAGA = 1;

//------------
// NON-COMBAT
//------------
//Bonus
StatusEffects.BonusACapacity = new StatusEffectType("Bonus aCapacity");
StatusEffects.BonusVCapacity = new StatusEffectType("Bonus vCapacity");

//Penalties
StatusEffects.Infested = new StatusEffectType("Infested");

//Neutral
StatusEffects.Feeder = new StatusEffectType("Feeder");

//------------
// COMBAT
//------------
//Buffs
StatusEffects.ChargeWeapon = new StatusEffectType("ChargeWeapon");
StatusEffects.Might = new StatusEffectType("Might");
//Debuffs
StatusEffects.Acid = new StatusEffectType("Acid");
StatusEffects.Blind = new StatusEffectType("Blind");
StatusEffects.Bind = new StatusEffectType("Bind"); //Value determines the type.
StatusEffects.Confusion = new StatusEffectType("Confusion");
StatusEffects.NoFlee = new StatusEffectType("NoFlee");
StatusEffects.Poison = new StatusEffectType("Poison");
StatusEffects.Silence = new StatusEffectType("Silence");
StatusEffects.StoneLust = new StatusEffectType("StoneLust");
StatusEffects.Stunned = new StatusEffectType("Stunned");
StatusEffects.TemporaryHeat = new StatusEffectType("TempHeat");
StatusEffects.Venom = new StatusEffectType("Venom");
