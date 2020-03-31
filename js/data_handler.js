let PRODUCT_LIST;

function loadProducts() {
    return fetch("json/products.json")
        .then(productsFile => productsFile.json())
        .then(productsJson => PRODUCT_LIST = productsJson);
}

function getCCTValues(products) {
    let values = [];
    for (let product of products) {
        for (let version of product["versions"]) {
            let cct = version["cct"];
            if (!values.includes(cct)) {
                values.push(cct);
            }
        }
    }
    return values;
}

function getEfficiencyRange(products) {
    let range = {};
    range.max = -100;
    range.min = 100;

    for (let product of products) {

        let wattage = product["wattage"];

        for (let version of product["versions"]) {

            let ppf = version["ppf"];
            let efficiency = (Math.floor(ppf / wattage * 10) / 10).toFixed(1);

            if (efficiency > range.max) {
                range.max = efficiency;
            }
            if (efficiency < range.min) {
                range.min = efficiency;
            }
        }
    }
    return range;
}