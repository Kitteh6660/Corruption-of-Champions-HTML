Amily = [];

addToGameFlags(AMILY_MET, AMILY_MET_AS, AMILY_PC_GENDER, AMILY_OFFER_ACCEPTED);

// Amily.start is the holder for encounters inside of the Town Ruins
Amily.start = function () {
    // BOOKKEEPING
    menu();
    // set initial gender flag
    if (gameFlags[AMILY_MET] == 0) gameFlags[AMILY_PC_GENDER] = player.gender;
     // Reset worm block if worms have been eliminated from the player
    /*
    if (flags[kFLAGS.AMILY_GROSSED_OUT_BY_WORMS] == 1) {
        if (player.findStatusEffect(StatusEffects.Infested) < 0) flags[kFLAGS.AMILY_GROSSED_OUT_BY_WORMS] = 0;
    }
    */
    
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
        // First Meeting
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
			
            /* Stopping here for the moment to check code
            //Accept Eagerly / Accept Hesitantly / Refuse
			simpleChoices("AcceptEagerly", acceptAmilysOfferEagerly, "Hesitantly", acceptAmilyOfferHesitantly, "NoFurries", amilyNoFur, "Refuse", refuseAmilysOffer, "", null);
			//Set flag for 'last gender met as'
			flags[kFLAGS.AMILY_PC_GENDER] = player.gender;
			return; */
            gameFlags[AMILY_PC_GENDER] = player.gender;
            doNext(Camp.returnToCampUseOneHour);
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
            outputText("DEBUGGING: Met Amily Once as Female, first meeting only.");
            doNext(Camp.doCamp);
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
				}
	
    //DEBUGGING
    outputText("<br><br> DEBUGGING: If you see this and there's no other text above it, you went through Amily.start and didn't hit a meeting. If there is text, all is well. This is normal behavior for now until more meetings are programmed in. Click next to move back to camp and move forward an hour.")
    doNext(Camp.returnToCampUseOneHour);

};
        
        
          
               



/* Holding comment for stuff from the original CoC code

 			//Preggo birthing!
			if (pregnancy.isPregnant && pregnancy.incubation == 0) {
				fuckingMouseBitchPopsShitOut();
				pregnancy.knockUpForce(); //Clear Pregnancy
				return;
			}
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
			//[Normal Remeeting]
			//Did the PC genderchange?  OH SHIT SON!
			//Alternatively: get bitched at
			if (flags[kFLAGS.AMILY_PC_GENDER] != player.gender) {
			//Stripped this out since it was making her flip out weirdly at genderless folks
			//|| (player.gender == 0 && flags[kFLAGS.AMILY_AFFECTION] < 15)) {
				amilyNewGenderConfrontation();
				return;
			}
			
			outputText("Curious on how Amily is holding up, you head back into the ruined village. This time you don't bother trying to hide your presence, hoping to attract Amily's attention quicker. After all, she did say that the place is basically empty of anyone except her, and you can otherwise handle a measly Imp or Goblin.\n\n", false);
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
					//[Low Affection]
					if (flags[kFLAGS.AMILY_AFFECTION] < 15 || player.gender == 0) {
						if (flags[kFLAGS.AMILY_MET_AS] == 2 && player.gender == 2) outputText("She crosses her arms and smiles at you. \"<i>So you came back huh?  Did you want to chat with little old me?</i>\" she asks.\n\n", false);
						else outputText("She crosses her arms and taps her fingers on her shoulder. \"<i>So, why are you here? What do you want?</i>\" she asks.\n\n", false);
					}
					//[Medium Affection]
					else if (flags[kFLAGS.AMILY_AFFECTION] < 40) {
						outputText("She smiles softly upon seeing you. \"<i>It's always good to see somebody else who hasn't given in to corruption. Did you have something on your mind?</i>\"\n\n", false);
					}
					//[High Affection]
					else {
						outputText("She grins at you with open delight. \"<i>Hey there, " + player.short + "! It's great to see you again... ", false);
						if (player.hasCock()) {
							outputText("Have you come to knock me up?", false);
							if (flags[kFLAGS.AMILY_WANG_LENGTH] > 0 && player.pregnancyIncubation == 0) outputText(" Or have you come to get knocked up?", false);
						}
						else if (player.hasVagina()) {
							if (flags[kFLAGS.AMILY_WANG_LENGTH] > 0 && player.pregnancyIncubation == 0) outputText("Have you come back so I could stuff another bun in your oven?", false);
							else outputText("Did you come back for a little 'quality time' with me?", false);
						}
						outputText("</i>\" she teases, but her body language ", false);
						if (flags[kFLAGS.AMILY_WANG_LENGTH] > 0) {
							outputText("and the erection tenting her pants ", false);
							dynStats("lus", 5);
						}
						outputText("suggests that it's no joking matter.\n\n", false);
					}
			}
			//Sex / Talk / Talk then sex
			var efficiency:Function = null;
			//Amily is not a herm but is ok with herm-daddying!
			if (player.hasItem(consumables.P_DRAFT) && flags[kFLAGS.AMILY_WANG_LENGTH] == 0 && flags[kFLAGS.AMILY_HERM_QUEST] == 2 && flags[kFLAGS.AMILY_AFFECTION] >= 40 && player.gender == 3) {
				efficiency = makeAmilyAHerm;
				outputText("You could probably bring up the efficiency of having two hermaphrodite mothers, particularly since you have this purified incubi draft handy.\n\n", false);
			}

			var sex:Function = determineAmilySexEvent();
			simpleChoices("Sex", sex, "Talk", talkToAmily, "Both", (sex == null ? null : talkThenSexWithAmily), "Efficiency", efficiency, "Leave", camp.returnToCampUseOneHour);
			//Set flag for 'last gender met as'
			flags[kFLAGS.AMILY_PC_GENDER] = player.gender;

			/*FAILSAFE - ALL GENDERS HAVE HAD THERE GO AN NOTHING HAPPENED!
			outputText("You enter the ruined village cautiously. There are burnt-down houses, smashed-in doorways, ripped-off roofs... everything is covered with dust and grime. You explore for an hour, but you cannot find any sign of another living being, or anything of value. The occasional footprint from an imp or a goblin turns up in the dirt, but you don't see any of the creatures themselves. It looks like time and passing demons have stripped the place bare since it was originally abandoned. Finally, you give up and leave. You feel much easier when you're outside of the village – you had the strangest sensation of being watched while you were in there.", false);
			doNext(13);
			return;*/
/*
}
    */