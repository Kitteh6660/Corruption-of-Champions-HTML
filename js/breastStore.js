const LACTATION_BOOST          = [0, 0, 2, 3, 6, 9, 17]; //Disabled, None, Light, Moderate, Strong, Heavy, Epic

const LACTATION_DISABLED			= 0;
const LACTATION_NONE				= 1; //Full == (>= 50), Overfull == (>= 60 + 5 * _lactationLevel), Overload == (>= 60 + 20 * _lactationLevel)
const LACTATION_LIGHT				= 2; //Full after 25 hours, overfull after 35 hours, overloaded after 50 hours
const LACTATION_MODERATE			= 3; //Full after 17 hours, overfull after 25 hours, overloaded after 40 hours
const LACTATION_STRONG		    	= 4; //Full after  9 hours, overfull after 15 hours, overloaded after 30 hours
const LACTATION_HEAVY				= 5; //Full after  6 hours, overfull after 12 hours, overloaded after 27 hours
const LACTATION_EPIC				= 6; //Full after  3 hours, overfull after  9 hours, overloaded after 24 hours
