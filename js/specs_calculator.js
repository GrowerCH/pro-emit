function calculateTableSpecs(product, version, ppfdInput, areaInput, usageInput) {

    let wattage = product["wattage"];

    let lumen = version["lumen"];
    let lux = lumen / areaInput;
    let ppf = version["ppf"];
    let ppfd = ppf / areaInput;

    let price = product["price"];

    let driver = product["driver"];

    //-----------------------------

    let amount = Math.round(ppfdInput / ppfd);
    if (amount === 0) {
        amount++;
    }

    let totalWattage = wattage * amount;

    let totalLumen = lumen * amount;
    let totalLux = lux * amount;
    let totalPPF = ppf * amount;
    let totalPPFD = ppfd * amount;

    let lumenEfficiency = totalLumen / totalWattage;
    let ppfEfficiency = totalPPF / totalWattage;

    let totalPrice = price * amount;

    let electricityCosts = totalWattage / 1000 * usageInput * 0.30;
    let expensesAfter5Years = totalPrice + electricityCosts * 5;

    return {
        amount: amount,
        wattage: Math.round(totalWattage),
        lumen: Math.round(totalLumen),
        lux: Math.round(totalLux),
        lumenEfficiency: Math.round(lumenEfficiency),
        ppf: Math.round(totalPPF),
        ppfd: Math.round(totalPPFD),
        ppfEfficiency: ppfEfficiency.toFixed(2),
        price: Math.round(totalPrice),
        electricityCosts: Math.round(electricityCosts),
        expensesAfter5Years: Math.round(expensesAfter5Years),
        driver: driver
    };
}
