/** @param {NS} ns **/
//exploit to get and save a reference to the document object without incurring a RAM cost
//run once at the beginning of your session, then use Math.doc for free ever after
export async function main(ns) { try { Math.doc = document; } catch {} }