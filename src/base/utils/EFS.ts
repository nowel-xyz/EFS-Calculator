import Decimal from 'decimal.js';


export function parseInput(input: string): Decimal {
    const units: { [key: string]: number } = {
        K: 1e3,  k: 1e3,   // Thousand
        M: 1e6,  m: 1e6,  // Million
        B: 1e9,  b: 1e9,  // Billion
        T: 1e12, t: 1e12, // Trillion
        q: 1e15,  // Quadrillion
        Q: 1e18,  // Quintillion
        s: 1e21,  // Sextillion
        S: 1e24,  // Septillion
        O: 1e27, o: 1e27,  // Octillion
        N: 1e30, n: 1e30, // Nonillion
        d: 1e33,  // Decillion
        U: 1e36, u: 1e36, // Undecillion
        D: 1e39   // Duodecillion
    };

    const regex = /^(\d+(?:,\d{3})*(\.\d+)?)([KMBTqQsSONdUD]?)$/;
    const match = input.replace(/,/g, '').match(regex);

    if (match) {
        const value = new Decimal(match[1]);
        const unit = match[3];
        if (unit && units.hasOwnProperty(unit)) {
            return value.times(units[unit]);
        }
        return value;
    }
    throw new Error("Invalid input format");
}



// Convert a Decimal to scientific notation
export function convertToScientific(decimal: Decimal): string {
    return decimal.toExponential(3).replace("e+", "e");
}


export function parseScientific(input: string): Decimal {
    try {
        return new Decimal(input);
    } catch (error) {
        throw new Error("Invalid scientific notation format");
    }
}


// Calculate the number of golden eggs needed for a given RP percentage
export function calculateGoldenEggsForRP(rp: number): Decimal {
    if (rp > 25 || rp <= 0) {
        throw new Error("RP percentage must be between 0 and 25.");
    }
    const lnPart = new Decimal(25).minus(rp).dividedBy(23).ln();
    return lnPart.dividedBy(-0.0003);
}

// Calculate Rebirth Power percentage based on the formula
export function calculateRP(goldenEggs: Decimal): number {
    const ge = goldenEggs.toNumber();
    const rp = 25 - 23 * Math.exp(-0.0003 * ge);
    return Math.min(rp, 25);  // Max percentage is 25%
}