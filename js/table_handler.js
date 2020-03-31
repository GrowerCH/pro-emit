function createTable(table) {
    let head = table.createTHead();

    let headRow = head.insertRow();

    for (let spec of SPEC_LIST) {
        let headCell = document.createElement("TH");
        headCell.innerText = spec.name;
        headRow.appendChild(headCell);
    }
}

function updateTable(table, products, lengthInput, widthInput, ppfdInput, efficiencyInput, cctInput, usageInput) {

    for (let body of table.tBodies) {
        body.remove();
    }

    let body = table.createTBody();

    let columnCount = table.tHead.rows[0].cells.length;

    for (let product of products) {

        for (let version of product["versions"]) {

            if (version["cct"] != cctInput) {
                continue;
            }

            let tableSpecs = calculateTableSpecs(product, version, ppfdInput, lengthInput * widthInput, usageInput);

            if (tableSpecs.ppfEfficiency < efficiencyInput) {
                continue;
            }

            let dimensions = product["dimensions"];
            let maxAmount = lengthInput * 1000 / dimensions["length"] * widthInput * 1000 / dimensions["width"];
            if (tableSpecs.amount > maxAmount) {
                continue;
            }

            createHeaderRow(body, product, columnCount);
            createSpecsRow(body, tableSpecs);

        }
    }
}

function createHeaderRow(body, product, columnCount) {
    let row = body.insertRow();
    let cell = row.insertCell();

    cell.className = "text-center";
    cell.colSpan = columnCount;

    let divider = document.createElement("P");
    divider.innerText = " ";

    let urlText = document.createElement("A");
    urlText.innerText = product["name"];
    urlText.href += product["url"];
    urlText.target = "_blank";

    let ledText = document.createElement("SPAN");
    ledText.innerText = " mit " + product["led"];

    cell.appendChild(divider);
    cell.appendChild(urlText);
    cell.appendChild(ledText);
}

function createSpecsRow(body, tableSpecs) {
    let row = body.insertRow();
    let i = 0;
    for (let spec of Object.values(tableSpecs)) {
        addCell(row, spec + " " + SPEC_LIST[i].unit);
        i++;
    }
}

function addCell(row, text) {
    let cell = row.insertCell();
    cell.innerText = text.includes("NaN") ? "" : text;
}