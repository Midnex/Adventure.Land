function rangerSkills(target, farmMonsterName) {

    let debug = false;
    let player = character.name;
    let level = character.level;
    let mp = character.mp;
    let atk = character.attack;

    // Configurable Options
    let MPReserve = 0.8;
    let enable3shot = false;
    let enable4Fingers = false;
    let enable5shot = true;
    let enableHunters = true;
    let enableSuperShot = true;
    let enablePiercing = false;
    let enablePoison = false;
    let enableTrack = false;

    // Use Ranger Skills
    if (mp > (character.max_mp * MPReserve)) {
        if (debug) {console_log("MP: " + mp + " | MaxMP: " + character.max_mp + " | MPReserve: " + MPReserve)}
        // 3-Shot // Nothing to determine if you should use it or not, aka could be overwhelmed. 
        if (mp > G.skills["3shot"].mp && !is_on_cooldown("attack") && level >= 60 && enable3shot && parent.ctarget.hp <= atk * .5) {
            let targets = Object.values(parent.entities).filter(entity => entity.mtype === farmMonsterName && is_in_range(entity, "3shot"));
            if (targets.length >= 3 && targets.length <= 4) {
                use_skill("3shot", targets);
                game_log(player + " used 3-Shot");
            }
        }

        // 4 Finger Technique
        if (mp > G.skills["4fingers"].mp && is_in_range(target, "4fingers") && !is_on_cooldown("4fingers") && level >= 64 && enable4Fingers) {
            use_skill("4fingers");
            game_log(player)
        }

        // 5-Shot // Nothing to determine if you should use it or not, aka could be overwhelmed. 
        if (mp > G.skills["5shot"].mp && !is_on_cooldown("attack") && level >= 75) {
            let targets = Object.values(parent.entities).filter(entity => entity.mtype === farmMonsterName && is_in_range(entity, "5shot" && enable5shot && parent.ctarget.hp <= atk * .4));
            if (targets.length >= 5) {
                use_skill("5shot", targets);
                game_log(player + " used 5-Shot");
            }
        }

        // Hunters Mark buff and cd are 10 second cooldowns, no additional checks needed
        if (mp > G.skills["huntersmark"].mp && is_in_range(target, "huntersmark") && !is_on_cooldown("huntersmark") && enableHunters && parent.ctarget.hp >= atk * .25) {
            use_skill("huntersmark");
            game_log(player + " used Hunters Mark");
        }

        // Piercing Shot 
        if (mp > G.skills["piercingshot"].mp && is_in_range(target, "piercingshot") && !is_on_cooldown("piercingshot") && level >= 72 && enablePiercing &&  parent.ctarget.armor >= 400) {
            use_skill("piercingshot");
            game_log(player)
        }

        // Poison Arrow // Needs to 
        if (mp > G.skills["poisonarrow"].mp && is_in_range(target, "poisonarrow") && !is_on_cooldown("poisonarrow") && level >= 64 && enablePoison) {
            use_skill("poisonarrow");
            game_log(player)
        }

        // Supershot // Nothing to determine if you should use it. Like should I use this on a Goo lvl 1?
        if (mp > G.skills["supershot"].mp && is_in_range(target, "supershot") && !is_on_cooldown("supershot") && enableSuperShot && parent.ctarget.hp >= atk * .75) {
            use_skill("supershot");
            game_log(player + " used Supershot");
        }

        // Track PVP
        if (mp > G.skills["track"].mp && is_in_range(target, "track") && !is_on_cooldown("track") && level >= 64 && enableTrack) {
            use_skill("track");
            game_log(player)
        }
    }
}

