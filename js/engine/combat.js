var monster = null;
var combatRoundState = 0;

function startCombat(enemy) {
	playerMenu = battleMenu;
	monster = enemy;
	monster.HP = monster.maxHP();
	battleMenu();
}

battleMenu = function() {
	clearOutput();
	outputText(monster.battleDesc);
	outputText("<br><br><b><u>" + capitalizeFirstLetter(monster.name) + "'s Stats</u></b>");
	outputText("<br>Level: " + monster.level);
	outputText("<br>HP: " + monster.HP + " / " + monster.maxHP());
	outputText("<br>Lust: " + monster.lust + " / " + monster.maxLust());
	outputText("<br>Fatigue: " + monster.fatigue + " / " + monster.maxFatigue());
	refreshStats();
	hideUpDown();
	menu();
	addButton(0, "Attack", attack);
	addButton(1, "Tease", tease);
	//addButton(2, "Spell", spellMenu);
	addButton(3, "Wait", wait);
	addButton(4, "Run", flee);
}

attack = function() {
	clearOutput();
	var baseDamage = player.baseDamage()
	var damage = baseDamage *= 1 - ((Math.random() * (monster.tou * 0.25)) / 100);
	if (damage < 1) damage = 1;
	//Round things off
	damage = Math.round(damage);
	//Apply damage
	monster.changeHP(-damage, true);
	combatRoundOver();
}

tease = function() {
	clearOutput();
	var teaseDamage = 5 + (player.level - monster.level) + (player.lib / 5) + rand(2);
	if (teaseDamage < 0) teaseDamage = 0;
	monster.changeLust(teaseDamage, true);
	combatRoundOver();
}

wait = function() {
	clearOutput();
	outputText("You decide not to take action this round.");
	changeFatigue(player, -5, false);
	combatRoundOver();
}

flee = function() {
	clearOutput();
	outputText("You turn tail and attempt to flee! " + capitalizeFirstLetter(monster.a) + " " + monster.refName +  " rapidly disappears into the shifting landscape behind you.");
	playerMenu = Camp.doCamp;
	doNext(playerMenu);
}

spellMenu = function() {
	
}

function combatRoundOver() {
	if (checkCombatOver()) {
		return;
	}
	if (combatRoundState == 0) {
		combatRoundState = 1;
		monster.combatAI();
	}
	else {
		combatRoundState = 0;
		doNext(battleMenu);
	}
	
}

function checkCombatOver() {
	if (monster.HP <= 0 || monster.lust >= monster.maxLust) {
		doNext(monster.victory);
		return true;
	}
	else if (player.HP <= 0 || player.lust >= player.maxLust) {
		doNext(monster.defeat);
		return true;
	}
	return false;
}

function cleanupAfterCombat(nextFunc) {
	if (nextFunc == undefined) nextFunc = Camp.returnToCampUseOneHour;
	if (monster.HP <= 0 || monster.lust >= monster.maxLust) {
		var xpGain = Math.floor(monster.XP);
		//Scale down XP gain if 1 level below the cap so you don't hit the level cap too quickly. This will be removed once level cap is ever raised to 20.
        if (player.level >= Math.ceil(levelCap * 0.8)) {
            xpGain *= 0.2;
            xpGain = Math.floor(xpGain);
        }
		var gemGain = Math.floor(monster.gems);
		outputText("<br><br>You've managed to defeat " + String.toLowerCase(monster.a) + " " + monster.name + "! You grab " + gemGain + " gems and " + xpGain + " XP from your victory.");
		player.XP += xpGain;
		player.gems += gemGain;
	}
	else if (player.HP <= 0 || player.lust >= player.maxLust) {
		var gemsLost = Math.floor(monster.level + rand(5));
		if (gemsLost > player.gems) gemsLost = player.gems;
		outputText("<br><br>You've fell unconscious. Apparently, you have lost " + gemsLost + " gems!");
		player.gems -= gemsLost;
	}
	refreshStats();
	doNext(nextFunc);
}