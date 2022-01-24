/** @param {NS} ns **/

/*==================
// masterscripts builds a list of scripts found on the home server, and records their sizes for future reference to asd.hScripts
//scripts is a paired array (defaultsize, scriptname, size, scirptname, size, etc...)
// as such, iterating over the array should be done with: for (let i=1, i<asd.hScripts.length; i+=2) {}
//  with asd.hScripts[i] being the name of a script and asd.hScripts[i+1] being its size
// also, asd.hScripts.indexOf(scriptName)+1 should be used to get the size of any given script
// 
==================*/
let asd = {}; //all script data
export async function main(ns) {
	if (!Math.asd) { Math.asd = asd; }; asd = Math.asd; //initialize all scripts database

	const scripts = [2.0]; // defaults to 2.0GB if script not found, may want to revise this...
	for (const script of ns.ls("home",".js")) {
		await ns.sleep(0);
		const size = ns.getScriptRam(script,'home');
		if (size) {
			scripts.push(script);
			scripts.push(size);
		}
	}
	for (const script of ns.ls("home",".ns")) {
		await ns.sleep(0);
		const size = ns.getScriptRam(script,'home');
		if (size) {
			scripts.push(script);
			scripts.push(size);
		}
	}
	for (const script of ns.ls("home",".script")) {
		await ns.sleep(0);
		const size = ns.getScriptRam(script,'home');
		if (size) {
			scripts.push(script);
			scripts.push(size);
		}
	}
	asd.hScripts = scripts;
}
