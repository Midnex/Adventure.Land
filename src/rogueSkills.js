function rogueSkills(target, farmMonsterName) {

    let debug = false;
    let player = character.name;
    let level = character.level;
    let mp = character.mp;
    let atk = character.attack;

    //How much Mana should be kept in reserve
    let MPReserve = 0.8;

    if (mp > (character.max_mp * MPReserve)) {
        if (debug) {console_log("MP: " + mp + " | MaxMP: " + character.max_mp + " | MPReserve: " + MPReserve)}
        // Assasin's Smoke
        // Mental Burst
        // A Poisonous Touch
        // Quick Punch
        // Quick Stab
        // Rogues Swiftness
        // Shadow Strike

    }
}

