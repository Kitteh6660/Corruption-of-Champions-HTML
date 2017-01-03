function mainMenu() {
    // Check to see if the user has a bad browser
	if (typeof(Storage) !== "undefined") {
		// All good to go!
	}
    else if (GetIEVersion() < 11) {
        errorOldInternetExplorerEwwww();
        return;
    }
    else if (GetIEVersion() >= 11) { //Don't run the game if on Edge or IE11 due to issues.
        errorEdgeNeverWorks();
        return;
    }
    else {
		errorOldBrowser();
        return;
	}
    Data.loadSettings();
    clearOutput();
    // Load the start screen
    outputText("<img src=\"assets/interface/CoCLogo.png\" height=\"300\" width=\"400\"><br>");
	outputText("Corruption of Champions: HTML Edition (" + gameVersion + ")<br><br>");
	outputText("Original CoC by Fenoxo. Rewritten by Kitteh6660.");
	menu();
	hideStats();
	hideUpDown();
	hideMenus();
    setMenuButton("buttonMain", "New Game", CharCreation.initializeNewGame);
    showMenuButton("buttonMain");
    showMenuButton("buttonData");
	playerMenu = mainMenu;
    if (gameStarted) addButton(0, "Resume", Camp.doCamp);
    else addButtonDisabled(0, "Resume", "Please load a game or start a new game first.");
	addButton(1, "Settings", settingsScreenMain);
    addButton(2, "Credits", creditsScreen);
}
//---------
// GetIEVersion(), errorOldBrowser(), and errorOldInternetExplorereEwwww()
// Used for browser compatibility checks
//---------


function GetIEVersion() {
    var sAgent = window.navigator.userAgent;
    var Idx = sAgent.indexOf("MSIE");
    //Check if on Edge
    if (Idx == -1) {
        Idx = sAgent.indexOf("Edge");
    }
    // If IE, return version number.
    if (Idx > 0)
        return parseInt(sAgent.substring(Idx+ 5, sAgent.indexOf(".", Idx)));

    // If IE 11 then look for Updated user agent string.
    else if (!!navigator.userAgent.match(/Trident\/7\./))
        return 11;

    else 
        return 0; //It is not IE
}

function errorOldBrowser() {
	clearOutput();
	outputText("<b><u>ERROR</u></b><br>Sorry, your browser is too old to be able to use local storage. Please use a modern browser.");
	menu();
    hideMenus();
}
function errorOldInternetExplorerEwwww() {
    clearOutput();
    outputText("<font size=\"64\"><b>:(</b></font><br>Please don't use Internet Explorer, especially the old version. It's a shitty browser. Do me a favour and upgrade your browser or switch to Firefox or Chrome.");
    menu();
    hideMenus();
}
function errorEdgeNeverWorks() {
    clearOutput();
    outputText("<font size=\"64\"><b>:(</b></font><br>Unfortunately, it appears that Microsoft Edge won't be able to run this game properly due to issue with local storage. I will look for possible workarounds. Until then, please switch to Firefox or Chrome.");
    menu();
    hideMenus();
}
//------------
// SETTINGS
//------------
function settingsScreenMain() {
    Data.saveSettings();
    clearOutput();
    //Silly Mode
    if (silly)
        outputText("Silly Mode: <b><font color=\"#008000\">ON</font></b><br>&nbsp; Crazy, nonsensical, and possibly hilarious things may occur.<br><br>");
    else
        outputText("Silly Mode: <b><font color=\"#800000\">OFF</font></b><br>&nbsp; You're an incorrigable stick-in-the-mud with no sense of humour.<br><br>");
    //Time Format
    if (use12Hours)
        outputText("Time Format: <b>12 hours</b><br>&nbsp; 12-hour format will be used. Time will use AM/PM.<br><br>");
    else
        outputText("Time Format: <b>24 hours</b><br>&nbsp; 24-hour format will be used.<br><br>");
    //Set buttons
    menu();
    addButton(0, "Silly Mode", toggleSilly);
    addButton(1, "Time Format", toggleTimeFormat);
    addButton(4, "Font", fontSettings);
    addButton(14, "Back", mainMenu);
}
//Game settings
function toggleSilly() {
    if (silly)
        silly = false;
    else
        silly = true;
    settingsScreenMain();
}
function toggleTimeFormat() {
    if (use12Hours)
        use12Hours = false;
    else
        use12Hours = true;
    settingsScreenMain();
}
//Font settings
function fontSettings() {
    clearOutput();
    outputText("<b>Here, you can change the font and size.</b><br><br>");
    outputText("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae turpis nec ipsum fermentum pellentesque. Nam consectetur euismod diam. Proin vitae neque in massa tempor suscipit eget at mi. In hac habitasse platea dictumst. Morbi laoreet erat et sem hendrerit mattis. Cras in mauris vestibulum nunc fringilla condimentum. Nam sed arcu non ipsum luctus dignissim a eget ante. Curabitur dapibus neque at elit iaculis, ac aliquam libero dapibus. Sed non lorem diam. In pretium vehicula facilisis. In euismod imperdiet felis, vitae ultrices magna cursus at. Vivamus orci urna, fringilla ac elementum eu, accumsan vel nunc. Donec faucibus dictum erat convallis efficitur. Maecenas cursus suscipit magna, id dapibus augue posuere ut.<br><br>");
    outputText("Ut urna mauris, posuere a justo sit amet, elementum consequat urna. Donec mattis lorem leo, vitae lacinia velit commodo ac. Aliquam lectus purus, maximus quis dui id, pulvinar porta odio. Nullam et neque sed purus porta tincidunt ut id metus. Sed vehicula, arcu a fermentum dapibus, nisl ante tincidunt nunc, a euismod diam massa id est. Nulla rhoncus dapibus neque, ac tempor erat venenatis ut. Pellentesque ac bibendum quam, ac congue enim. Aenean ipsum nunc, ultrices tincidunt tortor ultrices, dapibus accumsan est. Donec dignissim sodales lacus nec pretium. Praesent porttitor, nisl vel cursus ornare, orci quam molestie ex, ac consequat est risus vitae enim. Suspendisse pulvinar scelerisque rutrum. Sed quis volutpat orci. Duis vulputate egestas risus ac sollicitudin. Maecenas ullamcorper lorem non lectus suscipit, varius suscipit metus mollis.<br><br>");
    outputText("Etiam commodo libero vel metus tempor consequat. Maecenas non massa ac ligula sodales aliquam id et orci. Ut convallis enim massa, eu rhoncus sem elementum id. In tincidunt turpis at tristique rhoncus. Cras vehicula aliquet elit. Nunc varius tincidunt elit, vitae laoreet libero tristique non. Cras vitae congue nisi, vitae accumsan dui. Integer sit amet congue diam. Aliquam accumsan sagittis aliquet. Sed dignissim justo sit amet tincidunt viverra. Integer at purus ut enim blandit rhoncus at id nibh. Vivamus ultricies ornare tempor. Suspendisse consectetur, dolor sit amet tincidunt semper, lorem risus mollis nisl, eu aliquet leo sem nec mauris. Curabitur libero est, varius sit amet est ut, accumsan consequat ante. Proin non nunc dignissim ipsum accumsan semper eu vel velit. Ut malesuada mauris vitae nisi convallis varius.<br><br>");
    menu();
    addButton(0, "Main Font", changeMainFont);
    if (mainFontSizeIndex < 8) addButton(5, "Main Size+", changeMainFontSize, "bigger");
    if (mainFontSizeIndex > 0) addButton(10, "Main Size-", changeMainFontSize, "smaller");

    addButton(14, "Back", settingsScreenMain);
}
function changeMainFont() {
    mainFont = window.prompt("Choose a font to use. Note that it'll only work if you have the font installed on your device.", mainFont);
    applyFontSettings();
    fontSettings();
}
function changeMainFontSize(biggerSmaller) {
    if (mainFontSizeIndex == undefined) mainFontSizeIndex = 4; //Fix font size.
    if (biggerSmaller == "bigger") {
        mainFontSizeIndex++;
    }
    else {
        mainFontSizeIndex--;
    }
    //Constrain font size settings
    if (mainFontSizeIndex < 0) mainFontSizeIndex = 0;
    if (mainFontSizeIndex > 8) mainFontSizeIndex = 8;
    applyFontSettings();
    fontSettings();
}
function applyFontSettings() {
    document.getElementById("maintext").style.fontFamily = mainFont + ", serif";
    document.getElementById("maintext").style.fontSize = mainFontSizeArray[mainFontSizeIndex];
}

//------------
// CREDITS
//------------
function creditsScreen() {
    clearOutput();
    //displayHeader("Credits");
    var creditsContents = "";

    creditsContents += "<b><u>Original Game Creator:</u></b>";
    creditsContents += "<ul>";
    creditsContents += "<li> Fenoxo</li>";
    creditsContents += "</ul>";

    creditsContents += "<b><u>HTML Coding:</u></b>";
    creditsContents += "<ul>";
    creditsContents += "<li> Kitteh6660 (Main coder)</li>";
    creditsContents += "<li> Mattibun</li>";
    creditsContents += "</ul>";

    /*creditsContents += "<b><u>Game Mod Contributors:</u></b>";
    creditsContents += "<ul>";
    creditsContents += "<li> Parth37955 (Pure Jojo anal pitch scene, Behemoth's vaginal catch scene)</li>";
    creditsContents += "<li> Liadri (Manticore and Dragonne suggestions)</li>";
    creditsContents += "<li> Warbird Zero (Replacement Ingnam descriptions)</li>";
    creditsContents += "</ul>";

    creditsContents += "<b><u>Game Mod Supplementary Events:</u></b>";
    creditsContents += "<ul>";
    creditsContents += "<li> worldofdrakan (Pigtail Truffles & Pig/Boar TF)</li>";
    creditsContents += "<li> FeiFongWong (Prisoner Mod)</li>";
    creditsContents += "<li> Foxxling (Lizan Rogue, Skin Oils & Body Lotions, Black Cock)</li>";
    creditsContents += "<li> LukaDoc (Bimbo Jojo)</li>";
    creditsContents += "<li> Kitteh6660 (Behemoth, Cabin, Ingnam, Pure Jojo sex scenes. Feel free to help me with quality control.)</li>";
    creditsContents += "</ul>";*/

    /*creditsContents += "<b><u>Game Mod Bug Reporting:</u></b>";
    creditsContents += "<ul>";
    creditsContents += "<li> Wastarce</li>";
    creditsContents += "<li> Sorenant</li>";
    creditsContents += "<li> tadams857</li>";
    creditsContents += "<li> SirWolfie</li>";
    creditsContents += "<li> Atlas1965</li>";
    creditsContents += "<li> Elitist</li>";
    creditsContents += "<li> Bsword</li>";
    creditsContents += "<li> stationpass</li>";
    creditsContents += "<li> JDoraime</li>";
    creditsContents += "<li> Ramses</li>";
    creditsContents += "<li> OPenaz</li>";
    creditsContents += "<li> EternalDragon (github)</li>";
    creditsContents += "<li> PowerOfVoid (github)</li>";
    creditsContents += "<li> kalleangka (github)</li>";
    creditsContents += "<li> sworve (github)</li>";
    creditsContents += "<li> Netys (github)</li>";
    creditsContents += "</ul>";*/

    creditsContents += "<b><u>The contents below are leftover from Flash. This will be sorted out later.</u></b><br><br>"

    creditsContents += "<b><u>Typo Reporting</u></b>";
    creditsContents += "<ul>";
    creditsContents += "<li> SoS</li>";
    creditsContents += "<li> Prisoner416</li>";
    creditsContents += "<li> Chibodee</li>";
    creditsContents += "</ul>";

    creditsContents += "<b><u>Graphical Prettiness:</u></b>";
    creditsContents += "<ul>";
    creditsContents += "<li> Dasutin (Background Images)</li>";
    creditsContents += "<li> Invader (Button Graphics, Font, and Other Hawtness)</li>";
    creditsContents += "</ul>";

    creditsContents += "<b><u>Supplementary Events:</u></b>";
    creditsContents += "<ul>";
    creditsContents += "<li> Dxasmodeus (Tentacles, Worms, Giacomo)</li>";
    creditsContents += "<li> Kirbster (Christmas Bunny Trap)</li>";
    creditsContents += "<li> nRage (Kami the Christmas Roo)</li>";
    creditsContents += "<li> Abraxas (Alternate Naga Scenes w/Various Monsters, Tamani Anal, Female Shouldra Tongue Licking, Chameleon Girl, Christmas Harpy)</li>";
    creditsContents += "<li> Astronomy (Fetish Cultist Centaur Footjob Scene)</li>";
    creditsContents += "<li> Adjatha (Scylla the Cum Addicted Nun, Vala, Goo-girls, Bimbo Sophie Eggs, Ceraph Urta Roleplay, Gnoll with Balls Scene, Kiha futa scene, Goblin Web Fuck Scene, and 69 Bunny Scene)</li>";
    creditsContents += "<li> ComfyCushion (Muff Wrangler)</li>";
    creditsContents += "<li> B (Brooke)</li>";
    creditsContents += "<li> Quiet Browser (Half of Niamh, Ember, Amily The Mouse-girl Breeder, Katherine, Part of Katherine Employment Expansion, Urta's in-bar Dialogue Trees, some of Izma, Loppe)</li>";
    creditsContents += "<li> Indirect (Alternate Non-Scylla Katherine Recruitment, Part of Katherine Employment Expansion, Phouka, Coding of Bee Girl Expansion)</li>";
    creditsContents += "<li> Schpadoinkle (Victoria Sex)</li>";
    creditsContents += "<li> Donto (Ro'gar the Orc, Polar Pete)</li>";
    creditsContents += "<li> Angel (Additional Amily Scenes)</li>";
    creditsContents += "<li> Firedragon (Additional Amily Scenes)</li>";
    creditsContents += "<li> Danaume (Jojo masturbation texts)</li>";
    creditsContents += "<li> LimitLax (Sand-Witch Bad-End)</li>";
    creditsContents += "<li> KLN (Equinum Bad-End)</li>";
    creditsContents += "<li> TheDarkTemplar11111 (Canine Pepper Bad End)</li>";
    creditsContents += "<li> Silmarion (Canine Pepper Bad End)</li>";
    creditsContents += "<li> Soretu (Original Minotaur Rape)</li>";
    creditsContents += "<li> NinjArt (Small Male on Goblin Rape Variant)</li>";
    creditsContents += "<li> DoubleRedd (\"Too Big\" Corrupt Goblin Fuck)</li>";
    creditsContents += "<li> Nightshade (Additional Minotaur Rape)</li>";
    creditsContents += "<li> JCM (Imp Night Gangbang, Addition Minotaur Loss Rape - Oral)</li>";
    creditsContents += "<li> Xodin (Nipplefucking paragraph of Imp GangBang, Encumbered by Big Genitals Exploration Scene, Big Bits Run Encumbrance, Player Getting Beer Tits, Sand Witch Dungeon Misc Scenes)</li>";
    creditsContents += "<li> Blusox6 (Original Queen Bee Rape)</li>";
    creditsContents += "<li> Thrext (Additional Masturbation Code, Faerie, Ivory Succubus)</li>";
    creditsContents += "<li> XDumort (Genderless Anal Masturbation)</li>";
    creditsContents += "<li> Uldego (Slime Monster)</li>";
    creditsContents += "<li> Noogai, Reaper, and Numbers (Nipple-Fucking Victory vs Imp Rape)</li>";
    creditsContents += "<li> Verse and IAMurow (Bee-Girl MultiCock Rapes)</li>";
    creditsContents += "<li> Sombrero (Additional Imp Lust Loss Scene (Dick insertion ahoy!)</li>";
    creditsContents += "<li> The Dark Master (Marble, Fetish Cultist, Fetish Zealot, Hellhound, Lumi, Some Cat Transformations, LaBova, Ceraph's Cat-Slaves, a Cum Witch Scene, Mouse Dreams, Forced Nursing:Imps&Goblins, Bee Girl Expansion)</li>";
    creditsContents += "<li> Mr. Fleshcage (Cat Transformation/Masturbation)</li>";
    creditsContents += "<li> Spy (Cat Masturbation, Forced Nursing: Minotaur, Bee, & Cultist)</li>";
    creditsContents += "<li> PostNuclearMan (Some Cat TF)</li>";
    creditsContents += "<li> MiscChaos (Forced Nursing: Slime Monster)</li>";
    creditsContents += "<li> Ourakun (Kelt the Centaur)</li>";
    creditsContents += "<li> Rika_star25 (Desert Tribe Bad End)</li>";
    creditsContents += "<li> Versesai (Additional Bee Rape)</li>";
    creditsContents += "<li> Mallowman (Additional Bee Rape)</li>";
    creditsContents += "<li> HypnoKitten (Additional Centaur x Imp Rape)</li>";
    creditsContents += "<li> Ari (Minotaur Gloryhole Scene)</li>";
    creditsContents += "<li> SpectralTime (Aunt Nancy)</li>";
    creditsContents += "<li> Foxxling (Akbal)</li>";
    creditsContents += "<li> Elfensyne (Phylla)</li>";
    creditsContents += "<li> Radar (Dominating Sand Witches, Some Phylla)</li>";
    creditsContents += "<li> Jokester (Sharkgirls, Izma, & Additional Amily Scenes)</li>";
    creditsContents += "<li> Lukadoc (Additional Izma, Ceraph Followers Corrupting Gangbang, Satyrs, Ember)</li>";
    creditsContents += "<li> IxFa (Dildo Scene, Virgin Scene for Deluxe Dildo, Naga Tail Masturbation)</li>";
    creditsContents += "<li> Bob (Additional Izma)</li>";
    creditsContents += "<li> lh84 (Various Typos and Code-Suggestions)</li>";
    creditsContents += "<li> Dextersinister (Gnoll girl in the plains)</li>";
    creditsContents += "<li> ElAcechador, Bandichar, TheParanoidOne, Xoeleox (All Things Naga)</li>";
    creditsContents += "<li> Symphonie (Dominika the Fellatrix, Ceraph RPing as Dominika, Tel'Adre Library)</li>";
    creditsContents += "<li> Soulsemmer (Ifris)</li>";
    creditsContents += "<li> WedgeSkyrocket (Zetsuko, Pure Amily Anal, Kitsunes)</li>";
    creditsContents += "<li> Zeikfried (Anemone, Male Milker Bad End, Kanga TF, Raccoon TF, Minotaur Chef Dialogues, Sheila, and More)</li>";
    creditsContents += "<li> User21 (Additional Centaur/Naga Scenes)</li>";
    creditsContents += "<li> ~M~ (Bimbo + Imp loss scene)</li>";
    creditsContents += "<li> Grype (Raping Hellhounds)</li>";
    creditsContents += "<li> B-Side (Fentendo Entertainment Center Silly-Mode Scene)</li>";
    creditsContents += "<li> Not Important (Face-fucking a defeated minotaur)</li>";
    creditsContents += "<li> Third (Cotton, Rubi, Nieve, Urta Pet-play)</li>";
    creditsContents += "<li> Gurumash (Parts of Nieve)</li>";
    creditsContents += "<li> Kinathis (A Nieve Scene, Sophie Daughter Incest, Minerva)</li>";
    creditsContents += "<li> Jibajabroar (Jasun)</li>";
    creditsContents += "<li> Merauder (Raphael)</li>";
    creditsContents += "<li> EdgeofReality (Gym fucking machine)</li>";
    creditsContents += "<li> Bronycray (Heckel the Hyena)</li>";
    creditsContents += "<li> Sablegryphon (Gnoll spear-thrower)</li>";
    creditsContents += "<li> Nonesuch (Basilisk, Sandtraps, assisted with Owca/Vapula, Whitney Farm Corruption)</li>";
    creditsContents += "<li> Anonymous Individual (Lilium, PC Birthing Driders)</li>";
    creditsContents += "<li> PKD (Owca, Vapula, Fap Arena, Isabella Tentacle Sex, Lottie Tentacle Sex)</li>";
    creditsContents += "<li> Shamblesworth (Half of Niamh, Shouldra the Ghost-Girl, Ceraph Roleplaying As Marble, Yara Sex, Shouldra Follow Expansion)</li>";
    creditsContents += "<li> Kirbu (Exgartuan Expansion, Yara Sex, Shambles's Handler, Shouldra Follow Expansion)</li>";
    creditsContents += "<li> 05095 (Shouldra Expansion, Tons of Editing)</li>";
    creditsContents += "<li> Smidgeums (Shouldra + Vala threesome)</li>";
    creditsContents += "<li> FC (Generic Shouldra talk scene)</li>";
    creditsContents += "<li> Oak (Bro + Bimbo TF, Isabella's ProBova Burps)</li>";
    creditsContents += "<li> Space (Victory Anal Sex vs Kiha)</li>";
    creditsContents += "<li> Venithil (LippleLock w/Scylla & Additional Urta Scenes)</li>";
    creditsContents += "<li> Butts McGee (Minotaur Hot-dogging PC loss, Tamani Lesbo Face-ride, Bimbo Sophie Mean/Nice Fucks)</li>";
    creditsContents += "<li> Savin (Hel the Salamander, Valeria, Spanking Drunk Urta, Tower of the Phoenix, Drider Anal Victory, Hel x Isabella 3Some, Centaur Sextoys, Thanksgiving Turkey, Uncorrupt Latexy Recruitment, Assert Path for Direct Feeding Latexy, Sanura the Sphinx)</li>";
    creditsContents += "<li> Gats (Lottie, Spirit & Soldier Xmas Event, Kiha forced masturbation, Goblin Doggystyle, Chicken Harpy Egg Vendor)</li>";
    creditsContents += "<li> Aeron the Demoness (Generic Goblin Anal, Disciplining the Eldest Minotaur)</li>";
    creditsContents += "<li> Gats, Shamblesworth, Symphonie, and Fenoxo (Corrupted Drider)</li>";
    creditsContents += "<li> Bagpuss (Female Thanksgiving Event, Harpy Scissoring, Drider Bondage Fuck)</li>";
    creditsContents += "<li> Frogapus (The Wild Hunt)</li>";
    creditsContents += "<li> Fenoxo (Everything Else)</li>";
    creditsContents += "</ul>";
    creditsContents += "<b>Oviposition Update Credits - Names in Order Appearance in Oviposition Document</b>";
    creditsContents += "<ul>";
    creditsContents += "<li> DCR (Idea, Drider Transformation, and Drider Impreg of: Goblins, Beegirls, Nagas, Harpies, and Basilisks)</li>";
    creditsContents += "<li> Fenoxo (Bee Ovipositor Transformation, Bee Oviposition of Nagas and Jojo, Drider Oviposition of Tamani)</li>";
    creditsContents += "<li> Smokescreen (Bee Oviposition of Basilisks)</li>";
    creditsContents += "<li> Radar (Oviposition of Sand Witches)</li>";
    creditsContents += "<li> OutlawVee (Bee Oviposition of Goo-Girls)</li>";
    creditsContents += "<li> Zeikfried (Editing this mess, Oviposition of Anemones)</li>";
    creditsContents += "<li> Woodrobin (Oviposition of Minotaurs)</li>";
    creditsContents += "<li> Posthuman (Oviposition of Ceraph Follower)</li>";
    creditsContents += "<li> Slywyn (Bee Oviposition of Gigantic PC Dick)</li>";
    creditsContents += "<li> Shaxarok (Drider Oviposition of Large Breasted Nipplecunts)</li>";
    creditsContents += "<li> Quiet Browser (Bee Oviposition of Urta)</li>";
    creditsContents += "<li> Bagpuss (Laying Eggs In Pure Amily)</li>";
    creditsContents += "<li> Eliria (Bee Laying Eggs in Bunny-Girls)</li>";
    creditsContents += "<li> Gardeford (Helia x Bimbo Sophie Threesomes)</li>";
    creditsContents += "</ul>";
    creditsContents += "<br>If I'm missing anyone, please contact me ASAP! I have done a terrible job keeping the credits up to date!";
    outputText(creditsContents);
    doNext(mainMenu);
}