/** @param {NS} ns **/
export async function main(ns) {
var pservers = getPurchasedServers();
	for (var i = 0; i < pservers.length; ++i) {
	var servers = pservers[i];
	ns.killall(servers);
	ns.tprintf("INFO " + servers + " done");
}
}
