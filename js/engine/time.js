// These functions handle changing the clock.
// Right now there is no day counter.

Time = [];

// Global array for loading in pregnancies and other things that are time sensitive.
var timeAware = [];

Time.increment = function() {
	time.minutes++;
	if (time.minutes >= 60) {
		time.minutes -= 60;
		time.hours++;
	}
	if (time.hours >= 24) {
		time.hours -= 24;
		time.days++;
	}
}


Time.advanceMinutes = function(minutes) {
	//if (timeAware.length > 0) { // If there's a function in timeAware
	//	for (i = 0; i < timeAware.length; i++) {
	//		timeAware[i].advanceTime(minutes);

	//	}
		for (i = 0; i < minutes; i++) {
			Time.increment();
			player.pregnancyAdvance(); // Advances the Player's pregnancy.
			amily.pregnancyAdvance(); // Advances Amily's pregnancy.
			tamanipreg.pregnancyAdvance(); //Advances Tamani's pregnancy.
		}
	//pregnancyProgression.updatePregnancy(); // Outputs the results of the Player's pregnancy flags once time passes.
}

	Time.advanceHours = function (hours) {

		Time.advanceMinutes(hours * 60);
    }
