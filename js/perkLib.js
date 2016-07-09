PerkIDs = []; //Hold perk IDs for purpose of looking up.
PerkLib = [];

//------------
// LEVEL UP
//------------
PerkLib.Evade = new PerkType("Evade", "Evade", "Increases chances of evading enemy attacks.", "You choose the 'Evade' perk, allowing you to avoid enemy attacks more often!");
PerkLib.Precision = new PerkType("Precision", "Precision", "Reduces enemy armor by 10. (Req's 25+ Intelligence)", "You've chosen the 'Precision' perk.  Thanks to your intelligence, you're now more adept at finding and striking an enemy's weak points, reducing their damage resistance from armor by 10.  If your intelligence ever drops below 25 you'll no longer be smart enough to benefit from this perk.");
PerkLib.Runner = new PerkType("Runner", "Runner", "Increases chances of escaping combat.", "You choose the 'Runner' perk, increasing your chances to escape from your foes when fleeing!");
PerkLib.Spellpower = new PerkType("Spellpower", "Spellpower", "Increases base spell strength by 50%.", "You choose the 'Spellpower' perk. Thanks to your sizeable intellect and willpower, you are able to more effectively use magic, boosting base spell effects by 50%.");
PerkLib.StrongBack = new PerkType("StrongBack", "Strong Back", "Enables fourth item slot.", "You choose the 'Strong Back' perk, enabling a fourth item slot.");
PerkLib.StrongBack2 = new PerkType("StrongBack2", "Strong Back 2: Strong Harder", "Enables fifth item slot.", "You choose the 'Strong Back 2: Strong Harder' perk, enabling a fifth item slot.");
PerkLib.Tank = new PerkType("Tank", "Tank", "Raises max HP by 50.", "You choose the 'Tank' perk, giving you an additional 50 HP!");
PerkLib.Tank2 = new PerkType("Tank2", "Tank 2", "Raises max HP by 1 per point of Toughness.", "You choose the 'Tank 2' perk, granting an extra maximum HP for each point of toughness.");

//------------
// EQUIPMENT
//------------
PerkLib.WizardsFocus = new PerkType("Wizard", "Wizard's Focus", "Your wizard's staff grants you additional focus, amplifying the power of your spells.");

//------------
// EVENTS
//------------
//Jojo
PerkLib.ControlledBreath = new PerkType("ControlledBreath", "Controlled Breath", "Jojo’s training allows you to recover more quickly. Increases rate of fatigue regeneration by 10%.");
PerkLib.CleansingPalm = new PerkType("CleansingPalm", "Cleansing Palm", "A ranged fighting technique of Jojo’s order, allows you to blast your enemies with waves of pure spiritual energy, weakening them and hurting the corrupt.");
PerkLib.Enlightenment = new PerkType("Enlightenment", "Enlightenment", "Jojo’s tutelage has given you a master’s focus and you can feel the universe in all its glory spread out before you. You’ve finally surpassed your teacher.");

//Ovipositing
PerkLib.BeeOvipositor = new PerkType("BeeOvipositor", "Bee Ovipositor", "Bee Ovipositor Description to be added.");
PerkLib.SpiderOvipositor = new PerkType("SpiderOvipositor", "Spider Ovipositor", "Spider Ovipositor Description to be added.");

//-----------
// TRANSFORMATION RELATED
//-----------

PerkLib.BimboBrains = new PerkType("BimboBrains", "Bimbo Brains", "TO BE ADDED");
PerkLib.FutaFaculties = new PerkType("FutaFac", "Futa Faculties", "TO BE ADDED");
