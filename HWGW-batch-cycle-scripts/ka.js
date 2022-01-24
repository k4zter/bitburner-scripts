/** @param {NS} ns **/

//kills all scripts not running on the home server
//USES the masterdata.js server database
let asd = {}; //all scripts database
export async function main(ns) {
	if (!Math.asd) { Math.asd = asd; }; asd = Math.asd; //initialize all scripts database

	for (const server of asd.servers.all) {
		await ns.sleep(0);
		if (server != 'home') { ns.killall(server); }
	}
	ns.tprint('--KillAllAll Complete');
}
