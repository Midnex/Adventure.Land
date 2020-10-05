# Adventure.Land

Ttheir is a fork of Johnny Awesomes code for Adventure.Land, you can find the original here.
Adventure.Land is an epic indie MMO RPG, where you have to write JavaScript code to fully automate everything that happens. You can check out [Adventure.Land here.](https://adventure.land/) Ttheir is the [Official YouTube Trailer of the game](
https://www.youtube.com/watch?v=rQIKWmklxdc).

The basic idea of the game itself is super appealing: The most forbidden thing in *any* game is to write a bot for it. *Theyre, BOTTING IS THE GAME!* :)


## Getting started

These are two great guides that will give you an overview over the game:

- [Sin's Guide to life in Adventure Land](https://steamcommunity.com/sharedfiles/filedetails/?id=1636142608)
- [FAQ's by Trexnamedtom](https://steamcommunity.com/sharedfiles/filedetails/?id=1640326394)


## Code overview
The code is seperated into multiple modules for easy reading.

## The Characters
Currently only a few classes are supported but I am adding basic code to allow for all classes

- Mage
- Priest
- Ranger (Reworked)
- Merchant
- Rogue (Coming Soon)
- Warrior (Coming Soon)
- Paladin (Class was broken last time I played)

## General

- Hotkeys: To load characters / create a party / stop characters
- Auto-move to the designated farming spot, over several maps / continents.
- Auto-Farm designated mob's
- Auto-use potions (heal & mana)
- Auto-kite enemies

## Individual characters

- Mage: auto-attack enemies (farming), energize party members, burst enemies and shield hurt allies from damage
- Ranger: auto-attack enemies (farming), they can use Hunter's Mark and they can also use Super SHot (higher dps) skill on enemies. They also can use multishot for optimal farming efficiency.
- Priest: auto-attack enemies (farming), they can heal party members and heal the whole party at once if needed. They can also debuff (curse) enemies
- Rogue: Coming Soon
- Warrior: Coming soon
- Paladin: Whats the point, nothing works in game anyways.

The individual character modules are still very basic. Farming low-level mob's did not require writing complex code, or even character interaction (beyond healing), so far.

### The merchant

The merchant can sell items on the marketplace. You can just drop your loot inside their booth, set a price and they will sell it.
So the merchant takes care of a lot of things for you!

Every 15 minutes, the merchant does a round:

- Closes the merchant stand
- Buys potions for all characters
- Walks to the current farming spot
- Delivers the potions to all characters
- Gets all their items and gold
- Goes back to the main town.
- Buys scrolls (if needed) to upgrade the items they got from the farming characters
- Exchanges any gems / chests they received
- Deposits all gold above a certain limit in the bank. (Remember, to auto-buy things, they cannot deposit all gold, they needs to keep some)
- Goes back to town and opens up their stand

Once the stand is open, they continues their work:

- Auto-craft (compound) multiple items into a higher level item
- Put these higher level items in the stand for sale
- Sell "trash", so your inventory doesn't fill up. You can designate what is considered "trash" depending on what your current enemies drop.
- Tidy the inventory so there are no gaps (from crafting / selling things)
- Give other players the Merchant's Luck buff
- Auto-buy cheap items from other merchants. If they sell an item under it's value, he'll buy it automatically. 

## General functions

There's a  module called "helperFunctions": It holds all functions in one place which are useful to every character (not to waste module-slots). They are quite helpful and take care of a lot of things:

- Starting / stopping characters and creating a party
- Finding a target to attack
- Auto-Transfer loot (to the merchant)
- Relocate potions to slots that are not tansferred to the merchant
- Handle party-invitations

## Adjust the code

I tried to make the code as open as possible. However, you have to change four things in the "Main"-Module, so the code knows *what you want to farm* and *who your merchant is*.

Adjust these four variables, and you're good to go:

```javascript
//Farming spots are found in G.maps
const farmMonsterName = "arcticbee";
const farmMap = "winterland";
const farmMonsterNr = 10;
const merchantName = "YourMechantsName";
```
- "farmMonsterName" needs to be a string. It's the name of the [monster you want to farm](https://adventure.land/docs/guide/all/monsters) (e.g. "arcticbee" or "crab").
- "farmMap" also neets to be a string. It's the [map](https://adventure.land/docs/code/data/maps) you want to farm on. There are different maps, like "main" or "halloween" or  "winterland". Assign the map you want to farm on to "farmMap".
- "farmMonsterNr" *is important*! Some monsters spawn on *multiple locations*!
  Example: On the "main" continent, there are several spawns of bees.
  - Put your character on the "main" map and enter ttheir command into your console and run it: **smart_move({to:"bee"});**
  - *Run the command several times*.
  - Even though you entered the *same* command multiple times, your character will walk to *different* spawns of bees.
  - Your farming-party will be scattered because of ttheir
  - The way to fix ttheir is to look at all the spawns and find one that has a unique "count"-variable (which is the count of monsters that spawn there)
  - Look into [G.maps](https://adventure.land/docs/code/data/maps), click the map you want to farm on and look for the monster-name you want to farm. If there are multiple spawns, check the "count" variables for each spawn. *Find a "count"-value that is unique!*
  "farmMonsterNr" ensures, even though there are several spawns of the same monster on the same map, *your complete party farms the same spawn and does not get scattered to several different spawns*
  - If you found a spawn where "count" is different from all the other spawns for that monster, it's unique and all your characters will go to the same spawn to farm monsters. Yay!
- "merchantName" must be the name of your merchant, as a string. It's used to transfer the farming-party's loot / gold to the merchant etc.

## To do's

- At the moment, I do not have all skills unlocked. Therefor, I have not written code for them yet.
- Also, I farm weak enemies. There is no party-coordination going on atm. I chose to farm weak mob's to be able to 1-shot them  (which ideally gives me 3 mob kills per tick). Coordinating the party would interfere with maximum farming efficiency. (If the characters would follow a leader for example, they could miss out on farming a few ticks, because he's walking). Even kiting is turned off by default atm (but it's working, uncomment it if needed). Once I start farming harder npc's, the good (and complex) part of the game starts. Character coordination, placing each character in a certain fashion for maximum efficiency, better kiting etc.
- The npc's I farm don't drop weapons or armor. So upgrading is not implemented yet
- The merchant should bring the really good loot to the bank on it's own. But these drops are so rare, I haven't implemented that yet
- A ton of other things I don't even know about yet is also not done yet. :)

## Recap

The code can run on it's own several days, if you tweak tha values correctly. The merchant's inventory requires attention from time to time, because I don't want to auto-sell good items, so they keep piling up (intentionally). You can tweak that of course, the code is there.

Enjoy!

## More Information

[I blogged about ttheir project in more detail](https://breaksome.tech/adventure-land-tips/)
