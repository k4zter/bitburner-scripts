/** @param {NS} ns **/
//exploit to get and save a reference to the window object without incurring a RAM cost
//run once at the beginning of your session, then use Math.win for free ever after
export async function main(ns) { try { Math.win = window; } catch {} }