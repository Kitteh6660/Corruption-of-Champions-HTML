// So, a bit of weirdness about these game flags. They're constants because of how the save files work. When the player reaches an area where a flag would come into play, addToGameFlags() is called with these flags. This function fills an array full of these constant names and a value. That's what the game grabs when a save is loaded. So, while it may seem smart to change all of these into variables, don't!

//The default value for all of these flags is zero. To change the value of a flag, you have to call gameFlags[NAMEOFFLAG] = int or whatever it's getting set to. If you use addToGameFlags and set flags in this way, your values will be saved.


//------------
// CODEX
//------------
//Codex Entry, will be used at a point.
const CODEX_ENTRY_ANEMONES              = "Codex_Entry_Anemones";
const CODEX_ENTRY_ARACHNES              = "Codex_Entry_Arachnes";
const CODEX_ENTRY_BEHEMOTH              = "Codex_Entry_Behemoth";
const CODEX_ENTRY_ECHIDNAS              = "Codex_Entry_Echidnas";
const CODEX_ENTRY_FETISHFOLLOWERS       = "Codex_Entry_FetishFollowers";
const CODEX_ENTRY_GIANTBEES             = "Codex_Entry_GiantBees";
const CODEX_ENTRY_GOBLINS               = "Codex_Entry_Goblins";
const CODEX_ENTRY_GOOGIRLS              = "Codex_Entry_GooGirls";
const CODEX_ENTRY_HARPIES               = "Codex_Entry_Harpies";
const CODEX_ENTRY_HELLHOUNDS            = "Codex_Entry_Hellhounds";
const CODEX_ENTRY_IMPS                  = "Codex_Entry_Imps";
const CODEX_ENTRY_LABOVINES             = "Codex_Entry_Labovines";
const CODEX_ENTRY_LIZANS                = "Codex_Entry_Lizans";
const CODEX_ENTRY_MAGIC                 = "Codex_Entry_Magic";
const CODEX_ENTRY_MINOTAURS             = "Codex_Entry_Minotaurs";
const CODEX_ENTRY_NAGAS                 = "Codex_Entry_Nagas";
const CODEX_ENTRY_ORCS                  = "Codex_Entry_Orcs";
const CODEX_ENTRY_RHINOCEROS            = "Codex_Entry_Rhinoceros";
const CODEX_ENTRY_SALAMANDERS           = "Codex_Entry_Salamanders";
const CODEX_ENTRY_SANDWITCHES           = "Codex_Entry_SandWitches";
const CODEX_ENTRY_SATYRS                = "Codex_Entry_Satyrs";
const CODEX_ENTRY_SHARKGIRLS            = "Codex_Entry_SharkGirls";
const CODEX_ENTRY_SUCCUBUS              = "Codex_Entry_Succubus";
const CODEX_ENTRY_ZEBRAS                = "Codex_Entry_Zebras";

//------------
// FOLLOWERS
//------------
//Rathazul
const RATHAZUL_MET                      = "Rathazul_Met";
const RATHAZUL_CAMP                     = "Rathazul_Camp";
const RATHAZUL_PURCHASE_COUNTER         = "Rathazul_Purchase_Counter";
const RATHAZUL_ARMOUR_COUNTER           = "Rathazul_Armour_Counter";

//Jojo
const JOJO_MET                          = "Jojo_Met";
const JOJO_CAMP                         = "Jojo_Camp";
const JOJO_CORRUPTION_STAGE             = "Jojo_Corruption_Stage"; //5 indicates he's mentally broken and corrupted. -3 indicates sex scenes unlocked.
const JOJO_RAPE_COUNTER                 = "Jojo_Rape_Counter";
const JOJO_MEDITATION_COUNTER           = "Jojo_Meditation_Counter";
const JOJO_TRAINING_COUNTER             = "Jojo_Training_Counter";
const JOJO_TRAINING_UNLOCKED            = "Jojo_Training_Unlocked";
const JOJO_NIGHT_WATCH                  = "Jojo_Night_Watch";

//Marble
const MARBLE_CAMP                       = "Marble_Camp";

//Amily
const AMILY_VILLAGE_ACCESSIBLE           = "Amily_Village_Accessible";
const AMILY_VILLAGE_EXPLORED             = "Amily_Village_Explored"  // How many times has the TownRuins been explored? Used in achievement.

//------------
// ENCOUNTERS
//------------
//Minotaur
const MINOTAUR_TF2                      = "Minotaur_TF2"; //One-time silly mode scene.
const MINOTAUR_AND_COWGIRL              = "Minotaur_And_CowGirl";

//Naga
const NAGA_LAST_ENCOUNTERED_AS_NAGA     = "Naga_Last_Encountered_As_Naga"; //0 indicates player isn't naga, 1 indicates player is naga, 2 indicates player is naga but hostile.
const NAGA_FUCKED_AS_NAGA               = "Naga_Fucked_As_Naga";

//Sand Witch
const SAND_WITCH_RAPED                  = "Sand_Witch_Raped";

//------------
// KEY ITEMS
//------------
// Racks

const HAS_KEY_ITEM                          = "Has_Key_Item" // Does the player have any key items?
const HAS_ARMOR_RACK                        = "Has_Armor_Rack" // Does the player have the armor rack?
const HAS_WEAPON_RACK                       = "Has_Weapon_Rack" // Does the player have the weapon rack?
const HAS_EQUIPMENT_RACK                    = "Has_Equipment_Rack" // Does the player have the equipment rack?