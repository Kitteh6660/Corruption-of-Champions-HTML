// So, a bit of weirdness about these game flags. They're constants because of how the save files work. When the player reaches an area where a flag would come into play, addToGameFlags() is called with these flags. This function fills an array full of these constant names and a value. That's what the game grabs when a save is loaded. So, while it may seem smart to change all of these into variables, don't!

//The default value for all of these flags is zero. To change the value of a flag, you have to call gameFlags[NAMEOFFLAG] = int or whatever it's getting set to. If you use addToGameFlags and set flags in this way, your values will be saved.


//------------
// STATS
//------------
const TIMES_TRANSFORMED                 = "Times_Transformed";
const TIMES_ORGASMED                    = "Times_Orgasmed";

//------------
// MISC
//------------
const HAIR_GROWTH_STOPPED_BECAUSE_LIZARD= "Hair_Growth_Stopped";

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
const JOJO_BIMBO_STATE                  = "Jojo_Bimbo_State";

//Marble
const MARBLE_MET                        = "Marble_Met";
const MARBLE_CAMP                       = "Marble_Camp";
const MARBLE_ADDICTION                  = "Marble_Addiction";
const MARBLE_AFFECTION                  = "Marble_Affection";
const MARBLE_WARNING                    = "Marble_Warning";
const NO_MORE_MARBLE                    = "No_More_Marble";
const MARBLE_RAPE_ATTEMPTED             = "Marble_Rape_Attempted";
const MURBLE_FARM_TALK_LEVELS           = "Marble_Farm_Talk_Levels";

//Amily
const AMILY_VILLAGE_ACCESSIBLE			= "Amily_Village_Accessible"; // Can you access the Town Ruins?
const AMILY_VILLAGE_EXPLORED             = "Amily_Village_Explored";  // How many times has the TownRuins been explored? Used in achievement.
const AMILY_MET                         = "Amily_Met" // Has Amily been met yet?
const AMILY_PC_GENDER                   = "Amily_PC_Gender"; // Used for gender checks with Amily to switch between scenes.
const AMILY_MET_AS                      = "Amily_Met_As"; // Marks the player gender that met with Amily.
const AMILY_OFFER_ACCEPTED              = "Amily_Offer_Accepted"; // You've taken up Amily's offer to breed her.
const AMILY_AFFECTION                   = "Amily_Affection"; // Amily's Affection level toward PC.
const AMILY_OFFERED_DEFURRY             = "Amily_Offered_Defurry"; // Refused Amily's offer because she's a mouse.
const AMILY_FUCK_COUNTER                = "Amily_Fuck_Counter"; // How many times you fucked Amily.
const AMILY_NOT_FURRY                   = "Amily_Not_Furry"; // If active, Amily has been defurred.
const AMILY_WANG_LENGTH                 = "Amily_Wang_Length"; // Amily is a herm. Measures her penis length.
const AMILY_PREGNANCY_TYPE              = "Amily_Pregnancy_Type"; // What is Amily pregnant with?
const AMILY_INCUBATION                  = "Amily_Incubation";
const AMILY_BUTT_PREGNANCY_TYPE         = "Amily_Butt_Pregnancy_Type";
const AMILY_OVIPOSITED_COUNTDOWN        = "Amily_Oviposited_Countdown";
const AMILY_GROSSED_OUT_BY_WORMS        = "Amily_Grossed_Out_By_Worms";
const AMILY_FOLLOWER                    = "Amily_Follower";
const AMILY_ALLOWS_FERTILITY            = "Amily_Allows_Fertility";
const FOLLOWER_AT_FARM_AMILY            = "Follower_At_Farm_Amily";


//=================
// PREGNANCY FLAGS
//
// Note that these are actual constants, not called by gameFlags. 
//=================

const INCUBATION_MOUSE                  = 350; // Incubation time for mice types/Amily
const PREGNANCY_PLAYER                  = "Pregnancy_Player"

//------------
// ENCOUNTERS
//------------
//--[[ NON-COMBAT ]]--
//Callu
const MET_OTTERGIRL                     = "Met_OtterGirl";

//Giacomo
const GIACOMO_MET                       = "Giacomo_Met";
const GIACOMO_WORMS_OFFERED             = "Giacomo_Worms_Offered";

//Lumi
const LUMI_MET                          = "Lumi_Met";

//Marcus & Lucia
const WANDERER_MET                      = "Wanderer_Met";
const WANDERER_DEMON                    = "Wanderer_Demon";
const WANDERER_EPILOGUE                 = "Wanderer_Epilogue";

//Whitney & Farm
const FARM_DISABLED                     = "Farm_Disabled";
const FARM_CORRUPTION_STARTED           = "Farm_Corruption_Started";
const MET_WHITNEY                       = "Met_Whitney";
const WHITNEY_FLIPPED_OUT_OVER_KELLY    = "Whitney_Flipped_Out_Over_Kelly";

const KELT_MET                          = "Kelt_Met";
const KELT_SUBMISSIVENESS               = "Kelt_Submissiveness";
const NEVER_RESIST_KELT                 = "Never_Resist_Kelt";
const KELT_BAD_END_WARNING              = "Kelt_Bad_End_Warning";
const KELT_DISABLED                     = "Kelt_Disabled";
const KELT_KILLED                       = "Kelt_Killed";
const KELT_BREAK_LEVEL                  = "Kelt_Break_Level";
const KELLY_CUNT_TYPE                   = "Kelly_Cunt_Type";
const KELLY_COCK_SIZE                   = "Kelly_Cock_Size";
const TIMES_PUNISHED_KELLY              = "Times_Punished_Kelly";
const TIMES_RIM_JOBBED_BY_KELLY         = "Times_Rim_Jobbed_By_Kelly";
const TIMES_RIDDEN_KELLY_FOR_PUNISHMENT = "Times_Ridden_Kelly_For_Punishment";
const KELLY_BONUS_TIT_ROWS              = "Kelly_Bonus_Tits_Row";
const KELLY_LACTATING                   = "Kelly_Lactating";
const KELLY_DISOBEYING_COUNTER          = "Kelly_Disobeying_Counter";
const KELLY_VAGINALLY_FUCKED_COUNT      = "Kelly_Vaginally_Fucked_Count";

//--[[ COMBAT ]]--
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