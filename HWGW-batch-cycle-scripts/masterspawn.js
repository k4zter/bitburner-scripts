/** @param {NS} ns **/
import * as nt from "notns.js";
import * as mc from "masterconfig.js";


function freeRam(ns, server) { //uses getServerRam to ensure up to date values to avoid trying to generate threads w/o enough RAM
	try {
		return nt.maxRam(server) - ns.getServerUsedRam(server) - Math.max(0, ((server == 'home') ? nt.homeReserve() : 0));
	} catch { }
	return 0;
}

function launchAttack(ns, type, tar, threads = 1) {
	const start = Date.now();
	const script = (type == 'h') ? '_hack.js' : (type == 'g') ? '_grow.js' : '_weak.js'; //default to w
	const size = nt.scriptCost(script);
	for (let i = ((type == 'g') ? 0 : 1); i < ress.length && threads > 0; i++) { //sart at home for grows; largest non-home server for others.
		const res = ress[i];
		const maxth = Math.max(0, Math.floor(freeRam(ns, res) / size))
		if (maxth >= 1) {
			//adjust threads needed if server has more cores
			const coreMult = ((res == 'home') && (type == 'w' || type == 'g')) ? asd.homeCoreMult : 1.0;
			const th = Math.min(Math.max(1, Math.ceil(threads / coreMult)), maxth); //threads to assign to this attack
			const tixBool = (type == 'h' && asd.tixShort) || (type == 'g' && asd.tixLong); //manipulating the market?
			const pid = ns.exec(script, res, th, tar, Math.random(), th, tixBool);
			if (pid > 0) {
				threads -= Math.floor(th * coreMult);
				if (type == 'h') { hpids.push(pid); }
			}
		}
	}
	updatebT(start);
}

function updatebT(start) {
	realbT += Math.min(mc.AdaptSpeed * realbT, Math.max(-mc.AdaptSpeed * realbT, ((Date.now() - start) - realbT) * mc.AdaptSpeed)); //update the rolling average
	realbT = Math.max(1, realbT); // never go below 1 to prevent zeroing out
	asd.realbT = realbT; //Math.max(mc.MinbT, Math.ceil(realbT)); //update the strat target
}
/*
function thiscL(ns, pid, cL) { //retuns true if pid will complete within one CycleLength
	const rs = ns.getRunningScript(pid);
	if (!rs) { return true; } //pid is dead, it has (presumably) already conpleted
	let string = '';
	for (const log of rs.logs) {
		if (log.includes('Executing')) {
			string = log.substring(log.indexOf(' in ') + 4, log.indexOf('(t=') - 1);
			break;
		}
	}
	if (string == '') { return false; } //no executing log, so script hasn't yet executed its payload for some reason (presumably), so can't determine completion time - let it stay
	const ms = nt.toms(string); //change minutes, seconds, etc. to ms
	//ns.print(rs.onlineRunningTime*1000);
	return ((ms - rs.onlineRunningTime * 1000 - cL) < 0); //time remaining is less than 1 cycle length
}
*/
let ress = [];
let hpids = [];
//let gpids = [];
//let hgw = false;
let realbT = mc.MinbT;

//let ss;
let asd = {}; //all script data
export async function main(ns) {
	if (!Math.asd) { Math.asd = asd; }; asd = Math.asd;
	asd.tixShort = asd.tixShort ?? false;
	asd.tixLong = asd.tixLong ?? false;
	realbT = mc.MinbT;
	asd.realbT = realbT;

	//ss=ns;

	ns.disableLog('disableLog');
	ns.disableLog('sleep');
	ns.disableLog('clearLog');
	ns.disableLog('getServerMaxRam');
	ns.disableLog('getServerUsedRam');
	ns.disableLog('getServerMoneyAvailable');
	//ns.disableLog('exec');
	//ns.disableLog('kill');
	ns.disableLog('getServerSecurityLevel');
	ns.clearLog();

	while (true) {
		await ns.sleep(0);

		let totCost = 0; //add to this each time an active profile is added; up to totRam
		let totProc = 0; //add to this each time an active profile is added; up to MaxProcess

		let targets = [];
		for (let i = 0; i < asd.bests.length && i < mc.MaxTargets && totCost < asd.totRam && totProc < mc.MaxProcess; i++) { //ToDo: add totProc check
			await ns.sleep(1);

			try { ress = asd.servers.res; } catch { }

			totCost += asd.bests[i].cost;
			const tar = asd.bests[i].tar;

			const dat = asd.servers.dat[asd.servers.dat.indexOf(tar) + 1];
			const hT = dat.hT; // length of a hack
			const gT = dat.gT; // length of a grow
			const wT = dat.wT; // length of a weaken

			let wL = Date.now() + 10; // weaken launch time
			//let gL = wL - 5; //grow launch time
			//let hL = gL - 5; //hack launch time
			let gL = wL + wT - gT + 5 * asd.bests[i].cL - realbT; //grow launch time
			let hL = gL + gT - hT + 5 * asd.bests[i].cL - realbT; //hack launch time
			let tL = Date.now(); //test collision launch time

			let curTar = asd.bests[i].tar;
			//hgw = false;
			//let start = Date.now();

			while (asd.bests[i].tar == curTar) { //will need to be removed if multiple targets are to be enabld
				await ns.sleep(0);
				/*
				if (asd.calibrate) {
					ns.disableLog('exec');
					ns.disableLog('kill');
					ns.print(realbT);
				}
				else {
					ns.enableLog('exec');
					ns.enableLog('kill');
				}
				*/

				//if (!hgw) { start = Date.now(); }
				const best = asd.bests[i];
				const hgSec = (best.hS + best.gS) * 1.1;
				const secTol = dat.minDifficulty + Math.max(1, hgSec); //don't allow sec to rise by more than 1
				const monTol = (1.0 - best.amt) * 0.90 * dat.moneyMax; //don't allow more than 1 hack to hit

				const cL = best.cL;

				//clean up old hPids
				//if the queue's length has gone past the number of expected hacks, plus a buffer, remove the oldest extra hpids (should be mostly dead hpids)
				const hpidTrim = Math.max(0, Math.floor(hpids.length - best.hP - 30));
				if (hpidTrim) { //truthy hack for speed - the above math means that hpidTrim is either 0(false), or positive (true)
					hpids.splice(0, hpidTrim); //keep the hack pid queue a little tidy
				}
				//collision detection (and prevention?)
				if (Date.now() > tL && (((ns.getServerSecurityLevel(tar) - secTol) > 0) || ((ns.getServerMoneyAvailable(tar) - monTol) < 0))) {
					tL = Date.now() + cL; //don't remove more hacks until at least 1 grow/weaken pair has had a chance to fix things
					/*//killing hacks set to land in the next cycle length - runningScript.onlineRunningTime seems too unreluable
					for (let i = 0; i < hpids.length && i<15; i++) { //kill all hacks due to execute this cycle
						await ns.sleep(0);
					if (thiscL(ns, hpids[i], cL)) { ns.kill(hpids.splice(i,1)[0]); --i;} //if set to complete within a cycle, kill and remove from queue
					}
					*/
					//blind killing method (faster, but less accurate)
					let hpidsIndex = 0; //start at the beginning of the queue and go until you kill 5 hacks (or reach the end)
					for (let hackKills = 0; hackKills < 5 && hpidsIndex < hpids.length; hpidsIndex++) { //try for 5 successful kills
						await ns.sleep(0);
						if (ns.kill(hpids[hpidsIndex])) { ++hackKills; } //count successful kills
					}
					hpids.splice(0, hpidsIndex); //remove the dead hacks

				}

				try { ress = asd.servers.res; } catch { continue; }
				if (Date.now() > wL) {
					launchAttack(ns, 'w', tar, best.wN);
					wL = Date.now() + cL;
				}
				if (Date.now() > gL) {
					launchAttack(ns, 'g', tar, best.gN);
					gL = Date.now() + cL;
				}
				if (Date.now() > hL) {
					launchAttack(ns, 'h', tar, best.hN);
					hL = Date.now() + cL;
				}
				//ns.print(hgw);
				//if (hgw) {
				//	realcL += Math.min(0.0001*realcL, Math.max(-0.0001*realcL, (5 * (Date.now() - start) - realcL) * 0.0001*realcL)); //update the rolling average
				//	asd.realcL = Math.max(mc.MincL, Math.ceil(realcL)); //update the strat target
				//	hgw = false;
				//}
			}
		}
	}
}
