load_code("helperFunctions");
load_code("evadeTarget");
load_code("merchantSkills");
// load_code("mageSkills");
load_code("priestSkills");
load_code("rangerSkills");
load_code("rogueSkills");
// load_code("warriorSkills");
// load_code("paladinSkills");

// Hotkeys!
map_key("5", "snippet", "loadCharacters()")
map_key("6", "snippet", "initParty()")
map_key("7", "snippet", "stopCharacters()")

// Custom Settings
// Farming spots are found in G.maps.main
const farmMonsterName = "arcticbee";
const farmMap = "winterland";
const farmMonsterNr = 10;
//const farmMonsterName = "snake";
//const farmMap = "main";
//const farmMonsterNr = 6;
const merchantName = "AliVezas";
const healthPotThreshold = 0.95, manaPotThreshold = 0.85;

setInterval(main, 100);
setInterval(tier2Actions, 5000);

function main() {

    // If Character is dead, respawn note this is an easy way to lose a lot of XP on difficult enemies
    // if (character.rip) setTimeout(respawn, 15000);
    // If character is moving, do nothing
    if (is_moving(character) || smart.moving) return;
    // Replenish Health and Mana
    usePotions(healthPotThreshold, manaPotThreshold);
    // Loot everything
    loot();

    // Merchant Skills are Tier 2 actions
    if (character.ctype === "merchant") return;

    // Finds a suitable target and attacks it. Also returns the target!
    let target = getTarget(farmMonsterName);
    if (target) {
        // Kites Target
        // kiteTarget(target);
        // Circles Target
        // circleTarget(target);
        // Uses available skills
        if (character.ctype === "mage") mageSkills(target);
        if (character.ctype === "paladin") paladinSkills(target, farmMonsterName);
        if (character.ctype === "priest") priestSkills(target);
        if (character.ctype === "ranger") rangerSkills(target, farmMonsterName);
        if (character.ctype === "rogue") rogueSkills(target, farmMonsterName);
        if (character.ctype === "warrior") warriorSkills(target, farmMonsterName);
        // Attacks the target
        autoFight(target);
    } else {
        // Go to Farming Area
        getFarmingSpot(farmMonsterName, farmMap, farmMonsterNr, "move");
    }
}

function tier2Actions() {
    // If character is moving, do nothing
    if (is_moving(character) || smart.moving) return;
    // Puts potions on slots not transferred to merchant
    relocateItems();
    // Transfer loot to merchant
    transferLoot(merchantName);

    // Runs merchantSkills()
    if (character.ctype === "merchant") {
        merchantSkills();
        return;
    }
}