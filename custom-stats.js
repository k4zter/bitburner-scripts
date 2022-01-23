import * as wb from "watcher.js";

/**@param {[num]} v Gets milliseconds in numbers */
function msToDHM(v) {
    var days = v / 8.64e7 | 0;
    var hrs = (v % 8.64e7) / 3.6e6 | 0;
    var mins = Math.round((v % 3.6e6) / 6e4);

    return days + 'd:' + z(hrs) + 'h:' + z(mins) + 'm';

    function z(n) { return (n < 10 ? '0' : '') + n; }
}
/**
 * @param {[num]} num Formats input to a number
 * @param {number} num Number to format
 * @param {boolean} isMonetary Boolean representation 
 * if `num` represents a monetary numerical value or not
 */
function format(num, isMonetary) {
    //define suffixes
    let symbols = ["", "k", "m", "b", "t", "qa", "qi", "sx", "sp", "oc"];
    let i = 0;
    //determine correct suffix
    for (; (Math.abs(num) >= 1000) && (i < symbols.length); i++) num /= 1000;
    //return formatted number
    return ((Math.sign(num) < 0) ? "-" : "") + (isMonetary ? "$" : "") + Math.abs(num).toFixed(2) + symbols[i];
}


/** @param {NS} ns **/
export async function main(ns) {
    const args = ns.flags([["help", false]]);
    if (args.help) {
        ns.tprint("This script will enhance your HUD (Heads up Display) with custom statistics.");
        ns.tprint(`Usage: run ${ns.getScriptName()}`);
        ns.tprint("Example:");
        ns.tprint(`> run ${ns.getScriptName()}`);
        return;
    }

    const doc = document; // This is expensive! (25GB RAM) Perhaps there's a way around it? ;)
    const hook0 = doc.getElementById('overview-extra-hook-0');
    const hook1 = doc.getElementById('overview-extra-hook-1');
    const tar = wb.info(ns);
    while (true) {
        await ns.share();
        try {
            const headers = []
            const values = [];

            //headers.push("S$/s");
            //values.push(format(ns.getScriptIncome('masterspawn.js', 'home')));

            //headers.push(tar.tar);
            //values.push(`${Math.round(tar.amt * 100)}%, ${tar.cL} `);

            headers.push('Karma');
            values.push(ns.heart.break().toPrecision(4));

            headers.push('Killed');
            values.push(ns.getPlayer().numPeopleKilled);
            // Now drop it into the placeholder elements
            headers.push('Ply T');
            values.push(msToDHM(ns.getPlayer().totalPlaytime));
            hook0.innerText = headers.join(" \n");
            hook1.innerText = values.join("\n");
        } catch (err) { // This might come in handy later
            ns.print("ERROR: Update Skipped: " + String(err));
        }
        await ns.sleep(200);
    }
}
