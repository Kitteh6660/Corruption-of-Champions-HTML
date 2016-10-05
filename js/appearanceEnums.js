//Gender
const GENDER_NONE               =   0;
const GENDER_MALE               =   1;
const GENDER_FEMALE             =   2;
const GENDER_HERM               =   3;

//Skin Type
const SKIN_TYPE_PLAIN           =   0;
const SKIN_TYPE_FUR             =   1;
const SKIN_TYPE_SCALES          =   2;
const SKIN_TYPE_GOO             =   3;
const SKIN_TYPE_UNDEFINED       =   4;

//Hair Type
const HAIR_NORMAL               =   0;
const HAIR_FEATHER              =   1;
const HAIR_GHOST                =   2;
const HAIR_GOO                  =   3;
const HAIR_ANEMONE              =   4;
const HAIR_QUILL                =   5;

//Beard Type
const BEARD_NORMAL              =   0;
const BEARD_GOATEE              =   1;

//Face Type
const FACE_HUMAN                =   0;
const FACE_HORSE                =   1;
const FACE_DOG                  =   2;
const FACE_COW_MINOTAUR         =   3;
const FACE_SHARK_TEETH          =   4;
const FACE_SNAKE_FANGS          =   5;
const FACE_CAT                  =   6;
const FACE_LIZARD               =   7;
const FACE_BUNNY                =   8;
const FACE_KANGAROO             =   9;
const FACE_SPIDER_FANGS         =  10;
const FACE_FOX                  =  11;
const FACE_DRAGON               =  12;
const FACE_RACCOON_MASK         =  13;
const FACE_RACCOON              =  14;
const FACE_BUCKTEETH            =  15;
const FACE_MOUSE                =  16;
const FACE_FERRET_MASK          =  17;
const FACE_FERRET               =  18;
const FACE_PIG                  =  19;
const FACE_BOAR                 =  20;
const FACE_RHINO                =  21;
const FACE_ECHIDNA              =  22;
const FACE_DEER                 =  23;

//Tongue Type
const TONGUE_HUMAN              =   0;
const TONGUE_SNAKE              =   1;
const TONGUE_DEMONIC            =   2;
const TONGUE_DRACONIC           =   3;
const TONGUE_ECHIDNA            =   4;

//Eye Type
const EYES_HUMAN                =   0;
const EYES_FOUR_SPIDER_EYES     =   1;
const EYES_BLACK_EYES_SAND_TRAP =   2;

//Ear Type
const EARS_HUMAN                =   0;
const EARS_HORSE                =   1;
const EARS_DOG                  =   2;
const EARS_COW                  =   3;
const EARS_ELFIN                =   4;
const EARS_CAT                  =   5;
const EARS_LIZARD               =   6;
const EARS_BUNNY                =   7;
const EARS_KANGAROO             =   8;
const EARS_FOX                  =   9;
const EARS_DRAGON               =  10;
const EARS_RACCOON              =  11;
const EARS_MOUSE                =  12;
const EARS_FERRET               =  13;
const EARS_PIG                  =  14;
const EARS_RHINO                =  15;
const EARS_ECHIDNA              =  16;
const EARS_DEER                 =  17;

//Horn Type
const HORNS_NONE                =   0;
const HORNS_DEMON               =   1;
const HORNS_COW_MINOTAUR        =   2;
const HORNS_DRACONIC_X2         =   3;
const HORNS_DRACONIC_X4_12_INCH_LONG = 4;
const HORNS_ANTLERS             =   5;
const HORNS_GOAT                =   6;
const HORNS_UNICORN             =   7;
const HORNS_RHINO               =   8;

//Antennae Type
const ANTENNAE_NONE             =   0;
const ANTENNAE_FAIRY            =   1;
const ANTENNAE_BEE              =   2;

//Arm Type
const ARM_TYPE_HUMAN            =   0;
const ARM_TYPE_HARPY            =   1;
const ARM_TYPE_SPIDER           =   2;

// clawType
const CLAW_TYPE_NORMAL                                            =   0;
const CLAW_TYPE_LIZARD                                            =   1;
const CLAW_TYPE_DRAGON                                            =   2;
const CLAW_TYPE_SALAMANDER                                        =   3;
const CLAW_TYPE_CAT                                               =   4; // NYI! Placeholder for now!! (See http://tiny.cc/coc-revamp-claws)
const CLAW_TYPE_DOG                                               =   5; // NYI! Placeholder for now!! (See http://tiny.cc/coc-revamp-claws)
const CLAW_TYPE_RAPTOR                                            =   6; // NYI! Placeholder for now!! (See http://tiny.cc/coc-revamp-claws) Giev teh Rapturs :-)
const CLAW_TYPE_MANTIS                                            =   7; // NYI! Placeholder for Xianxia mod (See http://tiny.cc/coc-xianxia-mod)

//Tail Type
const TAIL_TYPE_NONE            =   0;
const TAIL_TYPE_HORSE           =   1;
const TAIL_TYPE_DOG             =   2;
const TAIL_TYPE_DEMONIC         =   3;
const TAIL_TYPE_COW             =   4;
const TAIL_TYPE_SPIDER_ADBOMEN  =   5;
const TAIL_TYPE_BEE_ABDOMEN     =   6;
const TAIL_TYPE_SHARK           =   7;
const TAIL_TYPE_CAT             =   8;
const TAIL_TYPE_LIZARD          =   9;
const TAIL_TYPE_RABBIT          =  10;
const TAIL_TYPE_HARPY           =  11;
const TAIL_TYPE_KANGAROO        =  12;
const TAIL_TYPE_FOX             =  13;
const TAIL_TYPE_DRACONIC        =  14;
const TAIL_TYPE_RACCOON         =  15;
const TAIL_TYPE_MOUSE           =  16;
const TAIL_TYPE_FERRET          =  17;
const TAIL_TYPE_BEHEMOTH        =  18;
const TAIL_TYPE_PIG             =  19;
const TAIL_TYPE_SCORPION        =  20;
const TAIL_TYPE_GOAT            =  21;
const TAIL_TYPE_RHINO           =  22;
const TAIL_TYPE_ECHIDNA         =  23;
const TAIL_TYPE_DEER            =  24;

//Lower Body Type
const LOWER_BODY_TYPE_HUMAN     =   0;
const LOWER_BODY_TYPE_HOOFED    =   1;
const LOWER_BODY_TYPE_DOG       =   2;
const LOWER_BODY_TYPE_NAGA      =   3;
const LOWER_BODY_TYPE_CENTAUR   =   4;
const LOWER_BODY_TYPE_DEMONIC_HIGH_HEELS = 5;
const LOWER_BODY_TYPE_DEMONIC_CLAWS = 6;
const LOWER_BODY_TYPE_BEE       =   7;
const LOWER_BODY_TYPE_GOO       =   8;
const LOWER_BODY_TYPE_CAT       =   9;
const LOWER_BODY_TYPE_LIZARD    =  10;
const LOWER_BODY_TYPE_PONY      =  11;
const LOWER_BODY_TYPE_BUNNY     =  12;
const LOWER_BODY_TYPE_HARPY     =  13;
const LOWER_BODY_TYPE_KANGAROO  =  14;
const LOWER_BODY_TYPE_CHITINOUS_SPIDER_LEGS = 15;
const LOWER_BODY_TYPE_DRIDER_LOWER_BODY = 16;
const LOWER_BODY_TYPE_FOX       =  17;
const LOWER_BODY_TYPE_DRAGON    =  18;
const LOWER_BODY_TYPE_RACCOON   =  19;
const LOWER_BODY_TYPE_FERRET    =  20;
const LOWER_BODY_TYPE_CLOVEN_HOOFED = 21;
const LOWER_BODY_TYPE_RHINO     =  22;
const LOWER_BODY_TYPE_ECHIDNA   =  23;
const LOWER_BODY_TYPE_DEERTAUR  =  24;

//Wing Type
const WING_TYPE_NONE            =   0;
const WING_TYPE_BEE_LIKE_SMALL  =   1;
const WING_TYPE_BEE_LIKE_LARGE  =   2;
const WING_TYPE_HARPY           =   4;
const WING_TYPE_IMP             =   5;
const WING_TYPE_BAT_LIKE_TINY   =   6;
const WING_TYPE_BAT_LIKE_LARGE  =   7;
const WING_TYPE_SHARK_FIN       =   8;
const WING_TYPE_FEATHERED_LARGE =   9;
const WING_TYPE_DRACONIC_SMALL  =  10;
const WING_TYPE_DRACONIC_LARGE  =  11;
const WING_TYPE_GIANT_DRAGONFLY =  12;

//Piercing Type
const PIERCING_TYPE_NONE        =   0;
const PIERCING_TYPE_STUD        =   1;
const PIERCING_TYPE_RING        =   2;
const PIERCING_TYPE_LADDER      =   3;
const PIERCING_TYPE_HOOP        =   4;
const PIERCING_TYPE_CHAIN       =   5;

//Cock Type
CockTypesEnum = [];
CockTypesEnum.UNDEFINED         =  -1;
CockTypesEnum.HUMAN             =   0;
CockTypesEnum.HORSE             =   1;
CockTypesEnum.DOG               =   2;
CockTypesEnum.DEMON             =   3;
CockTypesEnum.TENTACLE          =   4;
CockTypesEnum.CAT               =   5;
CockTypesEnum.LIZARD            =   6;
CockTypesEnum.ANEMONE           =   7;
CockTypesEnum.KANGAROO          =   8;
CockTypesEnum.DRAGON            =   9;
CockTypesEnum.DISPLACER         =  10;
CockTypesEnum.FOX               =  11;
CockTypesEnum.BEE               =  12;
CockTypesEnum.PIG               =  13;
CockTypesEnum.AVIAN             =  14;
CockTypesEnum.RHINO             =  15;
CockTypesEnum.ECHIDNA           =  16;

//Vagina Type
VaginaTypesEnum = [];
VaginaTypesEnum.HUMAN           =   0;
VaginaTypesEnum.EQUINE          =   1;
VaginaTypesEnum.BLACK_SAND_TRAP =   5;

//Vaginal Wetness
const VAGINA_WETNESS_DRY        =   0;
const VAGINA_WETNESS_NORMAL     =   1;
const VAGINA_WETNESS_WET        =   2;
const VAGINA_WETNESS_SLICK      =   3;
const VAGINA_WETNESS_DROOLING   =   4;
const VAGINA_WETNESS_SLAVERING  =   5;

//Vaginal Looseness
const VAGINA_LOOSENESS_TIGHT    =   0;
const VAGINA_LOOSENESS_NORMAL   =   1;
const VAGINA_LOOSENESS_LOOSE    =   2;
const VAGINA_LOOSENESS_GAPING   =   3;
const VAGINA_LOOSENESS_GAPING_WIDE = 4;
const VAGINA_LOOSENESS_CLOWN_CAR = 5;

//Anal Wetness
const ANAL_WETNESS_DRY          =   0;
const ANAL_WETNESS_NORMAL       =   1;
const ANAL_WETNESS_MOIST        =   2;
const ANAL_WETNESS_SLIMY        =   3;
const ANAL_WETNESS_DROOLING     =   4;
const ANAL_WETNESS_SLIME_DROOLING = 5;

//Anal Looseness
const ANAL_LOOSENESS_VIRGIN     =   0;
const ANAL_LOOSENESS_TIGHT      =   1;
const ANAL_LOOSENESS_NORMAL     =   2;
const ANAL_LOOSENESS_LOOSE      =   3;
const ANAL_LOOSENESS_STRETCHED  =   4;
const ANAL_LOOSENESS_GAPING     =   5;

// Hip Rating
const HIP_RATING_BOYISH         =   0;
const HIP_RATING_SLENDER        =   2;
const HIP_RATING_AVERAGE        =   4;
const HIP_RATING_AMPLE          =   6;
const HIP_RATING_CURVY          =  10;
const HIP_RATING_FERTILE        =  15;
const HIP_RATING_INHUMANLY_WIDE =  20;

// Butt Rating
const BUTT_RATING_BUTTLESS      =   0;
const BUTT_RATING_TIGHT         =   2;
const BUTT_RATING_AVERAGE       =   4;
const BUTT_RATING_NOTICEABLE    =   6;
const BUTT_RATING_LARGE         =   8;
const BUTT_RATING_JIGGLY        =  10;
const BUTT_RATING_EXPANSIVE     =  13;
const BUTT_RATING_HUGE          =  16;
const BUTT_RATING_INCONCEIVABLE =  20;

//Breast Size
const BREAST_CUP_FLAT           =   0;
const BREAST_CUP_A              =   1;
const BREAST_CUP_B              =   2;
const BREAST_CUP_C              =   3;
const BREAST_CUP_D              =   4;
const BREAST_CUP_DD             =   5;
const BREAST_CUP_DD_BIG         =   6;
const BREAST_CUP_E              =   7;
const BREAST_CUP_E_BIG          =   8;
const BREAST_CUP_EE             =   9;
const BREAST_CUP_EE_BIG         =  10;
const BREAST_CUP_F              =  11;
const BREAST_CUP_F_BIG          =  12;
const BREAST_CUP_FF             =  13;
const BREAST_CUP_FF_BIG         =  14;
const BREAST_CUP_G              =  15;
const BREAST_CUP_G_BIG          =  16;
const BREAST_CUP_GG             =  17;
const BREAST_CUP_GG_BIG         =  18;
const BREAST_CUP_H              =  19;
const BREAST_CUP_H_BIG          =  20;
const BREAST_CUP_HH             =  21;
const BREAST_CUP_HH_BIG         =  22;
const BREAST_CUP_HHH            =  23;
const BREAST_CUP_I              =  24;
const BREAST_CUP_I_BIG          =  25;
const BREAST_CUP_II             =  26;
const BREAST_CUP_II_BIG         =  27;
const BREAST_CUP_J              =  28;
const BREAST_CUP_J_BIG          =  29;
const BREAST_CUP_JJ             =  30;
const BREAST_CUP_JJ_BIG         =  31;
const BREAST_CUP_K              =  32;
const BREAST_CUP_K_BIG          =  33;
const BREAST_CUP_KK             =  34;
const BREAST_CUP_KK_BIG         =  35;
const BREAST_CUP_L              =  36;
const BREAST_CUP_L_BIG          =  37;
const BREAST_CUP_LL             =  38;
const BREAST_CUP_LL_BIG         =  39;
const BREAST_CUP_M              =  40;
const BREAST_CUP_M_BIG          =  41;
const BREAST_CUP_MM             =  42;
const BREAST_CUP_MM_BIG         =  43;
const BREAST_CUP_MMM            =  44;
const BREAST_CUP_MMM_LARGE      =  45;
const BREAST_CUP_N              =  46;
const BREAST_CUP_N_LARGE        =  47;
const BREAST_CUP_NN             =  48;
const BREAST_CUP_NN_LARGE       =  49;
const BREAST_CUP_O              =  50;
const BREAST_CUP_O_LARGE        =  51;
const BREAST_CUP_OO             =  52;
const BREAST_CUP_OO_LARGE       =  53;
const BREAST_CUP_P              =  54;
const BREAST_CUP_P_LARGE        =  55;
const BREAST_CUP_PP             =  56;
const BREAST_CUP_PP_LARGE       =  57;
const BREAST_CUP_Q              =  58;
const BREAST_CUP_Q_LARGE        =  59;
const BREAST_CUP_QQ             =  60;
const BREAST_CUP_QQ_LARGE       =  61;
const BREAST_CUP_R              =  62;
const BREAST_CUP_R_LARGE        =  63;
const BREAST_CUP_RR             =  64;
const BREAST_CUP_RR_LARGE       =  65;
const BREAST_CUP_S              =  66;
const BREAST_CUP_S_LARGE        =  67;
const BREAST_CUP_SS             =  68;
const BREAST_CUP_SS_LARGE       =  69;
const BREAST_CUP_T              =  70;
const BREAST_CUP_T_LARGE        =  71;
const BREAST_CUP_TT             =  72;
const BREAST_CUP_TT_LARGE       =  73;
const BREAST_CUP_U              =  74;
const BREAST_CUP_U_LARGE        =  75;
const BREAST_CUP_UU             =  76;
const BREAST_CUP_UU_LARGE       =  77;
const BREAST_CUP_V              =  78;
const BREAST_CUP_V_LARGE        =  79;
const BREAST_CUP_VV             =  80;
const BREAST_CUP_VV_LARGE       =  81;
const BREAST_CUP_W              =  82;
const BREAST_CUP_W_LARGE        =  83;
const BREAST_CUP_WW             =  84;
const BREAST_CUP_WW_LARGE       =  85;
const BREAST_CUP_X              =  86;
const BREAST_CUP_X_LARGE        =  87;
const BREAST_CUP_XX             =  88;
const BREAST_CUP_XX_LARGE       =  89;
const BREAST_CUP_Y              =  90;
const BREAST_CUP_Y_LARGE        =  91;
const BREAST_CUP_YY             =  92;
const BREAST_CUP_YY_LARGE       =  93;
const BREAST_CUP_Z              =  94;
const BREAST_CUP_Z_LARGE        =  95;
const BREAST_CUP_ZZ             =  96;
const BREAST_CUP_ZZ_LARGE       =  97;
const BREAST_CUP_ZZZ            =  98;
const BREAST_CUP_ZZZ_LARGE      =  99;
const BREAST_CUP_HYPER_A        = 100; // Hyper threshold
const BREAST_CUP_HYPER_B        = 101;
const BREAST_CUP_HYPER_C        = 102;
const BREAST_CUP_HYPER_D        = 103;
const BREAST_CUP_HYPER_DD       = 104;
const BREAST_CUP_HYPER_DD_BIG   = 105;
const BREAST_CUP_HYPER_E        = 106;
const BREAST_CUP_HYPER_E_BIG    = 107;
const BREAST_CUP_HYPER_EE       = 108;
const BREAST_CUP_HYPER_EE_BIG   = 109;
const BREAST_CUP_HYPER_F        = 110;
const BREAST_CUP_HYPER_F_BIG    = 111;
const BREAST_CUP_HYPER_FF       = 112;
const BREAST_CUP_HYPER_FF_BIG   = 113;
const BREAST_CUP_HYPER_G        = 114;
const BREAST_CUP_HYPER_G_BIG    = 115;
const BREAST_CUP_HYPER_GG       = 116;
const BREAST_CUP_HYPER_GG_BIG   = 117;
const BREAST_CUP_HYPER_H        = 118;
const BREAST_CUP_HYPER_H_BIG    = 119;
const BREAST_CUP_HYPER_HH       = 120;
const BREAST_CUP_HYPER_HH_BIG   = 121;
const BREAST_CUP_HYPER_HHH      = 122;
const BREAST_CUP_HYPER_I        = 123;
const BREAST_CUP_HYPER_I_BIG    = 124;
const BREAST_CUP_HYPER_II       = 125;
const BREAST_CUP_HYPER_II_BIG   = 126;
const BREAST_CUP_HYPER_J        = 127;
const BREAST_CUP_HYPER_J_BIG    = 128;
const BREAST_CUP_HYPER_JJ       = 129;
const BREAST_CUP_HYPER_JJ_BIG   = 130;
const BREAST_CUP_HYPER_K        = 131;
const BREAST_CUP_HYPER_K_BIG    = 132;
const BREAST_CUP_HYPER_KK       = 133;
const BREAST_CUP_HYPER_KK_BIG   = 134;
const BREAST_CUP_HYPER_L        = 135;
const BREAST_CUP_HYPER_L_BIG    = 136;
const BREAST_CUP_HYPER_LL       = 137;
const BREAST_CUP_HYPER_LL_BIG   = 138;
const BREAST_CUP_HYPER_M        = 139;
const BREAST_CUP_HYPER_M_BIG    = 140;
const BREAST_CUP_HYPER_MM       = 141;
const BREAST_CUP_HYPER_MM_BIG   = 142;
const BREAST_CUP_HYPER_MMM      = 143;
const BREAST_CUP_HYPER_MMM_LARGE= 144;
const BREAST_CUP_HYPER_N        = 145;
const BREAST_CUP_HYPER_N_LARGE  = 146;
const BREAST_CUP_HYPER_NN       = 147;
const BREAST_CUP_HYPER_NN_LARGE = 148;
const BREAST_CUP_HYPER_O        = 149;
const BREAST_CUP_HYPER_O_LARGE  = 150;
const BREAST_CUP_HYPER_OO       = 151;
const BREAST_CUP_HYPER_OO_LARGE = 152;
const BREAST_CUP_HYPER_P        = 153;
const BREAST_CUP_HYPER_P_LARGE  = 154;
const BREAST_CUP_HYPER_PP       = 155;
const BREAST_CUP_HYPER_PP_LARGE = 156;
const BREAST_CUP_HYPER_Q        = 157;
const BREAST_CUP_HYPER_Q_LARGE  = 158;
const BREAST_CUP_HYPER_QQ       = 159;
const BREAST_CUP_HYPER_QQ_LARGE = 160;
const BREAST_CUP_HYPER_R        = 161;
const BREAST_CUP_HYPER_R_LARGE  = 162;
const BREAST_CUP_HYPER_RR       = 163;
const BREAST_CUP_HYPER_RR_LARGE = 164;
const BREAST_CUP_HYPER_S        = 165;
const BREAST_CUP_HYPER_S_LARGE  = 166;
const BREAST_CUP_HYPER_SS       = 167;
const BREAST_CUP_HYPER_SS_LARGE = 168;
const BREAST_CUP_HYPER_T        = 169;
const BREAST_CUP_HYPER_T_LARGE  = 170;
const BREAST_CUP_HYPER_TT       = 171;
const BREAST_CUP_HYPER_TT_LARGE = 172;
const BREAST_CUP_HYPER_U        = 173;
const BREAST_CUP_HYPER_U_LARGE  = 174;
const BREAST_CUP_HYPER_UU       = 175;
const BREAST_CUP_HYPER_UU_LARGE = 176;
const BREAST_CUP_HYPER_V        = 177;
const BREAST_CUP_HYPER_V_LARGE  = 178;
const BREAST_CUP_HYPER_VV       = 179;
const BREAST_CUP_HYPER_VV_LARGE = 180;
const BREAST_CUP_HYPER_W        = 181;
const BREAST_CUP_HYPER_W_LARGE  = 182;
const BREAST_CUP_HYPER_WW       = 183;
const BREAST_CUP_HYPER_WW_LARGE = 184;
const BREAST_CUP_HYPER_X        = 185;
const BREAST_CUP_HYPER_X_LARGE  = 186;
const BREAST_CUP_HYPER_XX       = 187;
const BREAST_CUP_HYPER_XX_LARGE = 188;
const BREAST_CUP_HYPER_Y        = 189;
const BREAST_CUP_HYPER_Y_LARGE  = 190;
const BREAST_CUP_HYPER_YY       = 191;
const BREAST_CUP_HYPER_YY_LARGE = 192;
const BREAST_CUP_HYPER_Z        = 193;
const BREAST_CUP_HYPER_Z_LARGE  = 194;
const BREAST_CUP_HYPER_ZZ       = 195;
const BREAST_CUP_HYPER_ZZ_LARGE = 196;
const BREAST_CUP_HYPER_ZZZ      = 197;
const BREAST_CUP_HYPER_ZZZ_LARGE= 198; //Beyond this size is Jacques00-cup
