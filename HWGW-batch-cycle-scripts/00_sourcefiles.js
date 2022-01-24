/** @param {NS} ns **/

//create a database of your earned source files and their level in a convenient array format
// asd.sources[0] holds your current bitnode number, the rest hold your level with that sourcecode (source -1 is not recorded)
// run once at the beginning of a bitnode run (or after starting the game client)
let asd={};
export async function main(ns) {
	if (!Math.asd) { Math.asd = asd; }; asd = Math.asd; //initialize all scripts database

	asd.sources = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,]; //initialize the sources databank
	for (const source of ns.getOwnedSourceFiles()) {
		asd.sources[source.n] = source.lvl; //update the relevant source levels
	}
	const bn = ns.getPlayer().bitNodeN;
	asd.bitnode = bn;
	asd.sources[0] = bn;
}
