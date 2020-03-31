const SPEC_LIST = [
    new Spec("Anzahl", "x"),
    new Spec("Leistung", "W"),
    new Spec("Lumen", "lm"),
    new Spec("Lux", "lx"),
    new Spec("Effizienz", "lm/W"),
    new Spec("PPF", "µmol/s"),
    new Spec("PPFD", "µmol/(m²s)"),
    new Spec("Effizienz", "µmol/J"),
    new Spec("Preis", "€"),
    new Spec("Stromk./Grow", "€"),
    new Spec("Ausgb. n. 5 Grows", "€"),
    new Spec("Treiber", "")
];

function Spec(name, unit) {
    this.name = name;
    this.unit = unit;
}