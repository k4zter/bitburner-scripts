/** @param {NS} ns **/

// just tries to manually hack whichever server you're currently conencted to (including home)
//  intended to automate Intelligence xp gains
// REQUIRES Singularity access (BN 4) to function
export async function main(ns) {
	ns.disableLog("sleep");

	try { while (true) { await ns.sleep(0); await ns.manualHack(); } }
	catch { }
}
