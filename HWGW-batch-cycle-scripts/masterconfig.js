/** @param {NS} ns **/
//configuration constants for Drak's Masterhacker serries of scripts
export const HomeReserveMax = 100; //max amt of ram to keep free at home
export const HomeReserveMin = 10; //min amt of ram to keep free at home
export const HomeReservePortion = 0.25; //decimal% of home's ram to reserve, bounded by above
// MasterScripts will generally attempt to reserve a HomeReservePortion of home's ram for processing scripts, bounced by the above

export const SmlRam = 0.10; //portion of home ram below which a server is not used for the main hacking scripts
export const NoticeInterval = 5 * 60 * 1000; //amount of time between notices (currently only backdoor notices)

export const BestThresh = 1.10; //How much better a new target has to be before swapping (to reduce profit loss to overfrequent target swapping)
// ^NOT YET IMPLEMENTED
export const MaxAmt = 0.99; // max amount to steal per hack (decimal%) - can generally leave this alone, can raise to 1.0 if desired for stocks or the like
export const MaxProcess = 20000; //Maximum allowed concurrent processes - raising this is like a game of chicken with a cliff...
// as long as it's low enough, everything's fine... Raise it a little too much though and your game will become unstabe, take longer to recover after autosaves, and just generally make lag spikes worse - MUCH worse
// Try to find a level that doesn't tax your game too much, but also doesn't completely nerf your income.
// Recommended ranges are 4000-10000; but is heavily hardware and environment dependant, so feel free to go outside these ranges as long as things feel comfortable for you
export const BN = 1.0; //buffer threads extra grow and weaken threads to help keep stability
export const MinbT = 3; //MINIMUM bufferTime (time between each attack - like h bT g bT w) in milliseconds;
// lower MinbT means that attacks will try to land closer together, which leaves more room in the cycle for low security launches which keeps the order more stable
// but too low and the engine's randomnesss makes them land out of order - resulting in more aborted hacks and reducing profit
// Raise MinbT (and mincL as appropriate) and or lower MaxProcess if you're getting too many collissions and losing alot of profit to killed hacks
// Recommended range is 6-10, higher is perfectly fine if desired but can reduce profits during later installs, below 6 is pushing the limits of JavaScript itself and mot recommended
export const MincL = 9;//MINIMUM cycle Length (time between the START of complete hgw cycles, or time between hacks) in milliseconds - at least 2x MinbT, make longer for a generally more stable game and rotation
// lower cL = more hacks per second (more effecient to a point)
// but also means more chance of collissions and greater rounding error accumulation, which = reduced money
// try to find the sweat spot for your computer and environment
export const RamUse = 0.90 // Amount of your total ram to allow profiles to build from, actual usage will vary
// don't just set this to 100%, as processes launched during high sec stick around a little longer;
// so using all your memory can make it impossible to launch new attacks on time which can be more disruptive than just not launching them in the first place
export const AdaptSpeed = 0.0001; //How quickly the "realbT" adjusts to current lag spikes. Accceptable range is (0-1].
// Has no impact on actual rotation or attacks, just the callibration tracker display.
// Set higher to make the realbT "average" across less attacks and get a more "instantaneous" look at the current attack launch timers,
// set lower to get a longer "rolling average" and smooth out the peaks and valleys.
// GENERALLY the occassional lag spike has very little lasting impact on the rotation, and so instant isn't all that useful to track
// but set this too low and it becomes impossible to see spikes at all, and you might not set MinbT high enough
export const MaxTargets = 1; //Maximum number of servers to atatck - currently only works for one, do not change
// ^ NOT YET IMPLEMENTED

//==========
//== Gang ==
//==========
export const PreferedGangFaction = 'Slum Snakes';

/*
// vestigial main
export async function main(ns) {

}
*/
