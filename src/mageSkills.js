function mageSkills(target, farmMonsterName) {

    let debug = false;
    let player = character.name;
    let level = character.level;
    let mp = character.mp;
    let atk = character.attack;

    // How much Mana should be kept in reserve
    let MPReserve = 0.8;
    let HPReserve = 0.8;
    let enablecbust = true;

    // Shield Character Need to check of mob uses magic, if not, this needs to be disabled
    if (character.hp < (character.max_hp * HPReserve) && mp > G.skills["reflection"].mp && !is_on_cooldown("reflection")) {
        use_skill("reflection", character);
        game_log(player + " shielded themselves");
    }
    // Energize and Shield Party Members
    // parent.party_list is an array with the names of PartyMembers
    // We iterate over it
    parent.party_list.forEach(function (otherPlayerName) {
        // parent.entities only holds OTHER players, not
        // the current player running this code!! Therefor....
        let partyMember = parent.entities[otherPlayerName];
        // we have to check if party member holds something or is undefined!!!
        if (partyMember) {
            // Shield party member
            if (mp > G.skills["reflection"].mp && partyMember.hp < (partyMember.max_hp * HPReserve) && !partyMember.rip && is_in_range(partyMember, "reflection") && !is_on_cooldown("reflection")) {
                use_skill("reflection", partyMember);
                game_log(player + " shielded " + partyMember.name);
            }
            // Energize party member
            if (mp > (character.max_mp * MPReserve) && partyMember.mp < (partyMember.max_mp * MPReserve) && !partyMember.rip && is_in_range(partyMember, "energize") && !is_on_cooldown("energize")) {
                use_skill("energize", partyMember);
                game_log(player + " energized " + partyMember.name);
            }
        }
    });

    // Burst
    if (target && mp > (character.max_mp * MPReserve) && target.hp >= (mp * 0.5) && is_in_range(target, "burst") && !is_on_cooldown("burst")) {
        use_skill("burst");
        game_log(player + " used burst");
    }
        // Controller Mana Burst
        if (mp > G.skills["cbust"].mp && !is_on_cooldown("attack") && level >= 75 && enablecbust && parent.ctarget.hp <= atk * .5) {
            let targets = Object.values(parent.entities).filter(entity => entity.mtype === farmMonsterName && is_in_range(entity, "cbust"));
            if (targets.length >= 3 && targets.length <= 4) {
                use_skill("cbust", targets);
                game_log(player + " used controller mana burst");
            }
        }
}