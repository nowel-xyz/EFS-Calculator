// Hero data tuple: [name, lv1cost, costScale, damageScale, reqlevel, dps]
type HeroRow = readonly [string, number, number, number, number, number];

const HEROES: readonly HeroRow[] = [
    ['Joker',                 490,  1.07,    4.0,       0,   426.4],
    ['Dracula',               990,  1.07,    4.0,       0,   847.4],
    ['Queen Elsa',           1990,  1.07,    4.0,       0,  1680.0],
    ['Santa Claus',          3990,  1.07,    4.0,       0,  3334.9],
    ['Antman',               7990,  1.07,    4.0,       0,  6632.4],
    ['Bruce Lee 0',         13990,  1.07,    4.5,       0, 11681.0],
    ['Bruce Lee 1',         13990,  1.07,    4.5,  150000, 12304.0],
    ['Bruce Lee 2',         13990,  1.07,    4.5,  185000, 12952.0],
    ['Bruce Lee 3',         13990,  1.07,    4.5,  255000, 13625.0],
    ['Bruce Lee 4',         13990,  1.07,    4.5,  290000, 14473.0],
    ['Bruce Lee 5',         13990,  1.07,    4.5,  336000, 15346.0],
    ['Annie 0',             25490,  1.07,    4.5,       0, 26444.0],
    ['Tibbers 1',           25490,  1.07,    4.5,   58000, 27442.0],
    ['Annie 1',             25490,  1.07,    4.5,  116000, 28542.0],
    ['Tibbers 2',           25490,  1.07,    4.5,  180000, 29740.0],
    ['Annie 2',             25490,  1.07,    4.5,  250000, 31040.0],
    ['Tibbers 3',           25490,  1.07,    4.5,  326000, 32438.0],
    ['Annie 3',             25490,  1.07,    4.5,  407500, 33938.0],
    ['Tibbers 4',           25490,  1.07,    4.5,  495000, 35536.0],
    ['Annie 4',             25490,  1.07,    4.5,  588000, 37236.0],
    ['Deadpool 0',          45490,  1.07,    4.5,       0, 61730.0],
    ['Deadpool 1',          45490,  1.07,    4.5,  111000, 63728.0],
    ['Deadpool 2',          45490,  1.07,    4.5,  227500, 65826.0],
    ['Deadpool 3',          45490,  1.07,    4.5,  350000, 68024.0],
    ['Deadpool 4',          45490,  1.07,    4.5,  478000, 70322.0],
    ['Deadpool 5',          45490,  1.07,    4.5,  612500, 72720.0],
    ['Deadpool 6',          45490,  1.07,    4.5,  752500, 75218.0],
    ['Cristiano Ronaldo 1', 71990,  1.07,    4.5,  157500,101490.0],
    ['Cristiano Ronaldo 2', 71990,  1.07,    4.5,  321000,104388.0],
    ['Cristiano Ronaldo 3', 71990,  1.07,    4.5,  490000,107386.0],
    ['Cristiano Ronaldo 4', 71990,  1.07,    4.5,  665000,110484.0],
    ['Cristiano Ronaldo 5', 71990,  1.07,    4.5,  846000,113682.0],
    ['Cristiano Ronaldo 6', 71990,  1.07,    4.5, 1032500,116980.0],
    ['Micheal Jackson 0',  107990,  1.22, 1000.0,    9700,148593.0],
    ['Iron Man 0',         114490,  1.22, 1000.0,       0,158831.75],
    ['D.va 0',             127490,  1.22, 1000.0,       0,178104.5],
    ['Developer 0',        142190,  1.22, 1000.0,       0,199738.5],
    ['Micheal Jackson 1',  107990,  1.22, 1000.0,  602000,154391.0],
    ['Iron Man 1',         114490,  1.22, 1000.0,  677250,164629.75],
    ['D.va 1',             127490,  1.22, 1000.0,  752500,183902.5],
    ['Micheal Jackson 2',  107990,  1.22, 1000.0, 1204000,160189.0],
    ['Iron Man 2',         114490,  1.22, 1000.0, 1279250,170427.75],
    ['D.va 2',             127490,  1.22, 1000.0, 1354500,189700.5],
    ['Micheal Jackson 3',  107990,  1.22, 1000.0, 1806000,165987.0],
    ['Iron Man 3',         114490,  1.22, 1000.0, 1881250,176225.75],
    ['D.va 3',             127490,  1.22, 1000.0, 1956500,195498.5],
    ['Developer 3',        142190,  1.22, 1000.0, 1956500,217132.5],
    ['Micheal Jackson 4',  107990,  1.22, 1000.0, 2408000,171785.0],
    ['Iron Man 4',         114490,  1.22, 1000.0, 2483250,182023.75],
    ['D.va 4',             127490,  1.22, 1000.0, 2558500,201296.5],
    ['Micheal Jackson 5',  107990,  1.22, 1000.0, 3010000,177583.0],
    ['Iron Man 5',         114490,  1.22, 1000.0, 3085250,187821.75],
    ['D.va 5',             127490,  1.22, 1000.0, 3160500,207094.5],
    ['Developer 5',        142190,  1.22, 1000.0, 3235750,228728.5],
];

// Column indices
const COL_NAME       = 0;
const COL_LV1COST    = 1;
const COL_COST_SCALE = 2;
const COL_DMG_SCALE  = 3;
const COL_REQLEVEL   = 4;
const COL_DPS        = 5;

// Game constants
const MAX_ZONE   = 2 ** 31 - 1;
const GOLD_SCALE = 1.15;

// Pre-computed log10 values (evaluated once at module load)
const LOG10_GOLD_SCALE     = Math.log10(GOLD_SCALE);
const GOLD_BONUS_140       = Math.log10(1.6 / 1.15) * 139 - 2; // -2 for 1% TCC
const HS_SPLIT             = Math.log10(1 / 11);
const HS_ACTIVE_DMG_ADJUST = Math.log10(2) / 2 * 3 + Math.log10(2.5) * 2 / 5;
const HS_IDLE_DMG_ADJUST   = Math.log10(2) / 2 * 2 + Math.log10(2.5) * 2 / 5;
const HS_GOLD_ADJUST       = Math.log10(2) / 2 * 3;

// HP scale: parallel arrays of zone breakpoints and HP scales at each breakpoint
type HPScale = [zones: number[], scales: number[]];

export interface RunData {
    runNumber:            number;
    blackEggsStart:       string;
    farmer:               string;
    level:                string;
    farmerLevel:          string;
    blackEggsIncrease:    string;
    timeSkipMaxLevel:     string;
    timeSkipDuration:     string; // active push time for this run
    idleLevel:            string;
    idleRunDuration:      string; // idle push time for this run
    idleComboLevel:       string;
    idleComboRunDuration: string; // idle+combo push time for this run
    cumulativeDuration:   string; // total active playtime up to and including this run
    activeDurationRaw:    number; // active push seconds (raw)
    idleDurationRaw:      number; // idle push seconds (raw)
    idleComboDurationRaw: number; // idle+combo push seconds (raw)
}

// Internal state shared between helper functions within one calculateProgression call
interface CalcContext {
    hpScale:          HPScale;
    cps:              number; // clicks-per-second bonus (log10 scale)
    xylBonus:         number; // Xyliqil bonus (always 0 in current config)
    borbLimit:        number;
    gildBonus:        number;
    comboTime:        number;
    totalDuration:    number;
    borbLimitReached: boolean;
}

// ─── Hero accessors ───────────────────────────────────────────────────────────

function heroName(h: number):      string { return HEROES[h][COL_NAME] as string; }
function heroLv1Cost(h: number):   number { return HEROES[h][COL_LV1COST]; }
function heroCostScale(h: number): number { return HEROES[h][COL_COST_SCALE]; }
function heroDmgScale(h: number):  number { return HEROES[h][COL_DMG_SCALE]; }
function heroReqLevel(h: number):  number { return HEROES[h][COL_REQLEVEL]; }
function heroDPS(h: number):       number { return HEROES[h][COL_DPS]; }

function heroUpgradeCost(h: number): number {
    return heroLv1Cost(h) + Math.log10(heroCostScale(h)) * heroReqLevel(h);
}

// ─── CPL helper ──────────────────────────────────────────────────────────────

// Returns the average chickens-per-level over the zone range [zoneTL, zonePush].
// CPL = 2 for zones within soundLevel*5000 (Sound Egg cap), then +0.1 per 500
// zones above the cap. The 8050 zones/hr base assumes CPL=2, so time is scaled
// by averageCPL / 2.
function calcAverageCPL(zoneTL: number, zonePush: number, soundLevel: number): number {
    const totalZones = zonePush - zoneTL;
    if (totalZones <= 0) return 2;

    const soundCap = soundLevel * 5000;
    if (zonePush <= soundCap) return 2;

    const highStart = Math.max(zoneTL, soundCap);
    const highZones = zonePush - highStart;
    const flatZones = totalZones - highZones;

    // Integrate CPL over [highStart, zonePush] where CPL = 2 + 0.1*floor(d/500)
    // and d = distance above soundCap
    const A = highStart - soundCap;
    const B = zonePush  - soundCap;
    const kStart = Math.floor(A / 500);
    const kEnd   = Math.floor((B - 0.001) / 500);
    let integral = 0;
    for (let k = kStart; k <= kEnd; k++) {
        const segStart = Math.max(A, k * 500);
        const segEnd   = Math.min(B, (k + 1) * 500);
        integral += (2 + 0.1 * k) * (segEnd - segStart);
    }

    return (2 * flatZones + integral) / totalZones;
}

// ─── HP scale builder ─────────────────────────────────────────────────────────

function buildHPScale(): HPScale {
    const zones:  number[] = [1,    140];
    const scales: number[] = [1.55, 1.145];
    for (let i = 1; i <= 400; i++) {
        zones.push(500 * i);
        scales.push(1.145 + 0.001 * i);
    }
    return [zones, scales];
}

// ─── Core zone / hero calculations ───────────────────────────────────────────

function zoneReached(
    lgHS:   number,
    hnum:   number,
    ctx:    CalcContext,
    active = true,
    idle   = false,
    combo  = false,
): number {
    const idleBoost  = idle  ? Math.log10(1.25) : 0;
    const comboBoost = combo ? Math.log10(1.10) : 0;

    const R            = Math.log10(heroDmgScale(hnum)) / Math.log10(heroCostScale(hnum)) / 25;
    const lgDmgPerZone = LOG10_GOLD_SCALE * R;
    const baseDPS      = heroDPS(hnum) + idleBoost + comboBoost;
    const efficiency   = baseDPS - R * (heroLv1Cost(hnum) + 175 * Math.log10(heroCostScale(hnum)));

    const goldBonus = active ? Math.min(306, ctx.cps) : ctx.xylBonus;
    const startGold = HS_GOLD_ADJUST + 1.5 * lgHS + GOLD_BONUS_140 - Math.log10(15) + goldBonus;

    const dmgBonus = active
        ? Math.min(306, ctx.cps) * 2
        : ctx.xylBonus * 2 + ctx.cps;

    // dpsPortion is built in the same order as the original to preserve math exactly
    let dpsPortion = efficiency + ((2.4 + (active ? 0.5 : 0)) * lgHS + idleBoost + comboBoost);
    dpsPortion += active ? HS_ACTIVE_DMG_ADJUST : HS_IDLE_DMG_ADJUST;
    dpsPortion += dmgBonus;
    dpsPortion += ctx.gildBonus + ctx.comboTime;
    dpsPortion += idleBoost + comboBoost; // second application (matches original)

    let RHS = dpsPortion - 2 + startGold * R;
    RHS += idleBoost + comboBoost; // third application total (matches original)

    const reqZone = (heroUpgradeCost(hnum) - startGold) / LOG10_GOLD_SCALE;

    const [bpZones, bpScales] = ctx.hpScale;
    const nbp = bpZones.length;
    let lghp = 1; // log10(HP) at zone 1

    for (let j = 0; j < nbp - 1; j++) {
        const scale    = bpScales[j];
        const z0       = bpZones[j];
        const z1       = bpZones[j + 1];
        const lghpNext = lghp + (z1 - z0) * Math.log10(scale);

        if (
            z1 >= reqZone &&
            lghp     - lgDmgPerZone * z0 <= RHS &&
            lghpNext - lgDmgPerZone * z1  > RHS
        ) {
            const M = 1 / (Math.log10(scale) - lgDmgPerZone);
            return M * (RHS - lghp + z0 * Math.log10(scale));
        }
        lghp = lghpNext;
    }

    const lastScale = bpScales[nbp - 1];
    const M = 1 / (Math.log10(lastScale) - lgDmgPerZone);
    if (M < 0) return MAX_ZONE; // infinite ascension: damage outpaces monster HP
    return M * (RHS - lghp + Math.log10(lastScale) * bpZones[nbp - 1]);
}

function heroReached(
    lgHS:      number,
    startHnum: number,
    ctx:       CalcContext,
    active     = true,
    idle       = false,
    combo      = false,
): number {
    for (let i = startHnum; i < HEROES.length; i++) {
        const zone      = zoneReached(lgHS, i, ctx, active, idle, combo);
        const goldBonus = active ? Math.min(306, ctx.cps) : ctx.xylBonus;
        const gold      = zone * LOG10_GOLD_SCALE + 1.5 * lgHS + HS_GOLD_ADJUST
                        + GOLD_BONUS_140 - Math.log10(15) + goldBonus;

        if (zone === MAX_ZONE || i === HEROES.length - 1 || gold < heroUpgradeCost(i + 1)) {
            return i;
        }
    }
    return HEROES.length - 1;
}

// ─── Input parsing ────────────────────────────────────────────────────────────

function parseLgHS(input: string): number {
    const eIdx = input.indexOf('e');
    if (eIdx > -1) {
        const mantissa = parseFloat(input.slice(0, eIdx) || '0');
        const exponent = parseFloat(input.slice(eIdx + 1) || '0');
        return exponent + Math.log10(mantissa);
    }
    return parseFloat(input || '0');
}

// ─── Time formatting ──────────────────────────────────────────────────────────

function formatTime(seconds: number): string {
    if (seconds <= 0) return '00:00:00';
    if (seconds < 72 * 3600) {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return [h, m, s].map(v => String(v).padStart(2, '0')).join(':');
    }
    let rem = seconds;
    const years = Math.floor(rem / 31_557_600); rem -= years * 31_557_600;
    const days  = Math.floor(rem / 86_400);      rem -= days  * 86_400;
    const hours = rem / 3600;
    return (years > 0 ? `${years.toLocaleString()}y ` : '') + `${days}d ${hours.toFixed(2)}h`;
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function calculateProgression(
    inputLgHS:    string,
    ancientSouls: number,
    chorLevel:    number,
    ponyLevel:    number,
    borbLevel:    number,
    outputType:   string,
): RunData[] | undefined {
    const lghs = parseLgHS(inputLgHS);

    if (isNaN(ancientSouls) || isNaN(lghs) || lghs < 100) return undefined;

    // Clamp and floor all inputs
    const chor = Math.floor(Math.min(Math.max(chorLevel, 0), 150));
    const pony = Math.floor(Math.max(ponyLevel, 0));
    const borb = Math.floor(Math.max(borbLevel, 0));

    // cps with 0 auto-clickers: log10(0 + 1) + 1 = 1
    const cps = Math.log10(0 + 1) + 1;

    const ponyBonus = pony > 100
        ? Math.log10(pony) * 2 + 1
        : Math.log10(pony * pony * 10 + 1);

    const tp = 0.25 - 0.23 * Math.exp(-0.0003 * ancientSouls);

    const ctx: CalcContext = {
        hpScale:          buildHPScale(),
        cps,
        xylBonus:         0, // Xyliqil level is 0
        borbLimit:        0,
        gildBonus:        0,
        comboTime:        0,
        totalDuration:    0,
        borbLimitReached: false,
    };

    const results: RunData[] = [];
    let lghsCurrent = lghs;
    let startHnum   = 0;
    let startTLHnum = 0;

    for (let run = 0; run < 5; run++) {
        ctx.comboTime = 0;

        const effectiveLgHS = lghsCurrent + Math.log10(1 / 0.95) * chor + HS_SPLIT;
        let gilds = Math.max(1, Math.floor((lghsCurrent - ponyBonus) / Math.log10(1 + tp) / 10 - 10));
        ctx.gildBonus = Math.log10(gilds);

        // Kuma effect determines the borb zone limit
        const kumaLevel  = Math.floor(effectiveLgHS / Math.log10(2) - 7);
        const kumaEffect = effectiveLgHS > 4511
            ? 8
            : 8 * (1 - Math.exp(-0.025 * kumaLevel));
        ctx.borbLimit = kumaEffect * borb / 8 * 5000;

        // Time-skip (inactive) zone — two-pass to refine gilds
        let hnumTL = heroReached(effectiveLgHS, startTLHnum, ctx, false);
        let zoneTL = zoneReached(effectiveLgHS, hnumTL, ctx, false);
        gilds = Math.max(gilds, Math.floor(zoneTL / 10 - 10));
        ctx.gildBonus = Math.log10(gilds);
        hnumTL = heroReached(effectiveLgHS, hnumTL, ctx, false);
        zoneTL = zoneReached(effectiveLgHS, hnumTL, ctx, false);

        // Active zone
        let hnum = heroReached(effectiveLgHS, startHnum, ctx);
        let zone = zoneReached(effectiveLgHS, hnum, ctx);

        // Idle zone (observed +1.8% boost applied)
        const hnumIdle   = heroReached(effectiveLgHS, startHnum, ctx, true, true, false);
        const zoneIdle   = zoneReached(effectiveLgHS, hnumIdle, ctx, true, true, false) * 1.018;

        // Idle + combo zone (observed +9.1% boost applied)
        const hnumIdleCombo = heroReached(effectiveLgHS, startHnum, ctx, true, true, true);
        const zoneIdleCombo = zoneReached(effectiveLgHS, hnumIdleCombo, ctx, true, true, true) * 1.091;

        // Override zone so progression (lghsChange, startHnum) tracks the chosen mode
        if (outputType === 'idle') {
            zone = zoneIdle;
            hnum = hnumIdle;
        } else if (outputType === 'idle_combo') {
            zone = zoneIdleCombo;
            hnum = hnumIdleCombo;
        }

        // Decide final zone: prefer time-skip zone if higher, otherwise run active
        if (zoneTL > zone) {
            zone = Math.min(zoneTL, MAX_ZONE);
            hnum = hnumTL;
        } else if (zone > MAX_ZONE) {
            zone = MAX_ZONE;
        } else if (outputType !== 'idle' && outputType !== 'idle_combo') {
            // Active run beats time-skip — account for time spent climbing zones
            const timeSec = (zone - zoneTL) / 8050 * 3600;
            ctx.comboTime = Math.max(0, Math.log10(timeSec));
            gilds = Math.max(gilds, Math.floor(zone / 10 - 10));
            ctx.gildBonus = Math.log10(gilds);
            hnum = heroReached(effectiveLgHS, hnum, ctx);
            zone = Math.min(zoneReached(effectiveLgHS, hnum, ctx), MAX_ZONE);
        }

        const goldBonus = zone > zoneTL ? Math.min(306, cps) : ctx.xylBonus;
        const hlevel = (
            zone * LOG10_GOLD_SCALE + 1.5 * effectiveLgHS + HS_GOLD_ADJUST + GOLD_BONUS_140
            - heroLv1Cost(hnum) + goldBonus - Math.log10(15)
        ) / Math.log10(heroCostScale(hnum));

        const lghsEnd = (zone / 5 - 20) * Math.log10(1 + tp)
            + Math.log10(20 * (1 + tp) / tp)
            + ponyBonus
            - (ancientSouls >= 21000 ? Math.log10(zone > 1e6 ? 400 : 20) : 0);

        const lghsChange = lghsEnd - lghsCurrent > 50
            ? lghsEnd - lghsCurrent
            : Math.log10(1 + Math.pow(10, lghsEnd - lghsCurrent));

        // Duration calculation (accounts for slowed zones past the borb limit)
        // let durationSeconds = 0;
        // if (zone > ctx.borbLimit + 499) {
        //     const flatZones = Math.max(0, ctx.borbLimit - zoneTL);
        //     const n         = zone - ctx.borbLimit;
        //     const highZones = n + (n * n) / 10830;
        //     const j         = ctx.borbLimit < zoneTL ? zoneTL - ctx.borbLimit : 0;
        //     const preTLMax  = j + (j * j) / 10830;
        //     durationSeconds = Math.max(0, Math.ceil((flatZones + highZones - preTLMax) / 8050 * 3600));
        //     if (!ctx.borbLimitReached) {
        //         ctx.totalDuration   += Math.floor((ctx.borbLimit + 500 - zoneTL) / 8050 * 3600);
        //         ctx.borbLimitReached = true;
        //     }
        // } else if (zone > zoneTL) {
        //     durationSeconds    = Math.max(0, Math.floor((zone - zoneTL) / 8050 * 3600));
        //     ctx.totalDuration += durationSeconds;
        // }

        let durationSeconds = Math.max(0, Math.floor((zone - zoneTL) / 8050 * 3600));
        ctx.totalDuration += durationSeconds;

        const cplActive     = calcAverageCPL(zoneTL, zone,         borb);
        const cplIdle       = calcAverageCPL(zoneTL, zoneIdle,     borb);
        const cplIdleCombo  = calcAverageCPL(zoneTL, zoneIdleCombo, borb);

        const idleDuration      = Math.max(0, Math.floor((zoneIdle      - zoneTL) / 8050 * 3600 * cplIdle      / 2));
        const idleComboRaw      = Math.max(0, Math.floor((zoneIdleCombo - zoneTL) / 8050 * 3600 * cplIdleCombo / 2));
        // Add 60s overhead for every 3m40s (220s) of idle+combo push time (combo cooldown cost)
        const idleComboDuration = Math.round(idleComboRaw + Math.floor(idleComboRaw / 220) * 62.7);

        // Scale active duration by CPL multiplier
        durationSeconds = Math.max(0, Math.round(durationSeconds * cplActive / 2));

        results.push({
            runNumber:            run,
            blackEggsStart:       lghsCurrent.toFixed(2),
            farmer:               heroName(hnum),
            level:                zone.toFixed(0),
            farmerLevel:          hlevel.toFixed(0),
            blackEggsIncrease:    lghsChange.toFixed(2),
            timeSkipMaxLevel:     zoneTL.toFixed(0),
            timeSkipDuration:     formatTime(durationSeconds),
            idleLevel:            zoneIdle.toFixed(0),
            idleRunDuration:      formatTime(idleDuration),
            idleComboLevel:       zoneIdleCombo.toFixed(0),
            idleComboRunDuration: formatTime(idleComboDuration),
            cumulativeDuration:   formatTime(ctx.totalDuration),
            activeDurationRaw:    durationSeconds,
            idleDurationRaw:      idleDuration,
            idleComboDurationRaw: idleComboDuration,
        });

        if (zone >= MAX_ZONE) break;

        lghsCurrent += lghsChange;
        startHnum    = hnum;
        startTLHnum  = hnumTL;
    }

    console.log(`Runs: ${results.length} | Total active duration: ${formatTime(ctx.totalDuration)}`);
    return results;
}
