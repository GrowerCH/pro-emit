// ========================================================= Init

function initElements() {

    $("[data-toggle=popover]").popover();

    INPUT_AREA_LENGTH.addEventListener("input", updateAreaOutput);
    INPUT_AREA_WIDTH.addEventListener("input", updateAreaOutput);


    INPUT_PPFD.addEventListener("input", updatePPFDOutput);
    INPUT_PPFD.addEventListener("change", generateTable);

    INPUT_EFFICIENCY.addEventListener("input", setOutputEfficiency);
    INPUT_EFFICIENCY.addEventListener("change", generateTable);

    SELECT_CCT.addEventListener("change", generateTable);

    INPUT_VEGETATION_DAYS.addEventListener("input", generateTable);
    INPUT_FLOWERING_DAYS.addEventListener("input", generateTable);
}

function generateTable() {
    updateTable(TABLE_SPECS, PRODUCT_LIST, INPUT_AREA_LENGTH.value, INPUT_AREA_WIDTH.value, INPUT_PPFD.value,
        INPUT_EFFICIENCY.value, SELECT_CCT.value, getGrowHours());
}

// ========================================================= Area

let INPUT_AREA_LENGTH = document.getElementById("INPUT_AREA_LENGTH");
let INPUT_AREA_WIDTH = document.getElementById("INPUT_AREA_WIDTH");
let OUTPUT_AREA = document.getElementById("OUTPUT_AREA");

function updateAreaOutput() {
    OUTPUT_AREA.value = (INPUT_AREA_LENGTH.value * INPUT_AREA_WIDTH.value).toFixed(2);
    generateTable();
}

// ========================================================= PPFD

let INPUT_PPFD = document.getElementById("INPUT_PPFD");
let OUTPUT_PPFD = document.getElementById("OUTPUT_PPFD");

function updatePPFDOutput() {
    OUTPUT_PPFD.value = INPUT_PPFD.value;
}

// ========================================================= Efficiency

let INPUT_EFFICIENCY = document.getElementById("INPUT_EFFICIENCY");
let OUTPUT_EFFICIENCY = document.getElementById("OUTPUT_EFFICIENCY");

function setOutputEfficiency() {
    OUTPUT_EFFICIENCY.value = INPUT_EFFICIENCY.value;
}

function setEfficiencyInputRange(min, max) {
    INPUT_EFFICIENCY.min = min;
    INPUT_EFFICIENCY.max = max;
    INPUT_EFFICIENCY.value = min;
    OUTPUT_EFFICIENCY.value = min;
}

// ========================================================= Color

let SELECT_CCT = document.getElementById("SELECT_CCT");

function setCCTSelectOptions(values, defaultValue) {
    values.sort();
    for (let value of values) {
        let option = document.createElement("OPTION");
        option.text = value;
        if (value == defaultValue) {
            option.selected = true;
        }
        SELECT_CCT.add(option);
    }
}

// ========================================================= Usage

let INPUT_VEGETATION_DAYS = document.getElementById("INPUT_VEGETATION_DAYS");
let INPUT_FLOWERING_DAYS = document.getElementById("INPUT_FLOWERING_DAYS");

function getGrowHours() {
    return INPUT_VEGETATION_DAYS.value * 18 + INPUT_FLOWERING_DAYS.value * 12;
}

// ========================================================= TABLE

let TABLE_SPECS = document.getElementById("TABLE_SPECS");