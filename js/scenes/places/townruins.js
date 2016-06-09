var TownRuins = [];

addToGameFlags(AMILY_VILLAGE_EXPLORED, HAS_ARMOR_RACK, HAS_EQUIPMENT_RACK, HAS_WEAPON_RACK);

TownRuins.firstExploration = function () {
    clearOutput();
    outputText("As you roam the shores of the lake, you find your footsteps echoing as though you were stepping on wood rather than squishing in the sandy mud of the shore. Curious, you squat down and brush the soil away, revealing the rotting form of a wooden plank. Looking carefully at the ground underfoot, you realize that it is part of a pathway – the kind that villages make to provide easier access to and from muddy rivers, lakes and beaches. You believe you can make out the rest of the path clearly enough to follow it to its end.<br><br>");
    outputText("Do you follow the pathway?");
    menu();
    addButton(0, "Yes", TownRuins.exploreAmilyVillage);
    addButton(1, "No", TownRuins.dontExploreAmilyVillage);
};

TownRuins.exploreAmilyVillage = function () {
    clearOutput();
    gameFlags[AMILY_VILLAGE_ACCESSIBLE] = 1;
    outputText("You follow the overgrown path inland, away from the shore of the lake. You pass through thick trees, struggling not to lose the path, before finally reaching what is clearly the end.  In front of you lie crumbling walls, broken and scattered by the wind and rain... and by other forces entirely. Beyond them are houses that have been torn apart, burned or collapsed. This was clearly once a village, but it was devastated at some point in the past. Demon attack is the first possibility that leaps into your mind. You examine the ruins for a time, and then decide to head back to camp. You don't think it would be wise to investigate here without preparing first.<br><br>");
	outputText("<b>\"TownRuins\" added to Places menu.</b>");
	doNext(Camp.returnToCampUseOneHour);
};

TownRuins.dontExploreAmilyVillage = function () {
    clearOutput();
    outputText("Standing up, you turn and walk away. You presume from the state of the pathway that the village at the other end must either be in dire straits, abandoned, or overwhelmed by demons. In other words, it's no safe place for a traveler like you.");
	doNext(Camp.returnToCampUseOneHour);
};

// Probably don't need this function
/* TownRuins.rackCount = function () {
			var temp = 0;
			if (Inventory.hasKeyItem("Equipment Rack - Armor") >= 0) temp++;
			if (Inventory.hasKeyItem("Equipment Rack - Weapons") >= 0) temp++;
			if (Inventory.hasKeyItem("Equipment Rack - Shields") >= 0) temp++;
			return temp;
}*/

//Main TownRuins Exploration Tree
TownRuins.exploreVillageRuin = function () {
    clearOutput();
    gameFlags[AMILY_VILLAGE_EXPLORED]++;
    // 50% chance of encountering Shouldra. Ignore for now.
    /*
    if ((flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00365] == 0 && rackCount() >= 2 && rand(10) <= 3) && !followerShouldra() && flags[kFLAGS.SHOULDRA_FOLLOWER_STATE] != .5) {
				shouldraScene.shouldraGreeting();
				return;
			}
    */
    

    // Checking for racks in the Town Ruins
    if (rand(5) == 0 && (gameFlags[HAS_ARMOR_RACK] == 0 || gameFlags[HAS_WEAPON_RACK] == 0 || gameFlags[HAS_EQUIPMENT_RACK] == 0)) {
        var rack = 0;
		var rackArray = [];
        if (gameFlags[HAS_ARMOR_RACK] == 0) rackArray[rackArray.length] = 0;
        if (gameFlags[HAS_WEAPON_RACK] == 0) rackArray[rackArray.length] = 1;
		if (gameFlags[HAS_EQUIPMENT_RACK] == 0) rackArray[rackArray.length] = 2;
        rack = rackArray[rand(rackArray.length)];
        outputText("While picking through the ruined houses and abandoned structures of this dilapidated village, you manage to find something useful!  There's an intact but empty ");
         switch(rack) {
					case 0:
						outputText("armor");
						break;
					case 1:
						outputText("weapon");
						break;
					case 2:
						outputText("shield");
						break;
					default:
						outputText("undefined");
				}
				outputText(" rack here.  It looks like it could hold nine different ");
				switch(rack) {
					case 0:
						outputText("armors");
						break;
					case 1:
						outputText("weapons");
						break;
					case 2:
						outputText("shields");
						break;
					default:
						outputText("undefined");
				}
				outputText(".  You check it over and spot an easy way to fold it up for transport.  This would be a fine addition to your camp, so you pack it up and haul it back.");
				switch(rack) {
					case 0:
						gameFlags[HAS_ARMOR_RACK] = 1;
                        Inventory.newKeyItemAdd("Equipment Rack - Armor",0,0,0,0);
                        break;
					case 1:
						gameFlags[HAS_WEAPON_RACK] = 1;
                        Inventory.newKeyItemAdd("Equipment Rack - Weapons",0,0,0,0);
                        break;
					case 2:
						gameFlags[HAS_EQUIPMENT_RACK] = 1;
                        Inventory.newKeyItemAdd("Equipment Rack - Shields",0,0,0,0);
                        break;
					default:
						outputText("  <b>Please let Kitteh6660 know about this bug.</b>");
				}
				doNext(Camp.returnToCampUseOneHour);
				return;
    }
    else {
    menu();
    outputText("You enter the ruined village cautiously. There are burnt-down houses, smashed-in doorways, ripped-off roofs... everything is covered with dust and grime. You explore for an hour, but you cannot find any sign of another living being, or anything of value. The occasional footprint from an imp or a goblin turns up in the dirt, but you don't see any of the creatures themselves. It looks like time and passing demons have stripped the place bare since it was originally abandoned. Finally, you give up and leave. You feel much easier when you're outside of the village.");
    }
    doNext(Camp.doCamp);
};


/* Holding comment for stuff from the original CoC code


        
//[Exploring the Ruined Village]
						
			//Initialize saved gender:
			if (flags[kFLAGS.AMILY_MET] == 0) flags[kFLAGS.AMILY_PC_GENDER] = player.gender;
			//Amily gone/hiding super hard
			if (flags[kFLAGS.AMILY_IS_BATMAN] > 0 || flags[kFLAGS.AMILY_VILLAGE_ENCOUNTERS_DISABLED] == 1  || flags[kFLAGS.AMILY_TREE_FLIPOUT] > 0) {
				outputText("You enter the ruined village cautiously. There are burnt-down houses, smashed-in doorways, ripped-off roofs... everything is covered with dust and grime. You explore for an hour, but you cannot find any sign of another living being, or anything of value. The occasional footprint from an imp or a goblin turns up in the dirt, but you don't see any of the creatures themselves. It looks like time and passing demons have stripped the place bare since it was originally abandoned. Finally, you give up and leave. You feel much easier when you're outside of the village.", false);
				doNext(camp.returnToCampUseOneHour);
				return;
			}
			//Schrödinger Amily corrupted that damn place!
			else if (flags[kFLAGS.AMILY_FOLLOWER] == 2) {
				amilySprite();
				outputText("You enter the ruined village, still laughing at your past nefarious deeds. Maybe it's just your imagination, but you feel like this entire place reeks of corruption now... You explore for an hour, then go back to your camp, knowing your tainted slave will be more than happy to satisfy your urges.", false);
				doNext(camp.returnToCampUseOneHour);
				return;
			}
			//Remove worm block if player got rid of worms.
			if (flags[kFLAGS.AMILY_GROSSED_OUT_BY_WORMS] == 1) {
				if (player.findStatusEffect(StatusEffects.Infested) < 0) flags[kFLAGS.AMILY_GROSSED_OUT_BY_WORMS] = 0;
			}
			//Corrupt blow up! - requires you've met Amily
			if (flags[kFLAGS.AMILY_CORRUPT_FLIPOUT] == 0 && flags[kFLAGS.AMILY_MET] > 0 && (player.cor > 25 + player.corruptionTolerance() || player.cor > 75)) {
				meetAmilyAsACorruptAsshat();
				return;
			}
			//CORRUPTIONZ
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
			//Amily Un-encounterable (worms):
			if (flags[kFLAGS.AMILY_GROSSED_OUT_BY_WORMS] == 1 || player.cor > 25 || flags[kFLAGS.AMILY_CORRUPT_FLIPOUT] > 0) {
				outputText("You enter the ruined village cautiously. There are burnt-down houses, smashed-in doorways, ripped-off roofs... everything is covered with dust and grime. For hours you explore, but you cannot find any sign of another living being, or anything of value. The occasional footprint from an imp or a goblin turns up in the dirt, but you don't see any of the creatures themselves. It looks like time and passing demons have stripped the place bare since it was originally abandoned. Finally, you give up and leave. You feel much easier when you're outside of the village – you had the strangest sensation of being watched while you were in there.", false);
				doNext(camp.returnToCampUseOneHour);
				return;
			}
			amilySprite();
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
*/