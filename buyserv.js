var amongus = '\n\
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣴⣶⣿⣿⣷⣶⣄⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n\
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⣾⣿⣿⡿⢿⣿⣿⣿⣿⣿⣿⣿⣷⣦⡀⠀⠀⠀⠀⠀\n\
⠀⠀⠀⠀⠀⠀⠀⢀⣾⣿⣿⡟⠁⣰⣿⣿⣿⡿⠿⠻⠿⣿⣿⣿⣿⣧⠀⠀⠀⠀\n\
⠀⠀⠀⠀⠀⠀⠀⣾⣿⣿⠏⠀⣴⣿⣿⣿⠉⠀⠀⠀⠀⠀⠈⢻⣿⣿⣇⠀⠀⠀\n\
⠀⠀⠀⠀⢀⣠⣼⣿⣿⡏⠀⢠⣿⣿⣿⠇⠀⠀⠀⠀⠀⠀⠀⠈⣿⣿⣿⡀⠀⠀\n\
⠀⠀⠀⣰⣿⣿⣿⣿⣿⡇⠀⢸⣿⣿⣿⡀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⡇⠀⠀\n\
⠀⠀⢰⣿⣿⡿⣿⣿⣿⡇⠀⠘⣿⣿⣿⣧⠀⠀⠀⠀⠀⠀⢀⣸⣿⣿⣿⠁⠀⠀\n\
⠀⠀⣿⣿⣿⠁⣿⣿⣿⡇⠀⠀⠻⣿⣿⣿⣷⣶⣶⣶⣶⣶⣿⣿⣿⣿⠃⠀⠀⠀\n\
⠀⢰⣿⣿⡇⠀⣿⣿⣿⠀⠀⠀⠀⠈⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⠁⠀⠀⠀⠀\n\
⠀⢸⣿⣿⡇⠀⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠉⠛⠛⠛⠉⢉⣿⣿⠀⠀⠀⠀⠀⠀\n\
⠀⢸⣿⣿⣇⠀⣿⣿⣿⠀⠀⠀⠀⠀⢀⣤⣤⣤⡀⠀⠀⢸⣿⣿⣿⣷⣦⠀⠀⠀\n\
⠀⠀⢻⣿⣿⣶⣿⣿⣿⠀⠀⠀⠀⠀⠈⠻⣿⣿⣿⣦⡀⠀⠉⠉⠻⣿⣿⡇⠀⠀\n\
⠀⠀⠀⠛⠿⣿⣿⣿⣿⣷⣤⡀⠀⠀⠀⠀⠈⠹⣿⣿⣇⣀⠀⣠⣾⣿⣿⡇⠀⠀\n\
⠀⠀⠀⠀⠀⠀⠀⠹⣿⣿⣿⣿⣦⣤⣤⣤⣤⣾⣿⣿⣿⣿⣿⣿⣿⣿⡟⠀⠀⠀\n\
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠻⢿⣿⣿⣿⣿⣿⣿⠿⠋⠉⠛⠋⠉⠉⠁⠀⠀⠀⠀\n\
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠉⠉⠁⠀⠀\n\
'

/**
 * @param {NS} ns Game namespace
 */
function info(ns) {
    let servName = 'pserv-', //change this variable to a string if u want
        scripts = 'sendem.js', //change this args to 0 if u changed the servName to a string or change this to a string too if u want
        r = ns.args[0], //change to args to 1 if u only changed servName to a string or args to 0 if u changed both scripts and servName to a string.
        fileName = ns.getRunningScript().filename;
    return { scripts, servName, r, fileName };
}

/**
 * Formats big numbers into abbreviated versions
 * @param {number} num Number to format
 * @param {boolean} isMonetary Boolean representation 
 * if `num` represents a monetary numerical value or not
*/
function moneyFormat(num, isMonetary) {
    //define suffixes
    let symbols = ["", "k", "m", "b", "t", "qa", "qi", "sx", "sp", "oc"];
    let i = 0;
    //determine correct suffix
    for (; (Math.abs(num) >= 1000) && (i < symbols.length); i++) num /= 1000;
    //return formatted number
    return ((Math.sign(num) < 0) ? "-" : "") + (isMonetary ? "$" : "") + Math.abs(num).toFixed(3) + symbols[i];
}

/**
 * Formats big numbers into abbreviated versions
 * @param {number} num Number to format
*/
function ramFormat(num) {
    let symbols = ["gb", "tb", "pb", "eb", "zb", "yb"];
    let i = 0;
    for (; (Math.abs(num) >= 1000) && (i < symbols.length); i++) num /= 1000;
    return (Math.abs(num).toFixed(2) + symbols[i]);
}

/**
 * @param {NS} ns Game namespace
 * @param {[string]} serv Name of the server
 * @param {[num]} ram Amount of ram the server has
 */
function buyS(ns, serv, ram) {
    let servCost = ns.getPurchasedServerCost(ram);
    ns.purchaseServer(serv, ram);
    ns.print(`INFO Bought ${serv} with ${ramFormat(ram)}. \n-${moneyFormat(servCost, true)}.`);
}

/**
 * @param {NS} ns Game namespace
 * @param {[string]} serv Name of the server
 */
function sellS(ns, serv) {
    let ram = ns.getServerMaxRam(serv);
    ns.killall(serv);
    ns.deleteServer(serv);
    ns.print(`WARN Sold ${serv} with ${ramFormat(ram)}.`)
}

/**
 * @param {NS} ns Game namespace
 */
function checkErrors(ns) {
    let stats = info(ns),
        servName = stats.servName,
        scripts = stats.scripts,
        r = stats.r,
        fileName = stats.fileName,
        boughtServ = ns.getPurchasedServers(),
        servCost = ns.getPurchasedServerCost(Math.pow(2, 20)) * 25,
        playerMoney = ns.getPlayer().money;
    if (typeof servName !== 'string' || typeof scripts !== 'string') {
        ns.tprint(`ERROR please run ${fileName} like such \neg. run ${fileName} [pserv-][scp.js][15] \nwould purchase servers naming them pserv-0 to pserv-24 with 2^15 = 32.77 TB of ram.\n(run ${fileName} [serverName] [scriptName (the one that copies over ur hack script and runs them on every purchased server)] [ram ((Optional) this number to the power of 2 will be the amount of ram u want the servers to have)].`);
        ns.exit();
    }
    if (isNaN(r)) {
        for (r = 20; r > 1 && servCost > playerMoney;) {
            --r
            servCost = ns.getPurchasedServerCost(Math.pow(2, r)) * 25;
        }
        if (Array.isArray(boughtServ)) {
            if (Math.pow(2, r) == ns.getServerMaxRam(boughtServ[0])) {
                if (Math.pow(2, r) == Math.pow(2, 20)) {
                    ns.tprint(`INFO You alread own the maximum amount of ram a server could have: ${ramFormat(Math.pow(2, 20))}.`);
                    ns.exit();
                } else {
                    ns.tprint(`ERROR You already own servers with ${ramFormat(Math.pow(2, r))} and do not have enought money to buy 25 servers with ${ramFormat(Math.pow(2, r + 1))}`);
                    ns.exit();
                }
                ns.tprint(`ERROR You already own servers with ${ramFormat(Math.pow(2, r))}.`);
                ns.exit();
            } else if (Math.pow(2, r) < ns.getServerMaxRam(boughtServ[0])) {
                let ramDiff = ns.getServerMaxRam(boughtServ[0]) - Math.pow(2, r);
                ns.tprint(`ERROR The servers are trying to buy has ${ramFormat(Math.pow(2, r))} and your servers have ${ramFormat(ramDiff)} more than the servers you are trying to purchase.`);
                ns.exit();
            } else {
                return r;
            }
        }
    }
}

export async function main(ns) {
    ns.disableLog('ALL');
    let stats = info(ns),
        r = checkErrors(ns),
        servName = stats.servName,
        scripts = stats.scripts,
        servCost = ns.getPurchasedServerCost(Math.pow(2, r)) * 25,
        boughtServ = ns.getPurchasedServers();
    let choice = await ns.prompt(`You are able to buy 25 servers all with ${ramFormat(Math.pow(2, r))} and with the names ${servName}n (n being the number of the server eg. ${servName}0) at the cost of ${moneyFormat(servCost, true)}.`)
    if (choice == true) {
        for (let i = 0; i < 25; ++i) {
            let serv = servName + i;
            let ram = Math.pow(2, r);
            let servOwned = boughtServ[i];
            if (typeof servOwned === 'undefined') {
                buyS(ns, serv, ram);
            } else if (typeof servOwned === 'string') {
                var boughtRam = ns.getServerMaxRam(servOwned);
                if (boughtRam < ram) {
                    sellS(ns, servOwned);
                    buyS(ns, serv, ram);
                }
            }
        }
        ns.print(amongus);
        ns.tprint(amongus);
        let scriptChoice = await ns.prompt(`Would you like to run ${scripts} with 25 servers?`);
        if (scriptChoice == true) {
            ns.exec(scripts, 'home');
        }
    } else {
        ns.tprint(`ERROR ${ns.getRunningScript().filename} Cancelled`);
        ns.exit();
    }
}