// @ts-nocheck

const HEROES_VANILLA = [
    ['Joker', 490, 1.07, 4.0, 0, 426.4],
    ['Dracula', 990, 1.07, 4.0, 0, 847.4],
    ['Queen Elsa', 1990, 1.07, 4.0, 0, 1680.0],
    ['Santa Claus', 3990, 1.07, 4.0, 0, 3334.9],
    ['Antman', 7990, 1.07, 4.0, 0, 6632.4],
    ['Bruce Lee 0', 13990, 1.07, 4.5, 0, 11681.0],
    ['Bruce Lee 1', 13990, 1.07, 4.5, 150000, 12304.0],
    ['Bruce Lee 2', 13990, 1.07, 4.5, 185000, 12952.0],
    ['Bruce Lee 3', 13990, 1.07, 4.5, 255000, 13625.0],
    ['Bruce Lee 4', 13990, 1.07, 4.5, 290000, 14473.0],
    ['Bruce Lee 5', 13990, 1.07, 4.5, 336000, 15346.0],
    ['Annie 0', 25490, 1.07, 4.5, 0, 26444.0],
    ['Tibbers 1', 25490, 1.07, 4.5, 58000, 27442.0],
    ['Annie 1', 25490, 1.07, 4.5, 116000, 28542.0],
    ['Tibbers 2', 25490, 1.07, 4.5, 180000, 29740.0],
    ['Annie 2', 25490, 1.07, 4.5, 250000, 31040.0],
    ['Tibbers 3', 25490, 1.07, 4.5, 326000, 32438.0],
    ['Annie 3', 25490, 1.07, 4.5, 407500, 33938.0],
    ['Tibbers 4', 25490, 1.07, 4.5, 495000, 35536.0],
    ['Annie 4', 25490, 1.07, 4.5, 588000, 37236.0],
    ['Deadpool 0', 45490, 1.07, 4.5, 0, 61730.0],
    ['Deadpool 1', 45490, 1.07, 4.5, 111000, 63728.0],
    ['Deadpool 2', 45490, 1.07, 4.5, 227500, 65826.0],
    ['Deadpool 3', 45490, 1.07, 4.5, 350000, 68024.0],
    ['Deadpool 4', 45490, 1.07, 4.5, 478000, 70322.0],
    ['Deadpool 5', 45490, 1.07, 4.5, 612500, 72720.0],
    ['Deadpool 6', 45490, 1.07, 4.5, 752500, 75218.0],
    ['Cristiano Ronaldo 1', 71990, 1.07, 4.5, 157500, 101490.0],
    ['Cristiano Ronaldo 2', 71990, 1.07, 4.5, 321000, 104388.0],
    ['Cristiano Ronaldo 3', 71990, 1.07, 4.5, 490000, 107386.0],
    ['Cristiano Ronaldo 4', 71990, 1.07, 4.5, 665000, 110484.0],
    ['Cristiano Ronaldo 5', 71990, 1.07, 4.5, 846000, 113682.0],
    ['Cristiano Ronaldo 6', 71990, 1.07, 4.5, 1032500, 116980.0],
    ['Micheal Jackson 0', 107990, 1.22, 1000.0, 9700, 148593.0],
    ['Iron Man 0', 114490, 1.22, 1000.0, 0, 158831.75],
    ['D.va 0', 127490, 1.22, 1000.0, 0, 178104.5],
    ['Developer 0', 142190, 1.22, 1000.0, 0, 199738.5],
    ['Micheal Jackson 1', 107990, 1.22, 1000.0, 602000, 154391.0],
    ['Iron Man 1', 114490, 1.22, 1000.0, 677250, 164629.75],
    ['D.va 1', 127490, 1.22, 1000.0, 752500, 183902.5],
    ['Micheal Jackson 2', 107990, 1.22, 1000.0, 1204000, 160189.0],
    ['Iron Man 2', 114490, 1.22, 1000.0, 1279250, 170427.75],
    ['D.va 2', 127490, 1.22, 1000.0, 1354500, 189700.5],
    ['Micheal Jackson 3', 107990, 1.22, 1000.0, 1806000, 165987.0],
    ['Iron Man 3', 114490, 1.22, 1000.0, 1881250, 176225.75],
    ['D.va 3', 127490, 1.22, 1000.0, 1956500, 195498.5],
    ['Developer 3', 142190, 1.22, 1000.0, 1956500, 217132.5],
    ['Micheal Jackson 4', 107990, 1.22, 1000.0, 2408000, 171785.0],
    ['Iron Man 4', 114490, 1.22, 1000.0, 2483250, 182023.75],
    ['D.va 4', 127490, 1.22, 1000.0, 2558500, 201296.5],
    ['Micheal Jackson 5', 107990, 1.22, 1000.0, 3010000, 177583.0],
    ['Iron Man 5', 114490, 1.22, 1000.0, 3085250, 187821.75],
    ['D.va 5', 127490, 1.22, 1000.0, 3160500, 207094.5],
    ['Developer 5', 142190, 1.22, 1000.0, 3235750, 228728.5]
  ];


const HERO_TABLE_COLUMNS = {
  'name': 0,
  'lv1cost': 1,
  'costScale': 2,
  'damageScale': 3,
  'reqlevel': 4,
  'dps': 5
};

let MAX_ZONE = 2**31 - 1;
let GOLD_SCALE = 1.15;
let HP_SCALE;   // 2xn array. First row is zones. Second row is hpscales
let HEROES;
let ROOT2 = false;
let ANCIENT_SOULS;
let xyl;
let chor;
let pony;
let borb;
let ACs;
let xylBonus;
let borbLimit;
let cps;
let gildBonus;
let classes;
let comboTime;
let totalDuration;
let borbLimitReached;
let goldBonus140 = Math.log10(1.6 / 1.15) * 139;
    goldBonus140 -= 2; // 1% TCC
let hsSplit = Math.log10(1 / 11);
let hsActiveDmgAdjust = Math.log10(2) / 2 * 3 + Math.log10(2.5) * 2 / 5;
let hsIdleDmgAdjust = Math.log10(2) / 2 * 2 + Math.log10(2.5) * 2 / 5;
let hsGoldAdjust = Math.log10(2) / 2 * 3;


function prepareHPScale() {
    if (!ROOT2) {
        HP_SCALE = [[1, 140], [1.55, 1.145]];
        for (let i=1; i<=400; i++) {
            HP_SCALE[0].push(500 * i);
            HP_SCALE[1].push(1.145 + 0.001 * i);
        }
    } else {
        let bps = root2_customized_bps(ANCIENT_SOULS);
        HP_SCALE = [[1], [1.55]];
        for (let i=0; i<bps.length; i++) {
            HP_SCALE[0].push(bps[i][3]);
            HP_SCALE[1].push(bps[i][2]);
        }
    }
    
}

function getHeroAttr(hnum, attr) {
    return HEROES[hnum][HERO_TABLE_COLUMNS[attr]];
}



function getAdvancedInputs(chor_level, pony_level, borb_level) {
    let xyliqilLevel = 0;
    if (!(xyliqilLevel >= 0)) { xyliqilLevel = 0; }
    xyliqilLevel = Math.floor(xyliqilLevel);

    let chorLevel = chor_level;
    if (!(chorLevel >= 0)) { chorLevel = 0; }
    if (chorLevel > 150) { chorLevel = 150; }
    chorLevel = Math.floor(chorLevel);
   

    let ponyLevel = pony_level
    if (!(ponyLevel >= 0)) { ponyLevel = 30; }
    ponyLevel = Math.floor(ponyLevel);
   
    
    let borbLevel = borb_level
    if (!(borbLevel >= 0)) { borbLevel = 0; }
    borbLevel = Math.floor(borbLevel);
   
    
    let autoClickers = 0;
    if (!(autoClickers >= 0)) { autoClickers = 0; }
    autoClickers = Math.floor(autoClickers);
    
    return [xyliqilLevel, chorLevel, ponyLevel, borbLevel, autoClickers];
}



function calculateProgression(inputLgHS, ancient_souls, chor_level, pony_level, borb_level, auto_clickers) {
    
    ANCIENT_SOULS = ancient_souls
    
    let heroSoulsInput = inputLgHS
    console.log(heroSoulsInput)
    let lghs = "";
    if (heroSoulsInput.indexOf("e") > -1) {
        let mantissa = heroSoulsInput.substr(0, heroSoulsInput.indexOf("e"));
        let exponent = heroSoulsInput.substr(heroSoulsInput.lastIndexOf("e") + 1);
        mantissa = parseFloat(mantissa || 0);
        exponent = parseFloat(exponent || 0);
        

        lghs = exponent + Math.log10(mantissa);
        mantissa = Math.pow(10, lghs % 1).toFixed(3);
        exponent = Math.floor(lghs);
    } else {
        lghs = parseFloat(heroSoulsInput || 0);
    }
    
    let advancedInputs = getAdvancedInputs(chor_level, pony_level, borb_level);
    xyl = advancedInputs[0];
    chor = advancedInputs[1];
    pony = advancedInputs[2];
    borb = advancedInputs[3];
    ACs = advancedInputs[4];
    cps = ACs > 4 ? Math.log10(1.5) * (ACs - 1) + 1: Math.log10(ACs + 1) + 1;
    let ponyBonus = pony > 100
        ? Math.log10(pony) * 2 + 1
        : Math.log10(pony * pony * 10 + 1);
    
    let errMsg = "";
    if (isNaN(ANCIENT_SOULS) || isNaN(lghs)) {
        errMsg = "Please enter all inputs";
    } else if (lghs < 100) {
        errMsg = "Requires lgHS >= 100";
    }
    
    if (errMsg.length > 0) {
        return;
    } 
    
    totalDuration = 0;
    borbLimitReached = false;
    ROOT2 = false
    HEROES = ROOT2 ? HEROES_ROOT2 : HEROES_VANILLA;
    
    xylBonus = xyl * Math.log10(1.5);
    
    prepareHPScale();

    let tp = ROOT2 ? root2_tp(ANCIENT_SOULS) : 
        0.25 - 0.23 * Math.exp(-0.0003 * ANCIENT_SOULS);
   
    
    let data = [];
    let start = 0;
    let startTL = 0;
    let lghsStart = lghs;
    let hlevel, lghsEnd;
    
    classes = [];
    
    let t0 = performance.now();
    
    let effectivelghs;
    
    for (let i = 0; i < 5; i++) {
        comboTime = 0;
        effectivelghs = lghsStart + Math.log10(1 / 0.95) * chor + hsSplit;
        let gilds = Math.max(1, Math.floor((lghsStart - ponyBonus) / Math.log10(1 + tp) / 10 - 10));
        gildBonus = Math.log10(gilds);
        
        let kumaEffect;
        if (effectivelghs > 4511 && !ROOT2) {
            kumaEffect = 8;
        } else {
            let kumaLevel = Math.floor(effectivelghs / Math.log10(2) - 7);
            if (ROOT2) {
                let a = 2.5 + borb * 0.1 + 0.00008 * borb * borb;
                kumaEffect = a * Math.log(kumaLevel + 2.719);
            } else {
                kumaEffect = 8 * (1 - Math.exp(-0.025 * kumaLevel));
            }
        }
        
        borbLimit = ROOT2 ? kumaEffect * 5000 :kumaEffect * borb / 8 * 5000;
        
        if (ROOT2) {
            let nogBonus = xyl > 0 ? 1 + 0.2505 * (1 - Math.exp(xyl * -0.04)) : 0;
            let nog = (lghsStart + Math.log10(1 / 0.95) * chor + hsSplit) / 2.5 + Math.log10(2.5) * 2 / 5;
            xylBonus = nog * nogBonus;
        }
        
        let hnumTL = heroReached(effectivelghs, startTL, false);
        let zoneTL = zoneReached(effectivelghs, hnumTL, false);
        
        gilds = Math.max(gilds, Math.floor(zoneTL / 10 - 10));
        gildBonus = Math.log10(gilds);
        
        hnumTL = heroReached(effectivelghs, hnumTL, false);
        zoneTL = zoneReached(effectivelghs, hnumTL, false);
        
        let hnum = heroReached(effectivelghs, start);
        let zone = zoneReached(effectivelghs, hnum);

        let hnumidle = heroReached(effectivelghs, start, true, true, false);
        let zoneidle = zoneReached(effectivelghs, hnumidle, true, true, false);

        let hnumidlecombo = heroReached(effectivelghs, start, true, false, true);
        let zoneidlecombo = zoneReached(effectivelghs, hnumidlecombo, true, false, true);
        
        if (zoneTL > zone) {
            if (zoneTL > MAX_ZONE) zoneTL = MAX_ZONE;
            hnum = hnumTL;
            zone = zoneTL;
        } else {
            if (zone > MAX_ZONE) {
                zone = MAX_ZONE;
            } else {
                let time = (zone - zoneTL) / 8050 * 3600;
                comboTime = Math.max(0, Math.log10(time));
                gilds = Math.max(gilds, Math.floor(zone / 10 - 10));
                gildBonus = Math.log10(gilds);
                hnum = heroReached(effectivelghs, hnum);
                zone = zoneReached(effectivelghs, hnum);
                if (zone > MAX_ZONE) zone = MAX_ZONE;
            }
        }
        
        let goldBonus = zone > zoneTL // Autoclickers or Xyliqil gold increase
            ? Math.min(306, cps)
            : ROOT2 ? 0 : xylBonus;
        
        hlevel = (zone * Math.log10(GOLD_SCALE) + 1.5 * effectivelghs + hsGoldAdjust + goldBonus140 
            - getHeroAttr(hnum, "lv1cost") + goldBonus - Math.log10(15)) / 
            Math.log10(getHeroAttr(hnum, "costScale"));
        lghsEnd = (zone / 5 - 20) * Math.log10(1 + tp) 
            + Math.log10(20 * (1 + tp) / tp);
        lghsEnd += ponyBonus;
        if (ANCIENT_SOULS >= 21000 && !ROOT2) lghsEnd -= zone > 1e6
            ? Math.log10(400)
            : Math.log10(20);
        let lghsChange = lghsEnd - lghsStart > 50 ? lghsEnd - lghsStart 
            : Math.log10(1 + Math.pow(10, lghsEnd - lghsStart));
        
        if (zoneTL > (borbLimit + 499)) {
            classes[i] = "redBG";
        } else if (zone > (borbLimit + 499)) {
            classes[i] = "yellowBG";
        }
        
        let durationSeconds = 0;
        if (zone > (borbLimit + 499)) {
            let flatZones = Math.max(0, borbLimit - zoneTL);
            let n = zone - borbLimit;
            let highZones = n + (n * n) / 10830;
            let j = borbLimit < zoneTL ? zoneTL - borbLimit: 0;
            let preTLMax =  j + (j * j) / 10830;
            let zonesTraveled = flatZones + highZones - preTLMax;
            durationSeconds = Math.ceil(zonesTraveled / 8050 * 3600);
            if (!borbLimitReached) {
                let activeZones = borbLimit + 500 - zoneTL;
                totalDuration += Math.floor(activeZones / 8050 * 3600);
                borbLimitReached = true;
            }
        } else if (zone > zoneTL) {
            let activeZones = zone - zoneTL;
            durationSeconds = Math.floor(activeZones / 8050 * 3600);
            totalDuration += durationSeconds;
        }

        // i = run number
        // lghsStart  = Run Black eggs
        //  getHeroAttr(hnum, "name"), = Farmer
        // zone = Level
        // hlevel = Farmer Level
        // lghsChange = Black eggs Increase
        // zoneTL = Time Skip Max Level
        // durationSeconds = Time Skip Max Level Time

        data.push({
            runNumber: i, // Run number
            blackEggsStart: lghsStart.toFixed(2), // Run Black eggs
            farmer: getHeroAttr(hnum, "name"), // Farmer name
            level: zone.toFixed(0), // Level
            farmerLevel: hlevel.toFixed(0), // Farmer Level
            blackEggsIncrease: lghsChange.toFixed(2), // Black eggs Increase
            timeSkipMaxLevel: zoneTL.toFixed(0), // Time Skip Max Level
            timeSkipDuration: formatTime(durationSeconds), // Time Skip Max Level Time
            idleLevel: zoneidle.toFixed(0), // Max idle Level
            idleComboLevel: zoneidlecombo.toFixed(0) // Max idle Combo Level
        });
       

        if (zone >= MAX_ZONE) { // Stop if encountering infinite ascension
            break;
        }
        lghsStart += lghsChange;
        start = hnum;
        startTL = hnumTL;
    }
    let t1 = performance.now();
    console.log("Performance:", t1 - t0);
    console.log("Time until borbLimit:", formatTime(totalDuration));
    console.log(data)
    return data
}

function formatTime(durationSeconds) {
    let hours = Math.floor(durationSeconds / 3600);
    if (hours < 72) {
        let minutes = Math.floor((durationSeconds - (hours * 3600)) / 60);
        let seconds = durationSeconds - hours * 3600 - minutes * 60;
        if (hours   < 10) { hours   = "0" + hours; }
        if (minutes < 10) { minutes = "0" + minutes; }
        if (seconds < 10) { seconds = "0" + seconds; }
        return hours + ":" + minutes + ":" + seconds;
    } else {
        let dl = durationSeconds;
        let years = Math.floor(dl / 31557600);
        dl -= years * 31557600;
        let days = Math.floor(dl / 86400);
        dl -= days * 86400;
        hours = dl / 3600;
        return (years > 0 ? years.toLocaleString() + "y " : "") + days + "d " + hours.toFixed(2) + "h";
    }
}

function heroReached(lgHS, start=0, active=true, idle=false, combo=false) {
    // start is used to search for reachable hero 
    // from the previous ascension, to save execution time
    let zone, gold;
    let i = start;
    for (; i < HEROES.length; i++) {
        zone = zoneReached(lgHS, i, active, idle, combo);
        gold = zone * Math.log10(GOLD_SCALE) + 1.5 * lgHS + hsGoldAdjust + goldBonus140 - Math.log10(15);
        gold += active // Autoclickers or Xyliqil gold increase
            ? Math.min(306, cps)
            : ROOT2 ? 0 : xylBonus;
        if (zone == MAX_ZONE || i == HEROES.length - 1 || 
            gold < heroUpgradeBaseCost(i + 1)) {
            break;
        }
    }
    return i;
}

function zoneReached(lgHS, i, active=true, idle=false, combo=false) {
    let R = Math.log10(getHeroAttr(i, "damageScale")) / 
        Math.log10(getHeroAttr(i, "costScale")) / 25;
    let lgDmgMultPerZone = Math.log10(GOLD_SCALE) * R + 
        ROOT2 * (ANCIENT_SOULS >= 6400) * Math.log10(1.01) / 10;
    let efficiency = getHeroAttr(i, 'dps') - 
        R * (getHeroAttr(i, "lv1cost") + 175 * Math.log10(getHeroAttr(i, "costScale")));

    let startingGold = hsGoldAdjust + 1.5 * lgHS + goldBonus140 - Math.log10(15);
    startingGold += active // Autoclickers or Xyliqil gold increase
        ? Math.min(306, cps)
        : ROOT2 ? 0 : xylBonus;
    startingGold += ROOT2 * (i >= 47) * 98; // BomberMax global gold boost on Root2
    
    let RHS = efficiency + (2.4 + active * 0.5) * lgHS 
        - 2 + startingGold * R;   // Minus 2 to account for boss HP
    RHS += active
        ? hsActiveDmgAdjust
        : hsIdleDmgAdjust;
    RHS += active // Autoclickers or Xyliqil damage increase
        ? Math.min(306, cps) * 2
        : ROOT2
            ? xylBonus + (ACs > 2e9 ? 0 : cps)
            : xylBonus * 2 + (ACs > 2e9 ? 0 : cps);
    RHS += gildBonus + comboTime;
    RHS += ROOT2 * (i >= 48) * 43.64;   // Gog global DPS boost on Root2

    if(idle) {
        RHS *= 1.0288 // 2.88% increase from
    }

    if(combo) {
        RHS *= 1.1288 // 12.88% increase from
    }

    let reqzone = (heroUpgradeBaseCost(i) - startingGold) / 
        Math.log10(GOLD_SCALE);
    
    let lghp0 = 1;  // lgHP at zone 1
    let nbp = HP_SCALE[0].length;
    for(let j = 0; j < nbp - 1; j++) {
        // Loop through every HP breakpoint
        let hpscale = HP_SCALE[1][j];
        let lghp1 = lghp0 + (HP_SCALE[0][j + 1] - HP_SCALE[0][j]) * 
            Math.log10(hpscale);
        let z0 = HP_SCALE[0][j];
        let z1 = HP_SCALE[0][j + 1];
        
        if(z1 >= reqzone && lghp0 - lgDmgMultPerZone * z0 <= RHS && lghp1 - lgDmgMultPerZone * z1 > RHS) {
            // In the middle of two breakpoints. 
            // Also must be approximately above the required zone to get this hero
            // Solve linear equation.
            let M = 1 / (Math.log10(hpscale) - lgDmgMultPerZone);
            let zone = M * (RHS - lghp0 + z0 * Math.log10(hpscale));
            return zone;
        }
        lghp0 = lghp1;
    }
    
    let M = 1 / (Math.log10(HP_SCALE[1][nbp - 1]) - lgDmgMultPerZone);
    if (M < 0) {    // Infinite ascension (monster scaling < damage increase)
        return MAX_ZONE;
    }
    let zone = M * (RHS - lghp0 + Math.log10(HP_SCALE[1][nbp - 1]) * HP_SCALE[0][nbp - 1]);
    return zone;
}

function heroUpgradeBaseCost(hnum) {
    let level = getHeroAttr(hnum, "reqlevel");
    // Force Yachiyl7 on Root2 to use Yachiyl6's cost scaling
    let costScale = getHeroAttr(
        hnum - (ROOT2 && hnum == HEROES.length - 1), "costScale");
    return getHeroAttr(hnum, "lv1cost") + Math.log10(costScale) * level;
}


export default calculateProgression;