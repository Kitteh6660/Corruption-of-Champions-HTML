Amily = [];

/*
 * Amily created by aimozg on 02.01.14.
 * Converted to JS by Matraia
 */

addToGameFlags(AMILY_MET, AMILY_MET_AS, AMILY_PC_GENDER, AMILY_OFFER_ACCEPTED, AMILY_AFFECTION, AMILY_OFFERED_DEFURRY, AMILY_FUCK_COUNTER, AMILY_NOT_FURRY, AMILY_WANG_LENGTH, AMILY_PREGNANCY_TYPE, AMILY_INCUBATION, AMILY_BUTT_PREGNANCY_TYPE, AMILY_OVIPOSITED_COUNTDOWN, AMILY_GROSSED_OUT_BY_WORMS, AMILY_FOLLOWER, AMILY_ALLOWS_FERTILITY, FOLLOWER_AT_FARM_AMILY);


/*

Changes to make:

The initial male meeting offers a rejection option because she's a furry. See amilyNoFur(). Part of the text for that option reveals the ingredients necessary to defur Amily. However, players don't see these ingredients until much later in the game. Amily is often encountered early. How is the player going to know what the ingredients are?

*/

/*******
*
* Amily Definitions and initial variables
*
********/

function Amily() {
    this.a = "";
	this.short = "Amily";
	this.imageName = "amily";
	this.long = "You are currently fighting Amily. The mouse-morph is dressed in rags and glares at you in rage, knife in hand. She keeps herself close to the ground, ensuring she can quickly close the distance between you two or run away.";
	// this.plural = false;
	this.createVagina(false, VAGINA_WETNESS_NORMAL, VAGINA_LOOSENESS_NORMAL);
	this.createStatusEffect(StatusEffects.BonusVCapacity, 48, 0, 0, 0);
	createBreastRow(Appearance.breastCupInverse("C"));
	this.ass.analLooseness = ANAL_LOOSENESS_VIRGIN;
	this.ass.analWetness = ANAL_WETNESS_DRY;
	this.tallness = 4*12;
	this.hipRating = HIP_RATING_AMPLE;
	this.buttRating = BUTT_RATING_TIGHT;
	this.skinTone = "tawny";
	this.skinType = SKIN_TYPE_FUR;
	//this.skinDesc = Appearance.Appearance.DEFAULT_SKIN_DESCS[SKIN_TYPE_FUR];
	this.hairColor = "brown";
	this.hairLength = 5;
	initStrTouSpeInte(30, 30, 85, 60);
	initLibSensCor(45, 45, 10);
	this.weaponName = "knife";
	this.weaponVerb="slash";
	this.weaponAttack = 6;
	this.armorName = "rags";
	this.armorDef = 1;
	this.bonusHP = 20;
	this.lust = 20;
	this.lustVuln = .85;
	this.level = 4;
	this.gems = 2 + rand(5);
	this.drop = NO_DROP;
	checkMonster();
}

var forced = false;
/*******
*
* Amily standard scenes in Town Ruins
*
********/






// Amily.start begins encounters in the Town Ruins
Amily.start = function () {
    // BOOKKEEPING
    menu();
    // set initial gender flag
    if (gameFlags[AMILY_MET] == 0) gameFlags[AMILY_PC_GENDER] = player.gender;
    
     // Reset worm block if worms have been eliminated from the player
    if (gameFlags[AMILY_GROSSED_OUT_BY_WORMS] == 1) {
        if (player.findStatusEffect(StatusEffects.Infested) < 0) gameFlags[AMILY_GROSSED_OUT_BY_WORMS] = 0;
    }
    
    
    // AMILY ENCOUNTER TURNED OFF
    // Check to see if we've taken Amily out of the picture. If so, put up the message from earlier. Commenting out until we can set these flags
    /*
    if (flags[kFLAGS.AMILY_IS_BATMAN] > 0 || flags[kFLAGS.AMILY_VILLAGE_ENCOUNTERS_DISABLED] == 1  || flags[kFLAGS.AMILY_TREE_FLIPOUT] > 0) {
        outputText("You enter the ruined village cautiously. There are burnt-down houses, smashed-in doorways, ripped-off roofs... everything is covered with dust and grime. You explore for an hour, but you cannot find any sign of another living being, or anything of value. The occasional footprint from an imp or a goblin turns up in the dirt, but you don't see any of the creatures themselves. It looks like time and passing demons have stripped the place bare since it was originally abandoned. Finally, you give up and leave. You feel much easier when you're outside of the village.", false);
		doNext(camp.returnToCampUseOneHour);
		return;
    }
    */
    // Amily can't be encountered due to worms
    /*
    if (flags[kFLAGS.AMILY_GROSSED_OUT_BY_WORMS] == 1 || player.cor > 25 || flags[kFLAGS.AMILY_CORRUPT_FLIPOUT] > 0) {
        outputText("You enter the ruined village cautiously. There are burnt-down houses, smashed-in doorways, ripped-off roofs... everything is covered with dust and grime. For hours you explore, but you cannot find any sign of another living being, or anything of value. The occasional footprint from an imp or a goblin turns up in the dirt, but you don't see any of the creatures themselves. It looks like time and passing demons have stripped the place bare since it was originally abandoned. Finally, you give up and leave. You feel much easier when you're outside of the village – you had the strangest sensation of being watched while you were in there.", false);
		doNext(camp.returnToCampUseOneHour);
		return;
    }
    */
    
    // ENCOUNTERING AMILY WHILE CORRUPT/CORRUPTION PATH
    // Fight between Amily and player if you are too corrupt. Requires that you've met Amily once
    /*
    if (flags[kFLAGS.AMILY_CORRUPT_FLIPOUT] == 0 && flags[kFLAGS.AMILY_MET] > 0 && (player.cor > 25 + player.corruptionTolerance() || player.cor > 75)) {
        meetAmilyAsACorruptAsshat();
		return;
    }
    */
     // Amily corruption path
    /*
    if (flags[kFLAGS.AMILY_CORRUPT_FLIPOUT] > 0 && player.cor > 25) {
	//Cook amily a snack if player doesnt have key item for it.
	   if (player.hasKeyItem("Potent Mixture") < 0 && flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00170] < 3) {
            cookAmilyASnack();
			return;
        }
		//Has snacks!
		else {
            if (flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00170] == 0) stalkingZeAmiliez();
			else if (flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00170] == 1) stalkingZeAmiliez2();
			else if (flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00170] == 2) stalkingZeAmiliez3();
			else rapeCorruptAmily4Meeting();
			return;
        }
    }
    */   
    // Message to print if Amily already is a corrupt follower and you come back
    /*
    else if (flags[kFLAGS.AMILY_FOLLOWER] == 2) {
        amilySprite();
		outputText("You enter the ruined village, still laughing at your past nefarious deeds. Maybe it's just your imagination, but you feel like this entire place reeks of corruption now... You explore for an hour, then go back to your camp, knowing your tainted slave will be more than happy to satisfy your urges.", false);
		doNext(camp.returnToCampUseOneHour);
		return;
    }
    */
    
    //If Amily is ready to give birth, do this
    /*
    if (pregnancy.isPregnant && pregnancy.incubation == 0) {
				fuckingMouseBitchPopsShitOut();
				pregnancy.knockUpForce(); //Clear Pregnancy
				return;
			}
    */
    
    
    // AMILY SPRITE      
    // If you haven't beek kicked out yet, congrats! You get a sprite
    /*
    amilySprite();
    */
    
    // BEGIN AT THE BEGINNING
    // Amily's reactions to you vary greatly on what your gender is compared to hers. As a reminder:
    // player.gender == 0 is Genderless
    // player.gender == 1 is Male
    // player.gender == 2 is Female
    // player.gender == 3 is Herm
    
    // Male Meeting
    if (player.gender == 1) {
         if (gameFlags[AMILY_MET] == 0) {
    //Set flag for what she met the player as.
        gameFlags[AMILY_MET_AS] = player.gender;
	//set 'met' to true
        gameFlags[AMILY_MET]++;
        outputText("You wind your way deep into the maze of dusty crumbling buildings and twisted saplings, looking for any sign of life – or, failing that, something that can help you in your quest.  Bending down to rummage through an old heap of rubbish, you complain aloud that this is hardly the sort of thing you expected to be doing as a champion. Suddenly, you hear a 'thwip' and something shoots past your face, embedding into the stone beside your head and trembling with the impact.<br><br>");
    
        outputText("\"<i>Don't make any sudden moves!</i>\" A voice calls out, high pitched and a little squeaky, but firm and commanding. You freeze to avoid giving your assailant a reason to shoot at you again. \"<i>Stand up and turn around, slowly,</i>\" it commands again. You do as you are told.<br><br>");
            //Jojo previously encountered NEED TO LOOK AT JOJO CODE
			/*			
            if (monk != 0) {
                outputText("The creature that has cornered you is clearly of the same race as Jojo, though notably a female member of his species. Her fur is thick with dust, but you can still easily make out its auburn color. Her limbs and midriff are wiry, hardened as much by meals that are less than frequent as by constant exercise and physical exertion. Her buttocks are non-existent, and her breasts can't be any larger than an A-cup. She wears a tattered pair of pants and an equally ragged-looking shirt. A very large and wicked-looking dagger – more of a short sword really – is strapped to her hip, and she is menacing you with a blowpipe.\n\n", false);
				}
            //[Jojo not previously encountered]
				else { */
        outputText("You have been cornered by a very strange being: a bipedal female humanoid with the unmistakable features of a giant mouse; paw-like feet, a muzzled head with long whiskers, large mouse ears, and a body covered in dust-caked auburn fur. It doesn't look like she has had a very easy life; her clothing consists of a dirty, tattered set of pants and shirt, while her limbs and midriff are wiry, hardened as much by meals that are less than frequent as by constant exercise and physical exertion. Her buttocks are non-existent, and her breasts can't be any larger than an A-cup. Still, she looks quite capable of defending herself; not only is she brandishing a blowpipe, clearly ready to spit another doubtlessly-poisoned dart at you, but she has a formidable-looking knife strapped to her hip.<br><br>");
//						}
        outputText("She looks at you for a few long moments, and then lowers her blowpipe, \"<i>I'm sorry about that, but I thought you were another demon. They destroyed this place years ago, but some of the damn scavengers still occasionally drift through. Not so much lately, of course. I've made something of an impression on them.</i>\" She grins malevolently, one hand caressing the blade of her knife in an almost sensual fashion. \"<i>My name is Amily, the last survivor of this village. All of my people are gone now; they're scattered, dead, enslaved, or worse. What about you? ");
        
        if (player.humanScore() > 4) outputText("Are you ");
				else outputText("Were you ");
        
        outputText("one of those... humans, I've heard sometimes wander into this world?</i>\"<br><br>");

        outputText("You admit that, yes, you are a human, and then ask her why she remains here in this empty wasteland of a settlement.<br><br>");

        outputText("\"<i>I was born here, I grew up here, and I would have gotten married and settled down here if it hadn't been for those demons.</i>\" She spits the word 'demons' with contempt. \"<i>After it was all over, I had nowhere else to go. So I stayed here. I've still got nowhere else to go, to be honest. I haven't found any other settlements of my own people, and I'd sooner die than give myself over to the demons. But it seems that if I'm ever going to see more of my people living free, I'm going to have to take the leading role...</i>\<br><br>");

        outputText("She stares at you intently, and you ask her what the matter is.<br><br>", false);

        outputText("\"<i>You see, that role I was talking about? I've had a long time to think about it, and there's no one else for it. If there are ever going to be more of my kind born into freedom, they're going to have to be born. Literally; I need to find a mate that is pure, one that can give me strong and pure children of my own kind,</i>\" she explains, one hand absently touching her flat belly. \"<i>The few males of my kind that I've managed to find are demon slaves – far too corrupt to make suitable mates, even if I could free them. I've heard, though, that humans are strangely weak breeders; your seed would be free of taint, and you would father more of my own kind. Unlike, say, an imp or a minotaur.</i>\"<br><br>");
            
        outputText("She tucks her blowpipe into her belt and takes several uncertain steps towards you, trying to appear winning – flirtatious even – despite her grimy appearance and clear inexperience with the matter. \"<i>Please, will you help me? You said something about being a champion – If you lay with me and help me bring more of my people into this world, free of the demons and untouched by their perverse taint, you will be striking another kind of blow against their corrupt stranglehold on Mareth.</i>\"<br><br>");

		outputText("What do you do?");
		
        gameFlags[AMILY_PC_GENDER] = player.gender;
        //Accept Eagerly / Accept Hesitantly / Reject Harshly / Refuse Gently
	   addButton(0, "Eager", acceptAmilysOfferEagerly, null, null, null, "Accept Amily's Offer Eagerly.");
       addButton(1, "Hesitant", acceptAmilysOfferHesitantly, null, null, null, "Accept Amily's Offer Hesitantly.");
       addButton(2, "Refuse", refuseAmilysOffer, null, null, null, "Your mission is more important. You can't let her distract you!");
       addButton(3, "Reject", amilyNoFur, null, null, null, "You can't imagine kissing, let alone breeding with, a mouse!");
        }
        
    else if (player.gender == 1 && gameFlags[AMILY_OFFER_ACCEPTED] == 0) {
	   outputText("Wandering into the ruined village, you set off in search of Amily.<br><br>");
						/*NOPE!
						//[Player meets the requirements to stalk Amily]
						if (player.spe > 50 && player.inte > 40) {
							outputText("Using all of your knowledge, skill and cunning, you sneak and squirm through the ruins until you finally find yourself coming up right behind the dusty mouse girl. She's picking berries off of a small bush and hasn't noticed you yet.\n\n", false);
							outputText("How do you approach her?", false);
							//Announce yourself / Scare her
							simpleChoices("Announce",remeetingAmilyAnnounceSelf,"Scare",remeetingAmilyScare,"",0,"",0,"",0);
						}
						//[Player does not meets the requirements to stalk Amily]*/
					   //else { */
        outputText("After wondering for a while how on earth you are going to track down Amily, you hear a whistle. Looking around, you see her waving cheekily at you from around a corner; it's pretty obvious that you have a long way to go before you'll be able to beat her at this kind of game.<br><br>");
		//amilyRemeetingContinued();
		//Set flag for 'last gender met as'
		gameFlags[AMILY_PC_GENDER] = player.gender;
        doNext(Camp.returnToCampUseOneHour);
        }
        
        //Desperate Plea response (Affection 50 without any sex, requires PC to be male in previous encounter)
        /*
        if (flags[kFLAGS.AMILY_AFFECTION] >= 50 && flags[kFLAGS.AMILY_FUCK_COUNTER] == 0 && flags[kFLAGS.AMILY_PC_GENDER] == 1) {
		  outputText("Wandering into the ruined village, you set off in search of Amily.\n\n", false);
          /*NOPE! (This was commented out in original COC)
          [Player meets the requirements to stalk Amily]
          if (player.spe > 50 && player.inte > 40) {
            outputText("Using all of your knowledge, skill and cunning, you sneak and squirm through the ruins until you finally find yourself coming up right behind the dusty mouse girl. She's picking berries off of a small bush and hasn't noticed you yet.\n\n", false);
			outputText("How do you approach her?", false);
			//Announce yourself / Scare her
			simpleChoices("Announce",announceSelfOnDesperatePleaMeeting,"Scare Her",scareAmilyOnDesperatePleaMeeting,"",0,"",0,"",0);
            }
            *//*
        outputText("After wondering for a while how on earth you are going to track down Amily, you hear a whistle. Looking around, you see her      waving cheekily at you from around a corner; it's pretty obvious that you have a long way to go before you'll be able to beat her at this kind of game.\n\n", false);
        outputText("\"<i>Ah... do you have the time to talk? There's something I want to get off my chest,</i>\" Amily nervously asks.\n\n", false);
        outputText("Curious what she has to say, you agree.\n\n", false);
		outputText("Amily scuffs the ground with one of her finger-like toe claws, looking down at it as if it was the most interesting thing in the world – or as if she doesn't dare to look you in the eyes. \"<i>I... You know what I've been asking of you; from you, and you keep turning me down... but you kept talking to me, asking me about myself. You wanted to get to know me, but... why don't you want to know ALL of me? I... I want to give myself to you. You're the nicest, kindest man I've met – even before the demons destroyed my village. I want to be with you... but you don't seem to want to be with me.</i>\" She looks up to you at last, her eyes wet with tears. \"<i>Is there something wrong with me? Can't you like me in that way?</i>\" she pleads.\n\n", false);
        //Accept her / Turn her down gently / Turn her down bluntly
        var fur:Function = null;
		if (flags[kFLAGS.AMILY_NOT_FURRY] == 0) fur = amilyNoFur;
		simpleChoices("Accept Her", desperateAmilyPleaAcceptHer, "RejectFurry", fur, "RejectGently", desperateAmilyPleaTurnDown, "BluntReject", desperateAmilyPleaTurnDownBlunt, "", null);
		return;
		}*/
    else {
        amilyStandardMeeting();
    }
}

    // Female Meeting
    else if (player.gender == 2) {
        //First time
		if (gameFlags[AMILY_MET] == 0) {
        //Set flag for what she met the player as.
		gameFlags[AMILY_MET_AS] = player.gender;
        //set 'met' to true
		gameFlags[AMILY_MET]++;
        outputText("You wind your way deep into the maze of dusty crumbling buildings and twisted saplings, looking for any sign of life – or, failing that, something that can help you in your quest.  Bending down to rummage through an old heap of rubbish, you complain aloud that this is hardly the sort of thing you expected to be doing as a champion. Suddenly, you hear a 'thwip' and something shoots past your face, embedding into the stone beside your head and trembling with the impact.<br><br>");

        outputText("\"<i>Don't make any sudden moves!</i>\" A voice calls out, high pitched and a little squeaky, but firm and commanding. You freeze to avoid giving your assailant a reason to shoot at you again. \"<i>Stand up and turn around, slowly,</i>\" it commands again. You do as you are told.<br><br>");
        // temp
        /*[Jojo previously encountered] NEED TO SEE JOJO CODE
        if (monk > 0) {
				outputText("The creature that has cornered you is clearly of the same race as Jojo, though notably a female member of his species. Her fur is thick with dust, but you can still easily make out its auburn color. Her limbs and midriff are wiry, hardened as much by meals that are less than frequent as by constant exercise and physical exertion. Her buttocks are non-existent, and her breasts can't be any larger than an A-cup. She wears a tattered pair of pants and an equally ragged-looking shirt. A very large and wicked-looking dagger – more of a short sword really – is strapped to her hip, and she is menacing you with a blowpipe.\n\n", false);
				}
				//[Jojo not previously encountered]
				else { */ 
        outputText("You have been cornered by a very strange being: a bipedal female humanoid with the unmistakable features of a giant mouse; paw-like feet, a muzzled head with long whiskers, large mouse ears, and a body covered in dust-caked auburn fur. It doesn't look like she has had a very easy life; her clothing consists of a dirty, tattered set of pants and shirt, while her limbs and midriff are wiry, hardened as much by meals that are less than frequent as by constant exercise and physical exertion. Her buttocks are non-existent, and her breasts can't be any larger than an A-cup. Still, she looks quite capable of defending herself; not only is she brandishing a blowpipe, clearly ready to spit another doubtlessly-poisoned dart at you, but she has a formidable-looking knife strapped to her hip.<br><br>");
                //}
		outputText("She looks at you for a few long moments, and then lowers her blowpipe, \"<i>I'm sorry about that, but I thought you were another demon. They destroyed this place years ago, but some of the damn scavengers still occasionally drift through. Not so much lately, of course. I've made something of an impression on them.</i>\" She grins malevolently, one hand caressing the blade of her knife in an almost sensual fashion. \"<i>My name is Amily, the last survivor of this village. All of my people are gone now; they're scattered, dead, enslaved, or worse. What about you? ");
        if (player.humanScore() > 4) outputText("Are you ");
		  else outputText("Were you ");
		outputText("one of those... humans, I've heard sometimes wander into this world?</i>\"<br><br>");

        outputText("You admit that, yes, you are a human, and then ask her why she remains here in this empty wasteland of a settlement.<br><br>");

        outputText("\"<i>I was born here, I grew up here, and I would have gotten married and settled down here if it hadn't been for those demons.</i>\" She spits the word 'demons' with contempt. \"<i>After it was all over, I had nowhere else to go. So I stayed here. I've still got nowhere else to go, to be honest. I haven't found any other settlements of my own people, and I'd sooner die than give myself over to the demons. But it seems that if I'm ever going to see more of my people living free, I'm going to have to take the leading role...</i>\"<br><br>");

        outputText("She shakes her head and smiles at you wistfully. \"<i>Listen to me, rambling. I'm sorry again for attacking you. But, take care out there; there's a lot of freaky monsters that will do the most unspeakable things to a woman if they can catch her.</i>\"<br><br>");

        outputText("You thank her, and she brushes it off.<br><br>");

        outputText("\"<i>Hey, us girls gotta stick together, right?</i>\" She winks at you then wanders off behind a partially collapsed wall, disappearing into the rubble.");
        //Set flag for 'last gender met as'
		gameFlags[AMILY_PC_GENDER] = player.gender;
        doNext(Camp.returnToCampUseOneHour);
		//return;
        }
        else {
           amilyMeetingFailed();
        }
/* //Lesbo lovin confession!
		if (flags[kFLAGS.AMILY_CONFESSED_LESBIAN] == 0 && flags[kFLAGS.AMILY_AFFECTION] >= 25) {
		  amilyIsTotallyALesbo();
		  return;
		}
		//Amily totally grows a wang for you once she loves you
		if (flags[kFLAGS.AMILY_CONFESSED_LESBIAN] == 2 && flags[kFLAGS.AMILY_WANG_LENGTH] == 0) {
		  amilyPostConfessionGirlRemeeting();
		  return;
		}
		//If PC shot down love confession, cap affection at 35 and re-offer?
        if (flags[kFLAGS.AMILY_AFFECTION] > 35 && flags[kFLAGS.AMILY_CONFESSED_LESBIAN] == 1) {
		  flags[kFLAGS.AMILY_AFFECTION] = 35;
		  amilyIsTotallyALesbo();
		  return;
		}
	*/	
}

		
    // Herm meeting.
    else if (player.gender == 3) {
		//First time. Amily will meet you once and reject you until you change gender.
		if (gameFlags[AMILY_MET] == 0) {
            //Set flag for what she met the player as.
			gameFlags[AMILY_MET_AS] = player.gender;
            //set 'met' to true
			gameFlags[AMILY_MET]++;
            outputText("You wind your way deep into the maze of dusty crumbling buildings and twisted saplings, looking for any sign of life – or, failing that, something that can help you in your quest.  Bending down to rummage through an old heap of rubbish, you complain aloud that this is hardly the sort of thing you expected to be doing as a champion. Suddenly, you hear a 'thwip' and something shoots past your face, embedding into the stone beside your head and trembling with the impact.<br><br>");

            outputText("\"<i>Don't make any sudden moves!</i>\" A voice calls out, high pitched and a little squeaky, but firm and commanding. You freeze to avoid giving your assailant a reason to shoot at you again. \"<i>Stand up and turn around, slowly,</i>\" it commands again. You do as you are told.<br><br>");
            /* [Jojo previously encountered] NEED TO EXAMINE JOJO CODE
            if (monk > 0) {
			     outputText("The creature that has cornered you is clearly of the same race as Jojo, though notably a female member of his species. Her fur is thick with dust, but you can still easily make out its auburn color. Her limbs and midriff are wiry, hardened as much by meals that are less than frequent as by constant exercise and physical exertion. Her buttocks are non-existent, and her breasts can't be any larger than an A-cup. She wears a tattered pair of pants and an equally ragged-looking shirt. A very large and wicked-looking dagger – more of a short sword really – is strapped to her hip, and she is menacing you with a blowpipe.\n\n", false);
						}
						//[Jojo not previously encountered]
						else { */
            outputText("You have been cornered by a very strange being: a bipedal female humanoid with the unmistakable features of a giant mouse; paw-like feet, a muzzled head with long whiskers, large mouse ears, and a body covered in dust-caked auburn fur. It doesn't look like she has had a very easy life; her clothing consists of a dirty, tattered set of pants and shirt, while her limbs and midriff are wiry, hardened as much by meals that are less than frequent as by constant exercise and physical exertion. Her buttocks are non-existent, and her breasts can't be any larger than an A-cup. Still, she looks quite capable of defending herself; not only is she brandishing a blowpipe, clearly ready to spit another doubtlessly-poisoned dart at you, but she has a formidable-looking knife strapped to her hip.<br><br>");
						//}
            outputText("She looks at you for a few long moments, and then lowers her blowpipe, \"<i>I'm sorry about that, but I thought you were another demon. They destroyed this place years ago, but some of the damn scavengers still occasionally drift through. Not so much lately, of course. I've made something of an impression on them.</i>\" She grins malevolently, one hand caressing the blade of her knife in an almost sensual fashion. \"<i>My name is Amily, the last survivor of this village. All of my people are gone now; they're scattered, dead, enslaved, or worse. What about you? ");
            if (player.humanScore() > 4) outputText("Are you ");
			     else outputText("Were you ");
            outputText("one of those... humans, I've heard sometimes wander into this world?</i>\"<br><br>");

            outputText("You admit that, yes, you are a human, and then ask her why she remains here in this empty wasteland of a settlement.<br><br>");

            outputText("\"<i>I was born here, I grew up here, and I would have gotten married and settled down here if it hadn't been for those demons.</i>\" She spits the word 'demons' with contempt. \"<i>After it was all over, I had nowhere else to go. So I stayed here. I've still got nowhere else to go, to be honest. I haven't found any other settlements of my own people, and I'd sooner die than give myself over to the demons. But it seems that if I'm ever going to see more of my people living free, I'm going to have to take the leading role...</i>\"<br><br>");

            outputText("She looks thoughtful. \"<i>You know...</i>\" She begins, but stops and ");
            //[If breasts are flat, manly breasts]
			if (player.biggestTitSize() < 1) outputText("sniffs the air intensely, her whiskers quivering. ");
			//[If breasts are A-cup or bigger]
            else outputText("stares at the bulge in your top, as well as the bulge in your bottom.  ");
            outputText("\"<i>Never mind,</i>\" she says after a moment. \"<i>You're a hermaphrodite, aren't you? Forget I mentioned it.</i>\"<br><br>");

            outputText("She turns and walks away, vanishing into the dust and the rubble like magic.");
            //Set flag for 'last gender met as'
			gameFlags[AMILY_PC_GENDER] = player.gender;
            doNext(Camp.returnToCampUseOneHour);
			}
        else {
            amilyMeetingFailed();
        }
            /* Additional Herm Scenes
            //Medium affection 33% chance, guaranteed by 20.
			//Requires she hasn't yet given this scene!
			if (((flags[kFLAGS.AMILY_AFFECTION] >= 15 && rand(3) == 0) || flags[kFLAGS.AMILY_AFFECTION] >= 20) && flags[kFLAGS.AMILY_HERM_QUEST] == 0) {
			     whyNotHerms();
				return;
				}
            if (flags[kFLAGS.AMILY_HERM_QUEST] == 1) {
                maybeHermsAintAllBadBITCH();
				return;
				    }*/
  
    
    }
        
    // Genderless meeting
    else if (player.gender == 0) {
        //[First Meeting]
		if (gameFlags[AMILY_MET] == 0) {
            gameFlags[AMILY_MET_AS] = player.gender;
            //set 'met' to true
            gameFlags[AMILY_MET]++;
            outputText("You wind your way deep into the maze of dusty crumbling buildings and twisted saplings, looking for any sign of life – or, failing that, something that can help you in your quest.  Bending down to rummage through an old heap of rubbish, you complain aloud that this is hardly the sort of thing you expected to be doing as a champion. Suddenly, you hear a 'thwip' and something shoots past your face, embedding into the stone beside your head and trembling with the impact.<br><br>");

            outputText("\"<i>Don't make any sudden moves!</i>\" A voice calls out, high pitched and a little squeaky, but firm and commanding. You freeze to avoid giving your assailant a reason to shoot at you again. \"<i>Stand up and turn around, slowly,</i>\" it commands again. You do as you are told.<br><br>");
            /*
						//[Jojo previously encountered]
						if (monk > 0) {
							outputText("The creature that has cornered you is clearly of the same race as Jojo, though notably a female member of his species. Her fur is thick with dust, but you can still easily make out its auburn color. Her limbs and midriff are wiry, hardened as much by meals that are less than frequent as by constant exercise and physical exertion. Her buttocks are non-existent, and her breasts can't be any larger than an A-cup. She wears a tattered pair of pants and an equally ragged-looking shirt. A very large and wicked-looking dagger – more of a short sword really – is strapped to her hip, and she is menacing you with a blowpipe.\n\n", false);
						}
						//[Jojo not previously encountered]
						else { */
            outputText("You have been cornered by a very strange being: a bipedal female humanoid with the unmistakable features of a giant mouse; paw-like feet, a muzzled head with long whiskers, large mouse ears, and a body covered in dust-caked auburn fur. It doesn't look like she has had a very easy life; her clothing consists of a dirty, tattered set of pants and shirt, while her limbs and midriff are wiry, hardened as much by meals that are less than frequent as by constant exercise and physical exertion. Her buttocks are non-existent, and her breasts can't be any larger than an A-cup. Still, she looks quite capable of defending herself; not only is she brandishing a blowpipe, clearly ready to spit another doubtlessly-poisoned dart at you, but she has a formidable-looking knife strapped to her hip.<br><br>");
                    //}
            outputText("She looks at you for a few long moments, and then lowers her blowpipe, \"<i>I'm sorry about that, but I thought you were another demon. They destroyed this place years ago, but some of the damn scavengers still occasionally drift through. Not so much lately, of course. I've made something of an impression on them.</i>\" She grins malevolently, one hand caressing the blade of her knife in an almost sensual fashion. \"<i>My name is Amily, the last survivor of this village. All of my people are gone now; they're scattered, dead, enslaved, or worse. What about you? ");
            if (player.humanScore() > 4) outputText("Are you ", false);
			     else outputText("Were you ", false);
			outputText("one of those... humans, I've heard sometimes wander into this world?</i>\"<br><br>");

            outputText("You admit that, yes, you are a human, and then ask her why she remains here in this empty wasteland of a settlement.<br><br>");

            outputText("\"<i>I was born here, I grew up here, and I would have gotten married and settled down here if it hadn't been for those demons.</i>\" She spits the word 'demons' with contempt. \"<i>After it was all over, I had nowhere else to go. So I stayed here. I've still got nowhere else to go, to be honest. I haven't found any other settlements of my own people, and I'd sooner die than give myself over to the demons. But it seems that if I'm ever going to see more of my people living free, I'm going to have to take the leading role...</i>\"<br><br>");

            //(If breasts < A-Cup)
			if (player.biggestTitSize() < 1) {
			    outputText("She stares at you intently, and you ask her what the matter is.<br><br>");

                outputText("\"<i>You see, that role I was talking about? I've had a long time to think about it, and there's no one else for it. If there are ever going to be more of my kind born into freedom, they're going to have to be born. Literally; I need to find a mate that is pure, one that can give me strong and pure children of my own kind,</i>\" she explains, one hand absently touching her flat belly. \"<i>The few males of my kind that I've managed to find are demon slaves – far too corrupt to make suitable mates, even if I could free them. I've heard, though, that humans are strangely weak breeders; your seed would be free of taint, and you would father more of my own kind. Unlike, say, an imp or a minotaur.</i>\"<br><br>");

                outputText("She tucks her blowpipe into her belt and takes several uncertain steps towards you, trying to appear winning – flirtatious even – despite her grimy appearance and clear inexperience with the matter. \"<i>Please, will you help me? You said something about being a champion – if you lay with me and help me bring more of my people into this world, free of the demons and untouched by their perverse taint, you will be striking another kind of blow against their corrupt stranglehold on Mareth.</i>\"<br><br>");

				outputText("Sheepishly, you look down at the ground and confess that as much as you might like to help, that's actually impossible.<br><br>");

				outputText("Amily looks hurt. \"<i>Why?</i>\" she demands desperately.<br><br>");

				outputText("Highly embarrassed but unable to think of a way to articulate it, you drop your pants and let her see the flat and featureless expanse of flesh that is your crotch.<br><br>");

				outputText("Amily's eyes bug out, her jaw falls slack and she stares at you, clearly gobsmacked. Then she spits a stream of incoherent, dumbfounded profanities. Finally, she shakes her head. \"<i>Well... that's a new one. I guess... it makes sense. Damn, just when you thought you'd seen it all. I suppose I should go now,</i>\" she tells you and turns to leave.<br><br>");

				outputText("She stops, however, just before rounding a wall. \"<i>There's this stuff you'll find in bottles called Incubus Draft. If you drink that, it'll make you a boy - but I'd find an alchemist first, so he can remove the corruption from it.</i>\"<br><br>");

				outputText("She continues walking away. After she has vanished, though, another musing drifts back to you. \"<i>There's also this stuff called Succubus Milk you can do the same thing with, if you want to be a girl.</i>\"<br><br>");
               	}
			//(If breasts > A-Cup)
            else {
				outputText("She shakes her head and smiles at you wistfully. \"<i>Listen to me, rambling. I'm sorry again for attacking you. But, take care out there; there's a lot of freaky monsters that will do the most unspeakable things to a woman if they can catch her.</i>\"<br><br>");

				outputText("Blushing, you explain to her that you aren't actually a woman. She looks very puzzled at this.<br><br>");

				outputText("\"<i>But you have boobs... and I don't see a crotch-bulge,</i>\" she says, sounding almost petulant. \"<i>I don't smell a vagina, either... Wait, are you telling me you don't have either pair of genitals?</i>\" she asks, clearly dumbfounded.<br><br>");

				outputText("Embarrassed, you admit that is so.<br><br>");

				outputText("Amily stares at you, clearly at a loss for words, and then shakes her head in disbelief. She tries to give you a smile. \"<i>Well... us girls gotta stick together, right? If you look for a bottle of Succubus Milk – Imps seem to carry it on occasion, though I don't know why – then you can drink it to get your vagina back. Also, I'd find an alchemist first, so he can remove the corruption from it.</i>\"<br><br>");

				outputText("Having evidently regained her confidence, she winks and then vanishes behind a tumbled-down wall, leaving you alone.");
						
                }
            //Set flag for 'last gender met as'
			gameFlags[AMILY_PC_GENDER] = player.gender;
			doNext(Camp.returnToCampUseOneHour);
			//return;
			}
        else {
            amilyMeetingFailed();
        }
}

    // Remeeting Amily after first encounters and no specialty encounters for gender [Normal Remeeting]
    // Amily does NOT like seeing the player change gender
    /*
    if (flags[kFLAGS.AMILY_PC_GENDER] != player.gender) {
	//Stripped this out since it was making her flip out weirdly at genderless folks
	//|| (player.gender == 0 && flags[kFLAGS.AMILY_AFFECTION] < 15)) {
	amilyNewGenderConfrontation();
	}
    */
    
    // This should only display after the first meeting. Need to check this!
/*
    outputText("Curious on how Amily is holding up, you head back into the ruined village. This time you don't bother trying to hide your presence, hoping to attract Amily's attention quicker. After all, she did say that the place is basically empty of anyone except her, and you can otherwise handle a measly Imp or Goblin.<br><br>");

   //      }
    // Commenting out pregnancy switch until pregnancy event is coded.
    /*
    switch (pregnancy.event) {
				case 1:
				case 2:
				case 3:
				case 4:
				case 5: //Amily is slightly pregnant
						outputText("Amily materializes out of the ruins somewhat slower than usual. You can see that your efforts together have taken; an undeniable bulge pokes out of her midriff, pushing up her tattered shirt slightly and seriously straining her belt. She idly rubs it with one hand, as if confirming its presence to herself.\n\n", false);
						//[Low Affection]
						if (flags[kFLAGS.AMILY_AFFECTION] < 15 || player.gender == 0) outputText("\"<i>Well, I guess despite whatever other faults you may have, you can get the job done.</i>\" She says, not looking directly at you.\n\n", false);
						//[Medium Affection]
						else if (flags[kFLAGS.AMILY_AFFECTION] < 40) outputText("\"<i>Thank you. With your help, my people will soon live again.</i>\" She strokes her belly, grinning happily. \"<i>Is there something you want to talk about?</i>\"\n\n", false);
						//[High Affection]
						else outputText("\"<i>Thank you, thank you! I couldn't have done this without you!</i>\" She exclaims. \"<i>You've done a wonderful, noble thing, and I'm glad I found you to be their father. So, not that it isn't great to see you again, but why did you come to visit?</i>\"\n\n", false);
						break;
				case 6:
				case 7:
				case 8: //Amily is heavily pregnant
						outputText("It takes several minutes before Amily appears, but when you see her, you marvel at how she got to you as quickly as she did. Her stomach is hugely swollen; one of her hands actually cradles underneath its rounded expanse, as if trying to hold it up. She is pants-less, evidently no longer able to fit into them. Her shirt drapes loosely, barely managing to cover the upper half of her firm orb of a belly. The belt where she hangs her blowpipe and dagger has been tied around her upper chest like a sash – between her breasts and her bulge – so she can still carry her weapons effectively.\n\n", false);
						//[Low Affection]
						if (flags[kFLAGS.AMILY_AFFECTION] < 15 || player.gender == 0) outputText("She seems to be paying more attention to her gravid midriff than to you, and it's several long moments before she finally speaks. \"<i>These children will be born soon. I guess I owe you my thanks for being willing to father them.</i>\"\n\n", false);
						//[Medium Affection]
						else if (flags[kFLAGS.AMILY_AFFECTION] < 40) outputText("She groans softly. \"<i>This isn't an easy task, you know. But I still want to thank you. Maybe, when these ones are born, you'll be willing to help me make some more?</i>\" She asks, her tail gently waving behind her.\n\n", false);
						//[High Affection]
						else outputText("\"<i>I should have known you were coming; they always start kicking up a storm when you're here – did you know that?</i>\" She smiles beatifically. \"<i>They know their daddy already, they do. With your help, a new generation of my people will have a chance to grow up free from the taint of demons. Was there something on your mind?</i>\"\n\n", false);
						break;
				default: //Amily is not pregnant
					outputText("It doesn't take long for Amily to materialize out of the ruins. Her blowpipe and dagger are both thrust into her belt, and she's still wearing the same tattered clothes as before.\n\n", false);
				*/
    /* // Does Amily treat you cooly? Check for low affection or genderless character...
     if (gameFlags[AMILY_AFFECTION] < 15 || player.gender == 0) {
         // Low affection meeting as a female and you were a female last time means she treats you somewhat nice...
         if (flags[AMILY_MET_AS] == 2 && player.gender == 2) outputText("She crosses her arms and smiles at you. \"<i>So you came back huh?  Did you want to chat with little old me?</i>\" she asks.<br><br>");
         // Otherwise she doesn't trust you.
         else outputText("She crosses her arms and taps her fingers on her shoulder. \"<i>So, why are you here? What do you want?</i>\" she asks.<br><br>");
        }
    // Emily is starting you like you, regardless of gender... AMILY AFFECTION 15-39
    else if (gameFlags[AMILY_AFFECTION] < 40) {
        outputText("She smiles softly upon seeing you. \"<i>It's always good to see somebody else who hasn't given in to corruption. Did you have something on your mind?</i>\"<br><br>");
        }
    // Amily is starting to REALLY like you... AMILY AFFECTION 40+
    else {
        outputText("She grins at you with open delight. \"<i>Hey there, " + player.short + "! It's great to see you again... ");
        // If player is male...
        if (player.hasCock()) {
			outputText("Have you come to knock me up?");
            if (gameFlags[AMILY_WANG_LENGTH] > 0 && player.pregnancyIncubation == 0) outputText(" Or have you come to get knocked up?");
        }
		else if (player.hasVagina()) {
            if (gameFlags[AMILY_WANG_LENGTH] > 0 && player.pregnancyIncubation == 0) outputText("Have you come back so I could stuff another bun in your oven?");
            else outputText("Did you come back for a little 'quality time' with me?");
        }
        outputText("</i>\" she teases, but her body language ");
        if (gameFlags[AMILY_WANG_LENGTH] > 0) {
            outputText("and the erection tenting her pants ");
            // Player gets hot for the mouse cock every time!
            player.modStats("lus", 5);
            }
        outputText("suggests that it's no joking matter.<br><br>");
    }
	// Special code to unlock making Amily a herm.
    /*
    if (player.hasItem(consumables.P_DRAFT) && flags[kFLAGS.AMILY_WANG_LENGTH] == 0 && flags[kFLAGS.AMILY_HERM_QUEST] == 2 && flags[kFLAGS.AMILY_AFFECTION] >= 40 && player.gender == 3) {
				efficiency = makeAmilyAHerm;
				outputText("You could probably bring up the efficiency of having two hermaphrodite mothers, particularly since you have this purified incubi draft handy.\n\n", false);
			}
    
    //Sex / Talk / Talk then sex
	//var efficiency = null;
    
	//Amily is not a herm but is ok with herm-daddying!
	*/
    //var sex = determineAmilySexEvent(); // This decides the type of sex you'll have with EMily
	//Update gender tracking flag for Amily
    //gameFlags[AMILY_PC_GENDER] = player.gender;
    //addButton(0, "Eager", acceptAmilysOfferEagerly, null, null, null, "Accept Amily's Offer Eagerly.");
    //addButton(1, "Hesitant", acceptAmilysOfferHesitantly, null, null, null, "Accept Amily's Offer Hesitantly.");
    //addButton(2, "Refuse", refuseAmilysOffer, null, null, null, "Your mission is more important. You can't let her distract you!");
    //addButton(3, "Reject", amilyNoFur, null, null, null, "You can't imagine kissing, let alone breeding with, a mouse!");
    //simpleChoices("Sex", sex, "Talk", talkToAmily, "Both", (sex == null ? null : talkThenSexWithAmily), "Efficiency", efficiency, "Leave", amp.returnToCampUseOneHour);
	//doNext(Camp.doCamp);	

    
    
    //Reach this, show default explore message and return to camp.
    else {
        amilyMeetingFailed();
    }

};

// Standard meeting loop after first time
function amilyStandardMeeting() {
   outputText("Curious on how Amily is holding up, you head back into the ruined village. This time you don't bother trying to hide your presence, hoping to attract Amily's attention quicker. After all, she did say that the place is basically empty of anyone except her, and you can otherwise handle a measly Imp or Goblin.<br><br>");
    // Commenting out pregnancy switch until pregnancy event is coded.
    /*
    switch (pregnancy.event) {
				case 1:
				case 2:
				case 3:
				case 4:
				case 5: //Amily is slightly pregnant
						outputText("Amily materializes out of the ruins somewhat slower than usual. You can see that your efforts together have taken; an undeniable bulge pokes out of her midriff, pushing up her tattered shirt slightly and seriously straining her belt. She idly rubs it with one hand, as if confirming its presence to herself.\n\n", false);
						//[Low Affection]
						if (flags[kFLAGS.AMILY_AFFECTION] < 15 || player.gender == 0) outputText("\"<i>Well, I guess despite whatever other faults you may have, you can get the job done.</i>\" She says, not looking directly at you.\n\n", false);
						//[Medium Affection]
						else if (flags[kFLAGS.AMILY_AFFECTION] < 40) outputText("\"<i>Thank you. With your help, my people will soon live again.</i>\" She strokes her belly, grinning happily. \"<i>Is there something you want to talk about?</i>\"\n\n", false);
						//[High Affection]
						else outputText("\"<i>Thank you, thank you! I couldn't have done this without you!</i>\" She exclaims. \"<i>You've done a wonderful, noble thing, and I'm glad I found you to be their father. So, not that it isn't great to see you again, but why did you come to visit?</i>\"\n\n", false);
						break;
				case 6:
				case 7:
				case 8: //Amily is heavily pregnant
						outputText("It takes several minutes before Amily appears, but when you see her, you marvel at how she got to you as quickly as she did. Her stomach is hugely swollen; one of her hands actually cradles underneath its rounded expanse, as if trying to hold it up. She is pants-less, evidently no longer able to fit into them. Her shirt drapes loosely, barely managing to cover the upper half of her firm orb of a belly. The belt where she hangs her blowpipe and dagger has been tied around her upper chest like a sash – between her breasts and her bulge – so she can still carry her weapons effectively.\n\n", false);
						//[Low Affection]
						if (flags[kFLAGS.AMILY_AFFECTION] < 15 || player.gender == 0) outputText("She seems to be paying more attention to her gravid midriff than to you, and it's several long moments before she finally speaks. \"<i>These children will be born soon. I guess I owe you my thanks for being willing to father them.</i>\"\n\n", false);
						//[Medium Affection]
						else if (flags[kFLAGS.AMILY_AFFECTION] < 40) outputText("She groans softly. \"<i>This isn't an easy task, you know. But I still want to thank you. Maybe, when these ones are born, you'll be willing to help me make some more?</i>\" She asks, her tail gently waving behind her.\n\n", false);
						//[High Affection]
						else outputText("\"<i>I should have known you were coming; they always start kicking up a storm when you're here – did you know that?</i>\" She smiles beatifically. \"<i>They know their daddy already, they do. With your help, a new generation of my people will have a chance to grow up free from the taint of demons. Was there something on your mind?</i>\"\n\n", false);
						break;
				default: //Amily is not pregnant
					outputText("It doesn't take long for Amily to materialize out of the ruins. Her blowpipe and dagger are both thrust into her belt, and she's still wearing the same tattered clothes as before.\n\n", false);
				*/
    // Does Amily treat you cooly? Check for low affection or genderless character...
    if (gameFlags[AMILY_AFFECTION] < 15 || player.gender == 0) {
        // Low affection meeting as a female and you were a female last time means she treats you somewhat nice...
        if (gameFlags[AMILY_MET_AS] == 2 && player.gender == 2) outputText("She crosses her arms and smiles at you. \"<i>So you came back huh?  Did you want to chat with little old me?</i>\" she asks.<br><br>");
         // Otherwise she doesn't trust you.
         else outputText("She crosses her arms and taps her fingers on her shoulder. \"<i>So, why are you here? What do you want?</i>\" she asks.<br><br>");
        }
    // Emily is starting you like you, regardless of gender... AMILY AFFECTION 15-39
    else if (gameFlags[AMILY_AFFECTION] < 40) {
        outputText("She smiles softly upon seeing you. \"<i>It's always good to see somebody else who hasn't given in to corruption. Did you have something on your mind?</i>\"<br><br>");
        }
    // Amily is starting to REALLY like you... AMILY AFFECTION 40+
    // DEBUGGING: player.short returns Undefined. Need to figure out why!
    
    else {
        outputText("She grins at you with open delight. \"<i>Hey there, " + player.short + "! It's great to see you again... ");
        // If player is male...
        if (player.hasCock()) {
			outputText("Have you come to knock me up?");
            if (gameFlags[AMILY_WANG_LENGTH] > 0 && player.pregnancyIncubation == 0) outputText(" Or have you come to get knocked up?");
        }
		else if (player.hasVagina()) {
            if (gameFlags[AMILY_WANG_LENGTH] > 0 && player.pregnancyIncubation == 0) outputText("Have you come back so I could stuff another bun in your oven?");
            else outputText("Did you come back for a little 'quality time' with me?");
        }
        outputText("</i>\" she teases, but her body language ");
        if (gameFlags[AMILY_WANG_LENGTH] > 0) {
            outputText("and the erection tenting her pants ");
            // Player gets hot for the mouse cock every time!
            player.modStats("lus", 5);
            }
        outputText("suggests that it's no joking matter.<br><br>");
    }
    
	// Special code to unlock making Amily a herm.
    /*
    if (player.hasItem(consumables.P_DRAFT) && flags[kFLAGS.AMILY_WANG_LENGTH] == 0 && flags[kFLAGS.AMILY_HERM_QUEST] == 2 && flags[kFLAGS.AMILY_AFFECTION] >= 40 && player.gender == 3) {
				efficiency = makeAmilyAHerm;
				outputText("You could probably bring up the efficiency of having two hermaphrodite mothers, particularly since you have this purified incubi draft handy.\n\n", false);
			}
    
    //Sex / Talk / Talk then sex
	//var efficiency = null;
    
	//Amily is not a herm but is ok with herm-daddying!
	*/
    // var sex = determineAmilySexEvent(); // This decides the type of sex you'll have with EMily
	//Update gender tracking flag for Amily
    gameFlags[AMILY_PC_GENDER] = player.gender;
    if (forced || player.lust > 35) {
        addButton(0, "Sex", determineAmilySexEvent, null, null, null, "You wanted me to knock you up. Let's do this.");    
    }
    addButton(4, "Leave", Camp.returnToCampUseOneHour);
    
    
   
    
    //addButton(1, "Talk", amilyTalk, null, null, null, "Actually, I just came for conversation...");
    //addButton(2, "Both", refuseAmilysOffer, null, null, null, "Your mission is more important. You can't let her distract you!");
    //addButton(3, "Reject", amilyNoFur, null, null, null, "You can't imagine kissing, let alone breeding with, a mouse!");
    //simpleChoices("Sex", sex, "Talk", talkToAmily, "Both", (sex == null ? null : talkThenSexWithAmily), "Efficiency", efficiency, "Leave", amp.returnToCampUseOneHour);
	//doNext(Camp.doCamp);	
    //doNext(Camp.doCamp);
}



// Failsafe function to return player to camp.
function amilyMeetingFailed() {
    outputText("You enter the ruined village cautiously. There are burnt-down houses, smashed-in doorways, ripped-off roofs... everything is covered with dust and grime. You explore for an hour, but you cannot find any sign of another living being, or anything of value. The occasional footprint from an imp or a goblin turns up in the dirt, but you don't see any of the creatures themselves. It looks like time and passing demons have stripped the place bare since it was originally abandoned. Finally, you give up and leave. You feel much easier when you're outside of the village – you had the strangest sensation of being watched while you were in there.");
    doNext(Camp.returnToCampUseOneHour);
};
    


// Male PC accepts Amily's offer eagerly. (Consider changing this response to Lusty. It's a bit beyond eager...)
function acceptAmilysOfferEagerly() {
    clearOutput();
    menu();
    //amilySprite();
	outputText("You grin lecherously, unable to help it. It's rare when someone in this world wants to fuck and actually asks you, rather than just trying to beat you senseless and then rape you. You tell Amily that if she wants you to fuck her, you'll be happy to do so.<br><br>");

    outputText("The mouse-woman looks appalled. \"<i>Must you be so vulgar?</i>\" she complains.<br><br>");

    outputText("You tell her that this is precisely what she's asking you to do, and you'll be happy to do so if that is what she wants.<br><br>");

    outputText("She still looks disgruntled. \"<i>Very well, come on. I suppose it was too much to hope that you would be roaming this world and yet still have some decorum when it comes to sex...</i>\" She begins leading the way and you follow. She doesn't have much of a butt to stare at, but you can already think of some interesting things to do with that tail of hers...<br><br>");

    outputText("Your brash enthusiasm has made Amily uncomfortable, and your quick surrender to baser impulses has made you slightly more lustful.");
    //Offer accepted
	gameFlags[AMILY_OFFER_ACCEPTED] = 1;
	//-5 Amily Affection for your rudeness
	gameFlags[AMILY_AFFECTION] -= 5;
	//+5 Libido
	player.modStats("lib", 5);
    //[/ Go to [First Time Sex]]
	doNext(amilySexHappens);
   
};


// Male PC accepts Amily's offer hesitantly.
function acceptAmilysOfferHesitantly() {
    clearOutput();
    menu();
	//amilySprite();
	outputText("The offer is shocking... and yet, strangely enticing. You cannot help but think that it's nice to meet somebody who, even if they are more sexually explicit than in your village, actually approaches the matter with some decorum. You are still surprised and even embarrassed by the invitation, but you can't help but think it might be worthwhile to accept. It's for a good cause, and she's clearly not entirely comfortable with it herself. Maybe you've been too long in this world of beast-people and monsters, but she actually is kind of cute.<br><br>");

	outputText("Softly, you ask if she really does want you to mate with her, to father her offspring.<br><br>");

	outputText("\"<i>Yes. You're the best hope I have... the only hope I have.</i>\" She replies, sadly.<br><br>");

	outputText("You bow your head and tell her that if she really does need your help, you will help her – even if it does mean doing things with her that she doesn't want.<br><br>");

	outputText("She blinks at you, clearly surprised. \"<i>I've never met a male who actually cared if a female wanted sex or not...</i>\" She then smiles gently. \"<i>It's nice to meet somebody who can still care about people as something other than fuck toys. Please, come with me.</i>\"<br><br>");

	outputText("She eagerly leads you down a path, her tail swishing back and forth energetically. She seems very happy by your acceptance.<br><br>");

	outputText("It seems you've made Amily happy by asking if this is what she wants.");
			//Offer accepted
	gameFlags[AMILY_OFFER_ACCEPTED] = 1;
			//{+5 Affection}
	gameFlags[AMILY_AFFECTION] += 5;
	//[/ Go to [First Time Sex]]
	doNext(amilySexHappens);
    
};


// Refuse Amily's Offer. Impress her!
function refuseAmilysOffer() {
    clearOutput();
    menu();
	//amilySprite();
	outputText("You shake your head in refusal.<br><br>");

	outputText("Amily stares at you in disbelief. \"<i>No? What do you mean, no? I'm honestly offering to have sex with you here.</i>\"<br><br>");

	outputText("You tell her that you can't simply have sex with some stranger who you have never met before, especially when that stranger admits it would just be a casual, unfeeling, emotionally hollow act. You dread the idea of simply whoring yourself out, even for an evidently noble cause as this - it's just not right. You came to this world to try and fight the hedonism and lechery that the demons represent, not to support it or, worse, give in to it yourself.<br><br>");

	outputText("Amily is wide-eyed when you finish. \"<i>I have... I haven't heard anybody say things like that, think like that, in a long time.</i>\" She smiles, faintly, then fiercely shakes her head. \"<i>I really do need your help... but I can only respect your conviction. I do hope that we can come to terms later, though.</i>\"<br><br>");

	outputText("She gives you a bow and then leaves, giving you the chance to turn around and leave this ruined village yourself.<br><br>");

	outputText("You have impressed Amily considerably, and reigning in your sexual impulses has helped to calm your libido.<br><br>");
	// +10 Affection. Behold the power of NoFap!
	gameFlags[AMILY_AFFECTION] += 10;
	// -5 Libido for avoiding obvious offer.
	player.modStats("lib", -5);
    doNext(Camp.returnToCampUseOneHour);
};

// Refuse Amily because she's a mouse and mice are gross.
function amilyNoFur() {
    clearOutput();
    menu();
    //amilySprite();
	gameFlags[AMILY_OFFERED_DEFURRY] = 1;
	outputText("You shake your head gently and explain that your position has not changed. Amily looks annoyed, but respects your decision.  You interrupt her next thought with a clarification; you don't want to have sex with her because of her appearance.  \"<i>...What do you mean?</i>\" she asks, one of her hands idly moving up and tugging one of her mousey ears.  As gently as you can, you explain that mice (and rats, for that matter) are considered pests in your home world, and you can't find yourself inclined to mate with a walking version of them.<br><br>");
	
    outputText("There's a long pause while Amily digests your implication.  \"<i>You want me to... change?</i>\" she asks quietly.  \"<i>Would that... make you want to mate with me?</i>\"  You can't make any promises, but it would definitely change your considerations, you explain.<br><br>");
    
    outputText("After another long silence, she sighs.  \"<i>I don't know.  What would my family say if I just... went and made myself a completely different person, all for the sake of a human?</i>\"  You slowly move to her and lay a hand on her shoulder, forcing her to look once more into your eyes.  It's not the fact that she won't be a mouse, you insist.  It's the fact that she's moving on for the sake of her race.  She manages a little smile at that, her expression brightening just a bit.  \"<i>I'll think about it,</i>\" she finally decides.  \"<i>If you can find some non-demonic reagents, perhaps we can give it a try.  If anything bad happens, though,</i>\" she warns, wagging a finger at you threateningly.  She backs off and stands awkwardly for a second.<br><br>");

    outputText("\"<i>Well, uh... bye,</i>\" Amily concludes, whirling around and walking away.  You can't be sure, but it seems like she's exaggerating the sway of her hips a bit.  You don't think much of it, heading back toward camp and beginning to formulate a concoction to de-mouse your potential breeding partner.  Perhaps... a <b>golden seed</b> for a human face, a <b>black egg</b> to get rid of the fur, and some <b>purified succubus milk</b> to round things off.  You make a mental note to remember those ingredients, for they won't show up again and you'd feel positively silly if you somehow completely forgot them.<br><br>");
    doNext(Camp.returnToCampUseOneHour);
};


/*******
*
* Sex Scenes Start
*
********/

// Basic sex scenes with Amily See determineAmilySexEvent()
function amilySexHappens() {
    clearOutput();
	//amilySprite();
	//var x = player.cockThatFits(61);
	//If too big
	//if (x == -1 && player.hasCock()) {
     //   outputText("Amily looks between your legs and doubles over laughing, \"<i>There is no way that thing is fitting inside of me!  You need to find a way to shrink that thing down before we get in bed!</i>\"");
        // Incredulous cock makes Amily less affectionate!
     //   gameFlags[AMILY_AFFECTION]--;
    //    doNext(Camp.returnToCampUseOneHour);
	//	}
    // Sex for the First time
    //else 
    if (gameFlags[AMILY_FUCK_COUNTER] == 0) {
        gameFlags[AMILY_FUCK_COUNTER]++;
        amilySexFirstTime();		
    }
    else {
        amilyPreggoChance();
        outputText("Here would be the sex scenes.");
        doNext(Camp.doCamp);
    }
    
    /*
    //Low Affection Sex:
    if (flags[kFLAGS.AMILY_AFFECTION] < 15) {
				outputText("Amily's efforts at leading you through the ruined village are brisk and efficient. You don't really think she's looking forward to doing this all that much. No, that might be overstating things. It's more like she's under the impression that, details aside, this encounter between the two of you will be pure business.\n\n", false);

				outputText("It's hard for you to say if you were led by a different route this time, but soon you are in what Amily has to offer for a private bedchamber, and she begins to reach for her clothes, obviously expecting you to do the same thing.\n\n", false);
				simpleChoices("Business", amilySexBusiness, "Playtime 1st", amilySexPlaytimeFirst, "", null, "", null, "", null);
			}
			//Moderate Affection Sex:
			else if (flags[kFLAGS.AMILY_AFFECTION] < 40) {
				var pregEvent:int = pregnancy.event;
				outputText("Amily leads you to her nest as quickly as ever, but things are a little different this time. You can tell Amily has what can only be described as a 'spring in her step'. She moves just a little bit quicker, she seems more enthusiastic about the prospect - her tail even waves slowly from side to side, a bit of body language you haven't seen from her before. And you're certain there's a bit of a seductive wiggle to her hips - which you definitely haven't seen from her before.", false);
				//(If Amily is Slightly Pregnant:
				if (pregEvent >= 1 && pregEvent <= 5) outputText("  However, she does sometimes touch the swell signifying the litter growing inside her, and when she does her attitude becomes uncertain and nervous.", false);
				outputText("\n\n", false);

				outputText("Once you are inside, Amily gently tries to push you onto the bedding where you will be mating. Once you are seated, she smiles at you with a teasing expression and begins to slowly strip herself off, clearly trying to make the act seem as erotic as possible.", false);
				if (pregEvent >= 6) outputText("  However, her confidence visibly slips when she has to fully bare the bulging belly that marks her pregnant state, but she musters the confidence and starts to show it off for you as well.", false);
				simpleChoices("Step In", amilyStepTheFuckIn, "Watch Show", amilyEnjoyShow, "", null, "", null, "", null);
			}
			else {
				if (pregnancy.event >= 6) fuckAmilyPreg();
				else amilyHighAffectionSecks();
			}
 */
    
};

// Switches sex scenes with Amily depending on gender, pregnancy, and force
function determineAmilySexEvent() { // May need to force a false boolean to determine if sex is forced
    // Set the sex variable to none
    //var sex = null;
    // Assume Amily isn't forcing you to fuck her.
    //var forced = false;
    // If sex isn't forced and the player isn't horny enough to fuck, jump out of loop
    
    // FEMALE SCENES
    /*
    //If Amily is lesbo lover!
	if (flags[kFLAGS.AMILY_CONFESSED_LESBIAN] > 0 && player.gender == 2) {
	//Futa amily!
	   if (flags[kFLAGS.AMILY_WANG_LENGTH] > 0) {
		//If not pregnant, always get fucked!
		  if (!pregnancy.isPregnant) sex = hermilyOnFemalePC;
		  //else 50/50
			else {
				if (rand(2) == 0) sex = girlyGirlMouseSex;
				else sex = hermilyOnFemalePC;
			}
		}
		//LESBO LUVIN!
		else sex = girlyGirlMouseSex;
    }
    */
    // HERM SCENES
    /*
	//If Amily is a herm lover!
	if (player.gender == 3 && flags[kFLAGS.AMILY_HERM_QUEST] == 2) {
	   //Amily is herm too!
        if (flags[kFLAGS.AMILY_WANG_LENGTH] > 0) {
			//If Amily is not pregnant
			if (!pregnancy.isPregnant) {
				//If PC is also not pregnant, 50/50 odds
				if (!player.isPregnant()) {
					//Herm Amily knocks up PC
					if (rand(2) == 0) sex = hermilyOnFemalePC;
					//PC uses dick on amily
                        else {
						  if (forced) sex = amilySexHappens;
						  else sex = sexWithAmily;
						}
				}
				//If PC is preg, knock up amily.
				else {
				    if (forced) sex = amilySexHappens;
					else sex = sexWithAmily;
                }

            }
			//Amily is preg
			else {
			 //Pc is not
			 if (!player.isPregnant()) sex = hermilyOnFemalePC;
			//PC is preg too!
			else {
			     //Herm Amily knocks up PC
				if (rand(2) == 0) sex = hermilyOnFemalePC;
				//PC uses dick on amily
				    else {
					   if (forced) sex = amilySexHappens;
				        else sex = sexWithAmily;
				    }
				}
            }
        }
		//Amily still girl!
		else {
		  //Not pregnant? KNOCK THAT SHIT UP
		  if (!pregnancy.isPregnant) sex = sexWithAmily;
		  //Pregnant?  Random tribbing!
		  else {
		  //Lesbogrind
		      if (rand(2) == 0) sex = girlyGirlMouseSex;
			  //Fuck!
			 else {
			     if (forced) sex = amilySexHappens;
				    else sex = sexWithAmily;
             }
          }
        }
    }
    */
    
    // MALE SCENES
    
    if (player.gender == 1) {
	   if (forced == true) amilySexHappens(); 
       else sexWithAmily();
	}
       
};


// Amily response to you proposing sex in later meetings
function sexWithAmily() {
    clearOutput();
	//amilySprite();
	outputText("You tell Amily that you came here because you wanted to have sex with her.<br><br>");
    //doNext(amilySexHappens);
    /*
	switch (pregnancy.event) {
        case 1: 
		case 2: 
		case 3: 
		case 4: 
		case 5: //Amily is slightly pregnant
		//[Low Affection]
            if (gameFlags[AMILY_AFFECTION] < 15) {
				outputText("She stares at you, puzzled. \"<i>Why? I'm already pregnant,</i>\" she tells you. \"<i>...Forget it. You can have sex when I need to get pregnant again. Go find a goblin if you want to fuck some brainless baby-stuffed whore!</i>\"<br><br>");
				outputText("Amily can still move quickly despite her pregnancy, and you are very promptly left all alone. Perhaps it would be better not to broach the subject that bluntly with her while she's in this state.<br><br>");
                //Reduce affection. DERP
				gameFlags[AMILY_AFFECTION] -= 3;
				doNext(Camp.returnToCampUseOneHour);
            }
			//[Medium Affection]
			else if (gameFlags[AMILY_AFFECTION] < 40) {
                outputText("She is clearly surprised, putting a hand to her swelling midriff. But then she shrugs and says, \"<i>Well, I guess I do owe you that much for helping me.</i>\"<br><br>");
				outputText("Though she does set off and indicate for you to follow, you realize that she's not too happy about your reason for being here.<br><br>");
				//[/ Go to [Medium Affection Sex]]
				doNext(amilySexHappens);
            }
			//[High Affection]
			else {
			     outputText("\"<i>You still want me, even though I'm already pregnant?</i>\" she asks – not angry or disappointed, but sounding rather pleased. \"<i>Well, how can I say no to you?</i>\" She smiles broadly and begins to walk away, doing her best to give you a sexy wiggle of her hips as an invitation for you to follow her.<br><br>");
				//[/ Go to [High Affection Sex]]
				doNext(amilySexHappens);
            }
			break; // Will we need this?
        case 6: 
        case 7: 
		case 8: //Amily is heavily pregnant
		      //[Low Affection]
			 if (gameFlags[AMILY_AFFECTION] < 15) {
				    outputText("Her disbelief is quite obvious. She stares at her belly, then at you, then at your crotch, then back at her belly again. She shakes her head, clearly looking disgusted. \"<i>What kind of sicko are you? Look at the state of me – I'm in no shape to have sex! Come back after I've given birth, if that's all I mean to you!</i>\"<br><br>");
				    outputText("Annoyed, she turns and waddles off. You do not give chase; you can tell that you've offended her.<br><br>");
					//Reduce affection
					gameFlags[AMILY_AFFECTION] -= 3;
				    doNext(Camp.returnToCampUseOneHour);
             }
			//[Medium Affection]
			else if (gameFlags[AMILY_AFFECTION] < 40) {
				outputText("She boggles as if she can't believe you. \"<i>You can't be that desperate you'd want somebody as fat and knocked up as I am!</i>\" she protests.<br><br>");
				outputText("You insist to her that you're not joking – you really do think she's sexy enough to make love to.<br><br>");
				outputText("\"<i>...Well, I guess I'm flattered, but... do you have the faintest idea how to make love to a woman who is pregnant? Especially one as far along as I am?</i>\"<br><br>");
				outputText("You are forced to concede that, actually, you don't.<br><br>");
				outputText("\"<i>It's not that I don't like you, " + player.short + ", it's just... well, I don't feel comfortable doing that,</i>\" she explains apologetically.<br><br>");
				outputText("You apologize back for confronting her with something she's uncomfortable with, and leave for your own camp, lest you insult her seriously.");
				gameFlags[AMILY_AFFECTION] -= 3;
				doNext(Camp.returnToCampUseOneHour);
            }
			//[High Affection]
			else {
			     outputText("She looks a little puzzled by the request, but then smiles with sincere pleasure. \"<i>I'm game if you are, dear.</i>\" She winks and offers her hand to you. You take it, and let her lead you to her chosen nesting site.<br><br>");
                //[/ Go to [High Affection - Heavily Pregnant Sex]]
				doNext(amilySexHappens);
            }
			break; // do we need this?
        default: //Amily is not pregnant
        */
		//[Low Affection]
	if (gameFlags[AMILY_AFFECTION] < 15) {
        outputText("\"<i>Of course you did. Well, come on, I guess I can oblige you. It's the only way I'm going to get pregnant.</i>\"<br><br>");
        outputText("She sets off, clearly leading the way as you follow her.<br><br>");
        //[/ Go to [Low Affection Sex]]
		doNext(amilySexHappens);
    }
	//[Medium Affection]
	else if (gameFlags[AMILY_AFFECTION] < 40) {
        outputText("\"<i>Well, I guess you'll do. I mean, I still need to get pregnant,</i>\" she teases you, tail waving merrily. \"<i>Follow me.</i>\"<br><br>");
        outputText("You have to push yourself to keep up with her, but she's clearly just playing with you by moving so quickly rather than seriously trying to escape you.<br><br>");
		//[/ Go to [Medium Affection Sex]]
		doNext(amilySexHappens);
    }
	//[High Affection]
	else {
        outputText("Amily doesn't bother to say anything; she just grins like the cat that ate the canary (well, the mouse that ate the cheesecake, anyway). She grabs hold of your hand and does her best to pull you as fast as she can towards her closest bolt-hole.<br><br>");
        //[/ Go to [High Affection Sex]]
        doNext(amilySexHappens);
    }
}
    




/******
*
* First time having sex with Amily
*
*******/



//Function formerly known as stickItInMouseTwatForTheFirstTimeNOTWORTHALLBULLSHIT()
//Having sex with Amily for the first time
function amilySexFirstTime() {
    clearOutput();
    //amilySprite();
	outputText("Amily leads you on a convulated route through the ruins of the village. Up streets, down streets, around corners, even straight through some ruins. ");
    //(If player is five feet or less in height:
	//if (player.tallness < 60) outputText("Fortunately, being smaller than average means you have less difficulty following her than you might.");
   // else if (player.tallness >= 84) outputText("Your considerable size makes it surprisingly tricky to get around, but you manage to stay with her.");
	outputText("  Finally, you are led into one particular ruined house, and from there, to a bedroom. It's not exactly an impressive sight; a few bits of smashed furniture, and a large mound of vaguely clean rags and tattered cushions is the closest thing to a bed. The floor is covered in a thick layer of dirt - more than just dust, it's like dirt was deliberately brought in from outside.<br><br>");
	outputText("Amily sees you examining the room and looks sheepish. \"<i>I have to stay hidden, I can't afford to make it too obvious that anyone lives here. That dirt actually helps warn me if anyone else has found this bolthole.</i>\" She idly takes her tail in one hand and starts stroking the tip. \"<i>So... here we are?</i>\" She says, hesitantly. It's clear that for all her insistence on this being what she needed to do, she's evidently a virgin, and has no real idea of how to proceed from here. What do you do?<br><br>");

			//simpleChoices("Take Charge", FirstTimeAmilyTakeCharge, "Wait 4 Her", beSomeKindofNervousDoucheAndWaitForAmily, "Kiss Her", kissAmilyInDaMoufFirstTimeIsSomehowBetterThatWay, "", null, "", null);
    addButton(0, "Take Charge", amilySexFirstTimeTakeCharge, null, null, null, "Let me show her how it's done...");
    addButton(1, "Hesitate", amilySexFirstTimeHesitate, null, null, null, "Maybe she'll make the first move?");
    addButton(2, "Kiss Her", amilySexFirstTimeKiss, null, null, null, "Romance is key. Maybe you shouldn't let her forget?");
      

}  

// Was FirstTimeAmilyTakeCharge
// "Take charge" (i.e be a total douche) during first sexual encounter with Amily
function amilySexFirstTimeTakeCharge () {
    clearOutput();
	//outputText(images.showImage("amily-forest-takecharge"), false);
	//amilySprite();
	outputText("You decide that the scenery doesn't matter; Amily promised you sex, and you want that sex. Without a word you step forward and give her a mighty push, sending her falling onto her butt with a squeak as you thrust her towards the \"<i>bed</i>\" - that she lands in it is more coincidence than anything. You drop down on top of her, pinning her arms and legs with your own.<br><br>");

    outputText("\"<i>Hey, what's the big idea?</i>\" She protests indignantly.<br><br>");

	outputText("\"<i>You wanted sex with me, so just shut up, lie back and take it.</i>\" You snap back at her.<br><br>");

	outputText("Amily goes quiet, her eyes hardening into gimlets. It's pretty obvious she's not happy about this in the slightest, but she doesn't protest as you roughly pull off her shirt and her pants, exposing her pink sex, and then begin to tear off your own clothes.<br><br>");

	//(If player has penis 14 inches or more long)
	if (player.cocks[0].cockLength >= 14) {
	    // And said huge cock is human..
        if (player.cocks[0].cockType == CockTypesEnum.HUMAN || player.cocks[0].cockType.Index > 3) {
					outputText("Her eyes go wide with shock and fear as you reveal your impressively sized member, already growing erect and hard. \"<i>You can't stick that in me! It'll never fit!</i>\" She squeals.<br><br>");
					outputText("\"<i>I'll make it fit!</i>\" You assure her.<br><br>");
		}
		// Or demon...
        else if (player.cocks[0].cockType == CockTypesEnum.DEMON) {
			outputText("Horror and disgust write themselves on her features as your knobbly, diabolic penis is revealed to her. \"<i>What kind of monster are you?! You'll kill me with that unholy thing!</i>\"<br><br>");
			outputText("\"<i>Just shut up and you'll enjoy this.</i>\" You promise her.<br><br>");
		}
		// Or equine... 
        else if (player.cocks[0].cockType == CockTypesEnum.HORSE) {
            outputText("Her eyes go wide with shock and fear as she discovers your stallion-like cock. \"<i>Even in this world, being hung like a horse isn't a good thing! I can't take something like that!</i>\"<br><br>");
			outputText("\"<i>How do you know until you've tried?</i>\" You ask.<br><br>");
        }
		// or Canine/Knotted
		else if (player.hasKnot(0)) {
            outputText("\"<i>You can't be serious!</i>\" She protests when she sees what you have hidden in your pants.<br><br>");
			outputText("You don't bother to answer her, instead licking your lips as you imagine what she'll feel like wrapped around your cock.<br><br>");
        }
    }
	outputText("Without further ado, you thrust into her, eliciting a shriek of equal parts pain and rage. Ignoring that, you focus on trying to squeeze as much as your cock as you can into her warm, tight, velvety depths. She sobs and moans as you struggle, ");

    if (player.cocks[0].cockLength >= 14) outputText("failing to fit in more than a foot of your cock's length, ");
	
    outputText("but she doesn't try very hard to fight you off.<br><br>");

	outputText("Your hips thrust back and forth, harder and faster as you grow more and more aroused. Her cunt grips you like a vice, and you can feel the warm delicious pressure building up inside you. Stronger and stronger it grows, until you cannot hold it back any more and with a roar let your cum gush out, flooding her as deeply as you can.<br><br>");

	outputText("Only when you are sure that the last of your climax is over do you pull out, carelessly striding over to retrieve your clothing and start getting dressed. Amily stares at you, her eyes hard and sharp as flints. \"<i>Was it good for you?</i>\" She spits. \"<i>Let's hope we've both gotten what we want out of this.</i>\"<br><br>");

	outputText("\"<i>I'll be happy to come back and do it again if you need.</i>\" You jeer back, finishing dressing yourself and leaving her without so much as a backwards glance.<br><br>");
	player.orgasm();
	// Lower affection because you were an ass!
	gameFlags[AMILY_AFFECTION] -= 5;
    // Add this later
    //amilyPreggoChance(); 
	doNext(Camp.returnToCampUseOneHour);
};
    
 //Was beSomeKindofNervousDoucheAndWaitForAmily
// Wait for Amily to make the first move during first sexual encounter.
function amilySexFirstTimeHesitate () {
    clearOutput();
	//outputText(images.showImage("amily-forest-plainfuck"), false);
	//amilySprite();
	outputText("Amily may be a cute little girl, but you're not sure it's really a good idea to... proceed... So you just wait for her to decide whether she really wants to have sex here and now. After a few moments, when it's clear that you're not going to do anything, she frowns a little and steps up to you. Looking up into your eyes, you suddenly realize she wants a kiss. Bending down your head, you plan to give her a rather chaste kiss, but Amily obviously has other ideas. You feel your tongue entering her mouth, and what was intended as a short, innocent kiss turns into a very hot, rather 'not-so-innocent' one.  Suddenly you feel her little hand (or paw?) grabbing your ass.<br><br>");

	outputText("Despite this passionate display, though, she doesn't seem to really be 'feeling' it, more going through the motions to arouse you. You are too horny to care that much.<br><br>");

	//(If player has a penis 14" long or more)
	if (player.cocks[0].cockLength >= 14) {
	outputText("She leads you to her 'bed' and makes you sit down before stripping in front of you and kneeling down to help you take off your clothes.  At the sight of your huge penis, she's obviously unsure of how to proceed. After a moment or two thinking about it, she begins to stroke it with her hand. Once she has you hard and almost ready to explode on her, she sits back directly in front of you, guides the tip of your member into her netherlips and resumes stroking. She adds her other hand and her tail and continues to give you a combined hand- and tail-job until you orgasm. While it doesn't feel bad, you get the feeling that it could have been much better - and you also realize that Amily seems to be... disappointed.<br><br>");
	}
	
    else outputText("At the sight of your member, she grins and begins stroking it. \"<i>You are obviously the right size for me...</i>\" Before long, you're hard and almost desperately waiting for her to start doing 'it' for real. Never losing her grin, she slowly lowers herself onto you and guides your penis into her netherlips. The feeling is better than you imagined, but still, something doesn't feel quite right... However, as soon as the mouse-girl starts moving up and down, you forget anything but the pleasure you feel. It doesn't take long before you can't hold back anymore. Afterwards, Amily looks into your eyes for a moment before standing up and putting on her clothes again. You get the distinct feeling that she's somehow disappointed.<br><br>");

	outputText("Seeing as how she clearly has no further need for you, you quietly excuse yourself, get dressed and leave.");
	// Lower affection slightly because you were timid
    gameFlags[AMILY_AFFECTION] -= 2;
    // Code later
    //amilyPreggoChance();
	player.orgasm();
	doNext(Camp.returnToCampUseOneHour);
		
}

// Was kissAmilyInDaMoufFirstTimeIsSomehowBetterThatWay
// Kiss Amily first before going further during first sexual encounter
function amilySexFirstTimeKiss () {
    clearOutput();
	//amilySprite();
	//outputText(images.showImage("amily-forest-kissingfuck"), false);
	outputText("While the scenery certainly isn't anything you'd call \"<i>romantic</i>\" or \"<i>arousing</i>\", the eager little mouse-girl in front of you is quite appealing, so you step up to her, take her in your arms and lightly kiss her. Seeing her eyes widen in surprise for a moment, she soon closes her eyes and returns the kiss. Continuing the kiss you two begin to explore each other. Along the way, you help each other out of your clothes and slowly, almost reluctantly step back so you can for the first time see each other without anything in the way.<br><br>");

	//(If player has a penis 14" long or more)
	if (player.cocks[0].cockLength >= 14) outputText("At the size of your penis, Amily's eyes widen, but she still seems to be almost mesmerized. Slowly, blushing furiously and avoiding your gaze, she touches it and begins stroking your member. It soon turns into a veritable hand-job. Not taking her hand away, the mouse-girl guides you to the 'bed' and asks you to lie down. She continues stroking your penis with her hand, but also uses her tail and her tongue to bring you closer and closer to orgasm. Just before you can't hold back anymore, she sits down on your legs and slowly guides the tip of your penis to her netherlips. Soon, this 'almost penetration' overwhelms you and sends you over the edge.<br><br>");
	
    else {
	outputText("She looks down between your legs and, blushing, smiles. \"<i>It's nice to see a " + player.mf("man","woman") + " who hasn't gone insane about that part.</i>\" She murmurs to you, holding you as tightly as she can. Despite the fact you can feel her hands pressed against your back, you suddenly become aware of something stroking your penis as well; it takes a bit of wriggling, which presses her small, perky breasts to your chest in the most interesting way, but you can see that she is using her tail. Working in synch as best you can, the two of you crabwalk over to the pile of bedding and topple over; you land on your back, and she lands on you.<br><br>");

	outputText("By this point, your member is rock hard, and Amily pushes, somewhat reluctantly, against your grip, positioning herself so that the two of you are crotch to crotch. Looking up at her, you start to mouth the question \"<i>Are you okay with this?</i>\" to her, but she smiles, nods her head insistently, and then her lips seal themselves against yours again. Her vagina hovers almost teasingly against the tip of your cock as she works up the courage to make the final plunge... and plunge she does, suddenly skewering herself to the hilt upon you, to your shock. You can feel her pained wince, muscles clenching in pain all up her body, and you hold her tighter, kiss her deeper, in an effort to try and comfort her. You lie there, holding her, until she relaxes and unclenches, slowly beginning to work herself back and forth.<br><br>");
	}
	
    outputText("Enjoying the sensations, you start caressing her to increase her pleasure, too. It doesn't take long for you both to orgasm, before Amily sinks down on you, looking into your eyes with a smile on her face.<br><br>");

	outputText("\"<i>...That was... wow. Uh, I mean.</i>\" She hastily corrects herself, blushing. \"<i>I guess you weren't so bad... I knew I had a good feeling about you.</i>\" She smiles. \"<i>You do know I'm not neccessarily pregnant, right? We're going to have to do this again.</i>\"<br><br>");

	outputText("You smile, and tell her that you're happy to do it with her as often as it takes. She blushes so red ");
    if (gameFlags[AMILY_NOT_FURRY] == 0) outputText("it's almost like the fur on her cheeks has turned red.");
        else outputText("she nearly resembles an imp!");
    
    outputText("  Excusing yourself, you get dressed, receiving a lazy wave goodbye and a happy smile as you head out of the door and head for the main street, from there finding the way back to your camp.<br><br>");
	
    // Amily liked her first time!
    gameFlags[AMILY_AFFECTION] += 3;
    player.orgasm();
    // Pregnancy check. Uncomment after adding
    //amilyPreggoChance();
	doNext(Camp.returnToCampUseOneHour);
	
}

/**********
*
* Amily Pregnancy Checks
*
***********/

var amilyPregnancy = new PregnancyStore(gameFlags[AMILY_PREGNANCY_TYPE], gameFlags[AMILY_INCUBATION], gameFlags[AMILY_BUTT_PREGNANCY_TYPE], gameFlags[AMILY_OVIPOSITED_COUNTDOWN]);


function amilyPreggoChance() {
    //Is amily a chaste follower?
	if (gameFlags[AMILY_FOLLOWER] == 1) {
        //If pregnancy not enabled, GTFO
		if (gameFlags[AMILY_ALLOWS_FERTILITY] == 0) return;
    }
	//Cant repreg if already preg!
	if (amilyPregnancy.isPregnant() == true) return;
			
	// Cant preg if at the farm
	if (gameFlags[FOLLOWER_AT_FARM_AMILY] != 0) return;
			
    //25% + gradually increasing cumQ bonus
	if (rand(4) == 0 || player.cumQ() > rand(1000)) {
    amilyPregnancy.knockUpForce(PREGNANCY_PLAYER, INCUBATION_MOUSE - 182);
    }
    //      outputText("Amily got pregnant!");
        
}

/* Holding comment for stuff from the original CoC code

public function AmilyScene()
		{
			
			pregnancy.addPregnancyEventSet(PregnancyStore.PREGNANCY_PLAYER, 150, 120, 100, 96, 90, 72, 48);
												//Event: 0 (= not pregnant),  1,   2,   3,  4,  5,  6,  7,  8 (< 48)
			CoC.timeAwareClassAdd(this);
		}

		//Implementation of TimeAwareInterface
		public function timeChange():Boolean
		{
			var needNext:Boolean = false;
			pregnancy.pregnancyAdvance();
			trace("\nAmily time change: Time is " + model.time.hours + ", type: " + pregnancy.type + ", incubation: " + pregnancy.incubation + ", event: " + pregnancy.event);
			trace("\nAmily time change: butt type: " + pregnancy.buttType + ", butt incubation: " + pregnancy.buttIncubation + ", butt event: " + pregnancy.buttEvent);
			if (flags[kFLAGS.AMILY_BLOCK_COUNTDOWN_BECAUSE_CORRUPTED_JOJO] > 0) flags[kFLAGS.AMILY_BLOCK_COUNTDOWN_BECAUSE_CORRUPTED_JOJO]--;
			if (flags[kFLAGS.AMILY_INCEST_COUNTDOWN_TIMER] > 0 && flags[kFLAGS.AMILY_INCEST_COUNTDOWN_TIMER] < 30 * 24) flags[kFLAGS.AMILY_INCEST_COUNTDOWN_TIMER]++;
			if (flags[kFLAGS.AMILY_FOLLOWER] == 1) {
				if (pregnancy.isPregnant && pregnancy.incubation == 0) {
					outputText("\n", false);
					amilyPopsOutKidsInCamp();
					pregnancy.knockUpForce(); //Clear Pregnancy
					outputText("\n", false);
					needNext = true;
				}
				if (pregnancy.isButtPregnant && pregnancy.buttIncubation == 0) {
					amilyLaysEggsLikeABitch();
					pregnancy.buttKnockUpForce(); //Clear Pregnancy
					needNext = true;
				}
			}
			if (model.time.hours == 6) {
				//Pure amily flips her shit and moves out!
				if (flags[kFLAGS.AMILY_FOLLOWER] == 1 && player.cor >= 66 + player.corruptionTolerance() && flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00173] > 0) {
					amilyScene.farewellNote();
					needNext = true;
				}
				//Amily moves back in once uncorrupt.
				if (flags[kFLAGS.AMILY_TREE_FLIPOUT] == 0 && flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00173] > 0 && player.cor <= 25 + player.corruptionTolerance() && flags[kFLAGS.AMILY_FOLLOWER] == 0) {
					amilyScene.amilyReturns();
					needNext = true;
				}
			}
			else if (model.time.hours > 23) {
				if (flags[kFLAGS.AMILY_X_JOJO_COOLDOWN] > 0) flags[kFLAGS.AMILY_X_JOJO_COOLDOWN]--;
			}
			return needNext;
		}
	
		public function timeChangeLarge():Boolean {
			if (!kGAMECLASS.urtaQuest.urtaBusy() && flags[kFLAGS.AMILY_VISITING_URTA] == 2 && model.time.hours == 6) {
				kGAMECLASS.followerInteractions.amilyUrtaMorningAfter();
				return true;
			}
			if (flags[kFLAGS.AMILY_FOLLOWER] == 1 && model.time.hours == 6 && flags[kFLAGS.CAMP_WALL_PROGRESS] >= 100 && flags[kFLAGS.CAMP_WALL_SKULLS] < 100 && rand(3) == 0) {
				flags[kFLAGS.CAMP_WALL_SKULLS]++;
			}
			return false;
		}
		//End of Interface Implementation

		// NEW EVENTS:
		// 3172 = Ask to defur Amily
		// 3174 = Defur Amily at camp (both corrupt/noncorrupt)
		override public function amilyFollower():Boolean {
			if (flags[kFLAGS.AMILY_FOLLOWER] > 0) {
				//Amily not a follower while visiting Urta
				return !(flags[kFLAGS.AMILY_VISITING_URTA] == 1 || flags[kFLAGS.AMILY_VISITING_URTA] == 2);
			}
			else return false;
		}
		public function amilyCorrupt():Boolean {
			return flags[kFLAGS.AMILY_FOLLOWER] == 2;
		}





 			//Preggo birthing!
			
            
			if (amilyCanHaveTFNow())
			{
				amilyDefurrify();
				return;
			}
			//meeting scenes for when PC is the same gender as when they last met Amily
			if (flags[kFLAGS.AMILY_PC_GENDER] == player.gender) {
				//"bad" or "good" ends.
				if (flags[kFLAGS.AMILY_BIRTH_TOTAL] + flags[kFLAGS.PC_TIMES_BIRTHED_AMILYKIDS] >= 5 && flags[kFLAGS.AMILY_VILLAGE_ENCOUNTERS_DISABLED] == 0)
				{
					if (flags[kFLAGS.AMILY_AFFECTION] < 40) thisIsAReallyShittyBadEnd();
					else thisFunctionProbablySucksTooOhYeahAmilyFunction();

					return;
				}
                
           
		
			
			
            
            
// Surprise remeeting would go into amily.Start, but it's commented out. Will talk with other coders about it.
            
            //[Surprise Remeeting]
			/*(random chance of happening instead of [Normal Remeeting] if player meets 'requirements' for stalking Amily)
			if (player.spe > 50 && player.inte > 40 && rand(4) == 0) {
				outputText("Deciding to find Amily first instead of waiting for her to find you, you set off into the ruins. Using all of your knowledge, skill and cunning to figure out where she is likely to be, you make your way there without giving yourself away.\n\n", false);
				//[Amily is not pregnant]
				if (flags[kFLAGS.AMILY_INCUBATION] == 0) {
					outputText("Finally, you find her squatting down in front of a small bush. She's industriously picking it clean of berries, gulping down almost as many as she puts into a small sack at her side.\n\n", false);
				}
				//[Amily is slightly pregnant]
				else if (flags[kFLAGS.AMILY_INCUBATION] >= 90) {
					outputText("Finally, you find her rummaging through the contents of a home that has been torn open. She appears to be looking for as many old strips of cloth as she can find.\n\n", false);
				}
				//[Amily is heavily pregnant]
				else {
					outputText("Finally, you find her emerging from a turn-off, pulling up her pants and muttering to herself about her bladder.\n\n", false);
				}
				outputText("How do you approach her?", false);
				//Announce yourself / Scare her
				simpleChoices("Announce",sneakyUberAmilyRemeetingsAnnounce,"Scare Her",scareAmilyRemeetingsProBaws,"",0,"",0,"",0);
				return;
			}*/
/*



			
			
			

			/*FAILSAFE - ALL GENDERS HAVE HAD THERE GO AN NOTHING HAPPENED!
			outputText("You enter the ruined village cautiously. There are burnt-down houses, smashed-in doorways, ripped-off roofs... everything is covered with dust and grime. You explore for an hour, but you cannot find any sign of another living being, or anything of value. The occasional footprint from an imp or a goblin turns up in the dirt, but you don't see any of the creatures themselves. It looks like time and passing demons have stripped the place bare since it was originally abandoned. Finally, you give up and leave. You feel much easier when you're outside of the village – you had the strangest sensation of being watched while you were in there.", false);
			doNext(13);
			return;*/
/*
}
    */

