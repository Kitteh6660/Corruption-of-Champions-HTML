TownRuins = [];

TownRuins.firstExploration = function () {
    clearOutput();
    outputText("As you roam the shores of the lake, you find your footsteps echoing as though you were stepping on wood rather than squishing in the sandy mud of the shore. Curious, you squat down and brush the soil away, revealing the rotting form of a wooden plank. Looking carefully at the ground underfoot, you realize that it is part of a pathway – the kind that villages make to provide easier access to and from muddy rivers, lakes and beaches. You believe you can make out the rest of the path clearly enough to follow it to its end.<br><br>");
    outputText("Do you follow the pathway?");
    menu();
    addButton(0, "Yes", TownRuins.exploreAmilyVillage);
    addButton(1, "No", TownRuins.dontExploreAmilyVillage);
}

TownRuins.exploreAmilyVillage = function () {
    clearOutput();
    AMILY_VILLAGE_ACCESSIBLE = 1;
    outputText("You follow the overgrown path inland, away from the shore of the lake. You pass through thick trees, struggling not to lose the path, before finally reaching what is clearly the end.  In front of you lie crumbling walls, broken and scattered by the wind and rain... and by other forces entirely. Beyond them are houses that have been torn apart, burned or collapsed. This was clearly once a village, but it was devastated at some point in the past. Demon attack is the first possibility that leaps into your mind. You examine the ruins for a time, and then decide to head back to camp. You don't think it would be wise to investigate here without preparing first.<br><br>");
	outputText("<b>\"TownRuins\" added to Places menu.</b>");
	doNext(Camp.returnToCampUseOneHour);
}

TownRuins.dontExploreAmilyVillage = function () {
    clearOutput();
    outputText("Standing up, you turn and walk away. You presume from the state of the pathway that the village at the other end must either be in dire straits, abandoned, or overwhelmed by demons. In other words, it's no safe place for a traveler like you.");
	doNext(Camp.returnToCampUseOneHour);
}


//Main TownRuings Exploration Tree
TownRuins.exploreVillageRuin = function() {
    clearOutput();
    menu();
    outputText("You enter the ruined village cautiously. There are burnt-down houses, smashed-in doorways, ripped-off roofs... everything is covered with dust and grime. You explore for an hour, but you cannot find any sign of another living being, or anything of value. The occasional footprint from an imp or a goblin turns up in the dirt, but you don't see any of the creatures themselves. It looks like time and passing demons have stripped the place bare since it was originally abandoned. Finally, you give up and leave. You feel much easier when you're outside of the village.");
    doNext(Camp.doCamp);
};