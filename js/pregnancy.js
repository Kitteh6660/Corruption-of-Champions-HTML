PregnancyStore = [];

//Pregancy types. Both butt and normal. Each type represents the father of this baby.

const PREGNANCY_MINOTAUR              =   2;
const PREGNANCY_MOUSE                 =   4;
const PREGNANCY_HELL_HOUND            =   6;
const PREGNANCY_CENTAUR               =   7;
const PREGNANCY_MARBLE                =   8;
const PREGNANCY_BUNNY                 =   9;

//const PREGNANCY_AMILY                 =  11;
const PREGNANCY_IZMA                  =  12;
const PREGNANCY_SPIDER                =  13;
const PREGNANCY_BASILISK              =  14;

const PREGNANCY_GOO_GIRL              =  16;
const PREGNANCY_EMBER                 =  17;
const PREGNANCY_BENOIT                =  18;
const PREGNANCY_SATYR                 =  19;
const PREGNANCY_COTTON                =  20;
const PREGNANCY_URTA                  =  21;
const PREGNANCY_SAND_WITCH            =  22;
const PREGNANCY_FROG_GIRL             =  23;
const PREGNANCY_FAERIE                =  24; //Indicates you are carrying either a phouka or faerie baby. Which one is determined by the PREGNANCY_CORRUPTION flag
//const PREGNANCY_PLAYER                =  25; //The player is the father. Will be used when an NPC is able to have children from multiple different fathers.

const PREGNANCY_SANDTRAP_FERTILE      =  27;
const PREGNANCY_SANDTRAP              =  28;
const PREGNANCY_JOJO                  =  29; //So we can track them separately from other mouse pregnancies
const PREGNANCY_KELT                  =  30; //So we can track them separately from other centaur pregnancies
const PREGNANCY_TAOTH                 =  31;
const PREGNANCY_GOO_STUFFED           =  32; //Used to fill the player's ass and/or vagina when Valeria has a goo girl take up residence. This prevents any other form of pregnancy from taking hold. Does not respond to ovielixirs.
const PREGNANCY_WORM_STUFFED          =  33; //Used to fill the player's vagina when the worms take up residence. This prevents any other form of pregnancy from taking hold. Does not respond to ovielixirs.
const PREGNANCY_MINERVA               =  34;
const PREGNANCY_BEHEMOTH              =  35;
const PREGNANCY_PHOENIX               =  36;
const PREGNANCY_ANDY                  =  37; //This is functionally the same as Satyr but less corrupt. 10% chance of fauns, if ever implemented.

const PREG_NOT_PREGANT                =   0; //The PREG_* consts are returned by the size function
const PREG_NO_SIGNS_UNKNOWN           =   1; //NPC has conceived but doesn’t know she’s pregnant, no visible signs
const PREG_NO_SIGNS_KNOWN             =   2; //NPC is in the first trimester, knows she’s pregnant
const PREG_START_BULGE                =   3; //NPC is in the first trimester, belly is just starting to bulge
const PREG_SWOLLEN                    =   4; //NPC is in the second trimester, belly is small but definitely swollen
const PREG_SIZEABLE                   =   5; //NPC is in the second trimester, belly is now sizable
const PREG_BLATANT                    =   6; //NPC is in the third trimester, belly is blatantly bulging
const PREG_FULL_TERM                  =   7; //NPC is in the third trimester, belly is big as it will get for a normal pregnancy
const PREG_OVERDUE                    =   8; //NPC is overdue. Usually means a centaur baby, twins or some similar condition. Effectively looks 10 months pregnant
const PREG_VERY_OVERDUE               =   9; //NPC is very overdue. Probably triplets or more. Effectively looks 11 months pregnant
//Old Value, replaced in Saves.unFuckSave()        const PREGNANCY_BUTT_BEE              =   2;
//Old Value, replaced in Saves.unFuckSave()        const PREGNANCY_BUTT_DRIDER           =   3;
//Old Value, replaced in Saves.unFuckSave()        const PREGNANCY_BUTT_SANDTRAP_FERTILE =   4;
//Old Value, replaced in Saves.unFuckSave()        const PREGNANCY_BUTT_SANDTRAP         =   5; //Sandtrap did not have fertilized eggs


const INCUBATION_MINOTAUR             = 432;

const INCUBATION_OVIELIXIR_EGGS       =  50;
const INCUBATION_HELL_HOUND           = 352;
const INCUBATION_CENTAUR              = 420;
const INCUBATION_MARBLE               = 368;
const INCUBATION_BUNNY_BABY           = 200;
const INCUBATION_BUNNY_EGGS           = 808; //High time indicates neon egg pregnancy
const INCUBATION_ANEMONE              = 256;
const INCUBATION_IZMA                 = 300;
const INCUBATION_SPIDER               = 400;
const INCUBATION_BASILISK             = 250;

const INCUBATION_GOO_GIRL             =  85;
const INCUBATION_EMBER                = 336;
const INCUBATION_SATYR                = 160;
const INCUBATION_COTTON               = 350;
const INCUBATION_URTA                 = 515;
const INCUBATION_SAND_WITCH           = 360;
const INCUBATION_FROG_GIRL            =  30;
const INCUBATION_FAERIE               = 200;
const INCUBATION_SANDTRAP             =  42;
const INCUBATION_HARPY                = 168;
const INCUBATION_SHIELA               =  72;
const INCUBATION_SALAMANDER           = 336;
const INCUBATION_MINERVA              = 216;
const INCUBATION_BEHEMOTH             =1440; //Sorry Behemoth, but Isabella wins.
const INCUBATION_PHOENIX              = 168;
const INCUBATION_KIHA                 = 384;
const INCUBATION_ISABELLA             =2160; //Longest pregnancy ever.

/***************
*

How pregnancy seems to work:

Each creation of a PregnancyStore object is a new pregnancy. One variable holds a number that represents the type of pregnancy. The other holds the duration of the pregnancy. The duration counts down over time. When it gets to zero, the birth happens. There are separate sets for normal pregnancy and anal pregnancy.

*/



// Creating a constructor for pregnancies. Declaring default variables to prevent JS from turning these into the Number type.
PregnancyStore.Pregnancy = function(pregType, pregInc, buttPregType, buttPregInc) {
    //Defaulting
    if (pregType == undefined) pregType = 0;
    if (pregInc == undefined) pregInc = 0;
    if (buttPregType == undefined) buttPregType = 0;
    if (buttPregInc == undefined) buttPregInc = 0;
    //Main function
    this.pregnancyTypeFlag = pregType; // This marks who did the impregnation for standard births
    this.pregnancyIncubationFlag = pregInc; // This is the base counter for how long the impregnation last for standard births
    this.buttPregnancyTypeFlag = buttPregType; // As above, but for anal pregnancy
    this.buttPregnancyIncubationFlag = buttPregInc; // As above, but for anal pregnancy
	this.pregnancyEventArray = []; // Holds pregnancy event countdown numbers
	this.buttPregnancyEventArray = []; // Hold butt pregnancy event countdown numbers
	this.incrementer = 0; // Used to time the pregnancies.
	this.pregnancyEventCounter = 0; // Used for pregnancy event switch blocks. 0 should make it fall through to the default.
 };

// Method for determining whether or not there is a pregnancy
PregnancyStore.Pregnancy.prototype.isPregnant = function() {
    if (this.pregnancyTypeFlag != 0) return true;
    else return false;
};

// Method for filling pregnancyEventArrays. Original code specifies by hours. This will convert into minutes automatically
PregnancyStore.Pregnancy.prototype.eventFill = function(hourArray) {
	// Convert all elements in hourArray into minutes using fancy Haskell-like JS
	this.pregnancyEventArray = hourArray.map(function(item) { return item * 60; });
}

PregnancyStore.Pregnancy.prototype.knockUp = function(newPregType, newPregIncubation)
{
	if (this.pregnancyTypeFlag == 0) {
		this.pregnancyTypeFlag = newPregType;
		this.pregnancyIncubationFlag = newPregIncubation * 60;
		this.pregnancyEventCounter = 0;}
}

// Forces pregnancy regardless of existing pregnancy.
PregnancyStore.Pregnancy.prototype.knockUpForce = function(newPregType, newPregIncubation) {
    // Passing 0 and 0  to this function now clears out pregnancy.
	/*
	if (newPregType == 0 || newPregIncubation == 0) {
        outputText("<br><br>DEBUGGER: Attempted to start a pregnancy without passing the right flags!");
        return;
    }
	*/

    this.pregnancyTypeFlag = newPregType;
    this.pregnancyIncubationFlag = newPregIncubation * 60; // Converts hours into minutes
	this.pregnancyEventCounter = 0; // Resets event counter.
	// Debugging text
    //outputText("<br><br>You knocked someone up!");
    //outputText("<br>Pregnancy flag is " + this.pregnancyTypeFlag);
    //outputText("<br>Incubation flag is" + this.pregnancyIncubationFlag);
	//outputText("<br>Pregnancy array is" + this.pregnancyEventArray);
    //if (newPregType != 0) newPregType = (kGAMECLASS.flags[_pregnancyTypeFlag] & PREG_NOTICE_MASK) + newPregType;
	//If a pregnancy 'continues' an existing pregnancy then do not change the value for last noticed stage
	//kGAMECLASS.flags[_pregnancyTypeFlag] = newPregType;
	//kGAMECLASS.flags[_pregnancyIncubationFlag] = (newPregType == 0 ? 0 : newPregIncubation); 
    //Won't allow incubation time without pregnancy type
	//	return;
    };

// Time advacement function. Currently only works with normal pregnancy. OLD CODE
/*
PregnancyStore.Pregnancy.prototype.advanceTime = function(timeInc) {
	if (this.pregnancyIncubationFlag >= 1) {
		// Decrement the incubation flag
		//outputText("Decrementing Incubation Flag");
		for (i=0; i < timeInc; i++) {
			this.pregnancyIncubationFlag--; // Reduce overall timer
			if (this.pregnancyIncubationFlag < 0) { this.pregnancyIncubationFlag = 0;}			
		}
		// Checking for new Event Array
		//outputText("Checking Event Array");
		for (j=0; j < this.pregnancyEventArray.length; j++) {
			if (this.pregnancyIncubationFlag < this.pregnancyEventArray[j]) {
				//outputText("Setting new flag to " + (j + 1));
				this.pregnancyEventCounter = j + 1;
			}
		}
		//return;
	}
	return;
};
*/



/*
 //this._pregnancyEventValue = [];
    //this._buttPregnancyEventValue = [];
    //_pregnancyEventValue = new Vector.< Vector.<int> >();
	//_buttPregnancyEventValue = new Vector.< Vector.<int> >();
    
	//if (pregType < 0 || pregType > MAX_FLAG_VALUE || pregInc < 0 || pregInc > MAX_FLAG_VALUE || buttPregType < 0 || buttPregType > MAX_FLAG_VALUE || buttPregInc < 0 || buttPregInc > MAX_FLAG_VALUE || pregType == buttPregType || pregInc == buttPregInc) {
	//trace("Error: PregnancyStore created with invalid values for its flags. PregnancyStore(" + pregType + ", " + pregInc + ", " + buttPregType + ", " + buttPregInc + ")");	}
*/
    // Pregnancy methods

/*
PregnancyStore.Pregnancy.prototype.type = function(type) {
		if (this.pregnancyTypeFlag == 0) {return 0;}
		else { return this.pregnancyTypeFlag }
	};
*/


/*
    
// isPregnant rewrite. Checks to see if Amily is pregnant
    
    //isPregnant: function () {
      //  var returnvar = false; 
    //    if (this.pregnancyTypeFlag != 0) returnvar = true;
      //  return returnvar;
*/

/*

		
		public function get incubation():int { return (_pregnancyIncubationFlag == 0 ? 0 : kGAMECLASS.flags[_pregnancyIncubationFlag]); }

		public function get buttType():int { return (_buttPregnancyTypeFlag == 0 ? 0 : kGAMECLASS.flags[_buttPregnancyTypeFlag] & PREG_TYPE_MASK); }

		public function get buttIncubation():int { return (_buttPregnancyIncubationFlag == 0 ? 0 : kGAMECLASS.flags[_buttPregnancyIncubationFlag]); }
		

		public function get isButtPregnant():Boolean { return buttType != 0; } //At birth the incubation can be zero so a check vs. type is safer
*/		

/*

		//Same as addPregnancyEventSet, but for butts
		public function addButtPregnancyEventSet(buttPregType:int, ... buttPregStage):void
		{
			var pregVector:Vector.<int> = new Vector.<int>(buttPregStage.length + 1);
			pregVector[0] = buttPregType; //First element is the butt pregnancy type
			for (var i:int = 0; i < buttPregStage.length; i++) pregVector[i + 1] = buttPregStage[i];
			pregVector[pregVector.length - 1] = -1; //Make last element -1 to ensure there is always a match
			_buttPregnancyEventValue.push(pregVector);
		}
		

		
		
	
		public function buttKnockUp(newPregType:int = 0, newPregIncubation:int = 0):void
		{
			if (!isButtPregnant) buttKnockUpForce(newPregType, newPregIncubation);
		}
		
		public function buttKnockUpForce(newPregType:int = 0, newPregIncubation:int = 0):void
		{
			if (_buttPregnancyTypeFlag == 0 || _buttPregnancyIncubationFlag == 0) return; //Check that these variables were provided by the containing class
			if (newPregType != 0) newPregType = (kGAMECLASS.flags[_buttPregnancyTypeFlag] & PREG_NOTICE_MASK) + newPregType;
				//If a pregnancy 'continues' an existing pregnancy then do not change the value for last noticed stage
			kGAMECLASS.flags[_buttPregnancyTypeFlag] = newPregType;
			kGAMECLASS.flags[_buttPregnancyIncubationFlag] = (newPregType == 0 ? 0 : newPregIncubation); //Won't allow incubation time without pregnancy type
		}

		//The containing class is responsible for calling pregnancyAdvance, usually once per timeChange()
		public function pregnancyAdvance():void //Separate function so it can be called more often than timeChange if neccessary
		{
			if (incubation != 0) {
				kGAMECLASS.flags[_pregnancyIncubationFlag]--;
				if (kGAMECLASS.flags[_pregnancyIncubationFlag] < 0) kGAMECLASS.flags[_pregnancyIncubationFlag] = 0;
			}
			if (buttIncubation != 0) {
				kGAMECLASS.flags[_buttPregnancyIncubationFlag]--;
				if (kGAMECLASS.flags[_buttPregnancyIncubationFlag] < 0) kGAMECLASS.flags[_buttPregnancyIncubationFlag] = 0;
			}
		}
*/
		/* Many NPCs go through several events during their pregnancies. This function returns the latest event the NPC qualifies for.
		   When the NPC is not pregnant this always returns 0, when pregnant it will return at least 1. The further along the NPC is the larger the value. Each NPC
		   is free to have as many event as desired. They must be added using the addPregnancyEventSet function and are unique to each pregnancy type. */

/*

		public function get event():int
		{
			var pregType:int = type;
			if (pregType == 0) return 0; //Not pregnant
			var incubationValue:int = incubation;
			var pregEventVector:Vector.<int> = null;
			for (var i:int = 0; i < _pregnancyEventValue.length; i++) {
				pregEventVector = _pregnancyEventValue[i];
				if (pregEventVector[0] == pregType) {
					for (var j:int = 1; j < pregEventVector.length; j++) { //Skip element zero, the pregnancy type
						if (incubationValue > pregEventVector[j]) return j; //Will always find a value that is < incubationValue as last value is -1
					}
				}
			}
			return 1; //If there are no pregnancy events for this type of pregnancy then return 1
		}
		
		//The same event system as for vaginal pregnacies, but for butts
		public function get buttEvent():int
		{
			var pregType:int = buttType;
			if (pregType == 0) return 0; //Not pregnant
			var incubationValue:int = buttIncubation;
			var pregEventVector:Vector.<int> = null;
			for (var i:int = 0; i < _buttPregnancyEventValue.length; i++) {
				pregEventVector = _buttPregnancyEventValue[i];
				if (pregEventVector[0] == pregType) {
					for (var j:int = 1; j < pregEventVector.length; j++) { //Skip element zero, the pregnancy type
						if (incubationValue > pregEventVector[j]) return j; //Will always find a value that is < incubationValue as last value is -1
					}
				}
			}
			return 1; //If there are no pregnancy events for this type of pregnancy then return 1
		}

		//Returns either zero - for no change - or the value of the new pregnancy event which the player has not yet noticed
		//This function updates the noticed pregnancy event, so it only triggers once per event per pregnancy.
		public function eventTriggered():int
		{
			var currentStage:int = event;
			var lastNoticed:int = kGAMECLASS.flags[_pregnancyTypeFlag] & PREG_NOTICE_MASK;
			if (currentStage * 65536 == lastNoticed) return 0; //Player has already noticed this stage
			kGAMECLASS.flags[_pregnancyTypeFlag] = (kGAMECLASS.flags[_pregnancyTypeFlag] & PREG_TYPE_MASK) + (currentStage * 65536);
				//Strip off the old noticed value by ANDing with PREG_TYPE_MASK
			return currentStage;
		}

		//Same as eventTriggered, but for butts
		public function buttEventTriggered():int
		{
			var currentStage:int = buttEvent;
			var lastNoticed:int = kGAMECLASS.flags[_buttPregnancyTypeFlag] & PREG_NOTICE_MASK;
			if (currentStage * 65536 == lastNoticed) return 0; //Player has already noticed this stage
			kGAMECLASS.flags[_buttPregnancyTypeFlag] = (kGAMECLASS.flags[_buttPregnancyTypeFlag] & PREG_TYPE_MASK) + (currentStage * 65536);
				//Strip off the old noticed value by ANDing with PREG_TYPE_MASK
			return currentStage;
		}

		public function get size():int {
			//This function exists to provide consistency across different NPC's pregnancies. This is most useful when trying to write descriptions of different belly sizes
			//in threesomes, where the author might not be familiar with how the different pregnancy events relate to belly size.
			return PREG_NOT_PREGANT;
		}
	}
}

*/