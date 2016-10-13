// So, a bit of weirdness about these game flags. They're constants because of how the save files work. When the player reaches an area where a flag would come into play, addToGameFlags() is called with these flags. This function fills an array full of these constant names and a value. That's what the game grabs when a save is loaded. So, while it may seem smart to change all of these into variables, don't!

//The default value for all of these flags is zero. To change the value of a flag, you have to call gameFlags[NAMEOFFLAG] = int or whatever it's getting set to. If you use addToGameFlags and set flags in this way, your values will be saved.

//------------
// META FLAGS
//------------
const SFW_MODE                          = "SFW_Mode"; // Is the game in SFW mode?


//------------
// STATS
//------------
const TIMES_TRANSFORMED                 = "Times_Transformed";
const TIMES_ORGASMED                    = "Times_Orgasmed";
const PC_FETISH                         = "PC_Fetish"; // Used in lust attack in combatTeases file
const IMPS_KILLED                       = "Imps_Killed"; // How many Imps has the player killed?
const COMBAT_BONUS_XP_VALUE             = "Combat_Bonus_XP_Value";
const SLIME_CRAVING                     = "Slime_Craving"; // Replaces Slime Craving status effect.
const GOOGIRL_BIRTHS                    = "GooGirl_Births";
const HORSE_WARNING                     = "Horse_Warning"; // In Danger of Drinking Too Much Equinum


//------------
// MISC
//------------
const HAIR_GROWTH_STOPPED_BECAUSE_LIZARD= "Hair_Growth_Stopped";
const EVER_INFESTED                     = "Ever_Infested"; // Has the PC ever been infested with worms?
const MEANINGLESS_CORRUPTION            = "Meaningless_Corruption"; //Unknown, used in Goblin victory code.
const INFESTED                          = "Infested"; // Currently infested with worms.
const HYPER_HAPPY                       = "Hyper_Happy";
const PREGNANCY_CORRUPTION              = "Pregnancy_Corruption"; // Used in Phouka pregnancy

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
// CAMP FLAGS
//------------

const CAMP_WALL_PROGRESS                = "Camp_Wall_Progress";

//------------
// SPELLS
//------------

//const KNOWS_AROUSE                      = "Knows_Arouse";
//const KNOWS_HEAL                        = "Knows_Heal";
//const KNOWS_MIGHT                       = "Knows_Might";
//const KNOWS_CHARGE                      = "Knows_Charge";
//const KNOWS_BLIND                       = "Knows_Blind";
//const KNOWS_WHITEFIRE                   = "Knows_Whitefire";

const SPELLS_CAST                       = "Spells_Cast";

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
const AMILY_CORRUPT_FLIPOUT             = "Amily_Corrupt_Flipout";
const AMILY_VILLAGE_ENCOUNTERS_DISABLED = "Amily_Village_Encounters_Disabled";
const AMILY_CONFESSED_LESBIAN           = "Amily_Confessed_Lesbian";
const AMILY_TIMES_FUCKED_FEMPC          = "Amily_Times_Fucked_FemPC";
const AMILY_WANG_GIRTH                  = "Amily_Wang_Girth";
const AMILY_HERM_TIMES_FUCKED_BY_FEMPC  = "Amily_Herm_Times_Fucked_By_FemPC";
const AMILY_HERM_QUEST                  = "Amily_Herm_Quest";
const PC_TIMES_BIRTHED_AMILYKIDS        = "PC_Times_Birthed_Amilykids";
const AMILY_VISITING_URTA               = "Amily_Visiting_Urta";
const CREATE_POTENT_MIXTURE        = "Amily_Drank_Potent_Mixture";
const AMILY_BIRTH_TOTAL                 = "Amily_Birth_Total";
const AMILY_CORRUPTION_PATH             = "Amily_Corruption_Path";
const AMILY_TREE_FLIPOUT                = "Amily_Tree_Flipout";
const AMILY_CUP_SIZE                    = "Amily_Cup_Size";
const AMILY_NIPPLE_LENGTH               = "Amily_Nipple_Length";
const AMILY_HIP_RATING                  = "Amily_Hip_Rating";
const AMILY_ASS_SIZE                    = "Amily_Ass_Size";
const AMILY_VAGINAL_WETNESS             = "Amily_Vaginal_Wetness";
const AMILY_CLOTHING                    = "Amily_Clothing";


//=================
// PREGNANCY FLAGS
//
// Note that these are actual constants, not called by gameFlags yet until the pregnancy system is figured out.
//=================

// Base incubation values for a pregnancy
const INCUBATION_MOUSE                  = 350; // Incubation time for mice types/Amily
const INCUBATION_DRIDER                 = 400;
const INCUBATION_BEE                    =  48;
const INCUBATION_IMP                    = 432; //Time for standard imps. Imp lords, Ceraph, Lilium and the imp horde cause slightly faster pregnancies


// Pregnancy event arrays
const INCUBATION_MOUSE_EVENT            = [336, 280, 216, 180, 120, 72, 48, 32]; // Event flags for Mouse Pregnancy
const INCUBATION_AMILY_EVENT            = [150, 120, 100, 96, 90, 72, 48]; // Special array for Amily pregnancy in Town Ruins.
const INCUBATION_SAND_WITCH_EVENT       = [142, 96];
const INCUBATION_TAMANI_EVENT           = [219, 96, 48];

// Pregnancy types. Marks who did the impregnation
const PREGNANCY_PLAYER                  = "Player"; // Marks the player impregnated someone
const PREGNANCY_AMILY                   = "Amily";
const PREGNANCY_BEE_EGGS                = "Bee_Eggs";
const PREGNANCY_DRIDER_EGGS             = "Drider_Eggs";
const PREGNANCY_IMP                     = "Imp";
const PREGNANCY_OVIELIXIR_EGGS          = "Ovielixir_Eggs";
const PREGNANCY_ANEMONE                 = "Anemone";


// Misc Pregnancy flags
const PC_PENDING_PREGGERS               = "PC_Pending_Preggers"; // Unsure what this is for. Used in Amily Herm Quest.

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

//Tamani and Tamani's Daughters
const TAMANI_MET                        = "Tamani_Met";
const TAMANI_TIME_OUT                   = "Tamani_Time_Out";
const TAMANI_BAD_ENDED                  = "Tamani_Bad_Ended";
const TAMANI_DAUGHTER_PREGGO_COUNTDOWN  = "Tamani_Daughter_Preggo_Countdown";
const TAMANI_NUMBER_OF_DAUGHTERS        = "Tamani_Number_Of_Daughters";
const TAMANI_TIMES_HYPNOTIZED           = "Tamani_Times_Hypnotized";
const TAMANI_DEFEAT_COUNTER             = "Tamani_Defeat_Counter";
const TAMANI_TIMES_IMPREGNATED          = "Tamani_Times_Impregnated";
const TAMANI_PREGNANCY_COUNT            = "Tamani_Pregnancy_Count"; //Current litter
const TIMES_OVIPOSITED_TAMANI           = "Times_Oviposited_Tamani";


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

const HAS_SEEN_MINO_AND_COWGIRL         = "Has_Seen_Mino_And_Cowgirl";
const MINOTAUR_CUM_ADDICT               = "Minotaur_Cum_Addict" // Replacment for status effect. Marks if you are an addict or not.
const MINOTAUR_CUM_ADDICTION_STATE      = "Minotaur_Cum_Addiction_State"; // What stage of addiction are you at?
const MINOTAUR_CUM_ADDICTION_TRACKER       = "Minotaur_Cum_Addiction_Tracker"; //How much cum? (0-120)
const TIME_SINCE_LAST_CONSUMED_MINOTAUR_CUM = "Time_Since_Last_Consumed_Minotaur_Cum" // Timer for cum problems
const EVER_DRANK_MINOCUM                    = "Ever_Drank_Minocum" // Used for playerinfo menu
const MINOTAUR_CUM_REALLY_ADDICTED_STATE    = "Minotaur_Cum_Really_Addicted_State"

//Naga
const NAGA_LAST_ENCOUNTERED_AS_NAGA     = "Naga_Last_Encountered_As_Naga"; //0 indicates player isn't naga, 1 indicates player is naga, 2 indicates player is naga but hostile.
const NAGA_FUCKED_AS_NAGA               = "Naga_Fucked_As_Naga";

//Sand Trap
const SANDTRAP_LOSS_REPEATS             = "Sandtrap_Loss_Repeats"; //Used for Sandtrap bad end tracking
const TIMES_ENCOUNTERED_SAND_TRAPS      = "Times_Encountered_Sand_Traps";
const TRAP_LEVEL                        = "Trap_Level"; // What level of the sand trap are you on?
const CLIMBED_TRAP_THIS_ROUND           = "Climbed_Trap_This_Round"; // Did you try climbing this round?
const FERTILE_SANDTRAP                  = "Fertile_Sandtrap";

//Sand Witch
const SAND_WITCH_RAPED                  = "Sand_Witch_Raped";

//Bee Girl
const BEE_GIRL_COMBAT_WINS_WITHOUT_RAPE = "Bee_Girl_Combat_Wins_Without_Rape";
const BEE_GIRL_COMBAT_WINS_WITH_RAPE    = "Bee_Girl_Combat_Wins_With_Rape";
const BEE_GIRL_COMBAT_LOSSES            = "Bee_Girl_Combat_Losses";
const BEE_BAD_END_WARNING               = "Bee_Bad_End_Warning";
const FORCE_BEE_TO_PRODUCE_HONEY        = "Force_Bee_To_Produce_Honey";

//Goo Girl
const GOOGIRL_CONSECUTIVE_LOSSES        = "GooGirl_Consecutive_Losses";
const TIMES_FUCKED_NORMAL_GOOS          = "Times_Fucked_Normal_Goos";
const GOO_TFED_MEAN                     = "Goo_TFed_Mean";
const GOO_TFED_NICE                     = "Goo_TFed_Nice";
const PC_KNOWS_ABOUT_BLACK_EGGS         = "PC_Knows_About_Black_Eggs"; //May need to move this one, and possibly integrate with Amily?
const TIMES_THOUGHT_ABOUT_GOO_RECRUITMENT = "Times_Thought_About_Goo_Recruitment";

//Green Goo
const TIMES_MET_OOZE                    = "Times_Met_Ooze";

//Oasis Demons
const OASIS_DEMONS_ACCEPT               = "Oasis_Demons_Accept";

//Tentacle Beast
const TENTACLE_COOL_DOWN                = "Tentacle_Cool_Down";
const TENTACLE_BIND                     = "Tentacle_Bind";
const TENTACLE_BAD_END                  = "Tentacle_Bad_End";
const TENTACLE_GENDERLESS_CENTAUR       = "Tentacle_Genderless_Centaur" //Unknown flag 00247;

//Worms

const WORM_INFEST_ATTEMPTED             = "Worm_Infest_Attempted";
const MET_WORMS                         = "Met_Worms";
const WORMS_FETISH                      = "Worms_Fetish"; //0 = Not Encountered, 1 = Partially on, 2 = Fully on, 3 = Off

//------------
// KEY ITEMS
//------------
// Racks

const HAS_KEY_ITEM                          = "Has_Key_Item"; // Does the player have any key items?
const HAS_ARMOR_RACK                        = "Has_Armor_Rack"; // Does the player have the armor rack?
const HAS_WEAPON_RACK                       = "Has_Weapon_Rack"; // Does the player have the weapon rack?
const HAS_EQUIPMENT_RACK                    = "Has_Equipment_Rack"; // Does the player have the equipment rack?

//---------
// PLOT VARIABLES
//---------

const FACTORY_SHUTDOWN                      = "Factory_Shutdown"; // Is the factory on, shut down, or destroyed?

//---------
// PLAYER TRANSFORMATIONS
//---------

const HAS_BLACK_NIPPLES                     = "Has_Black_Nipples";