/* =========================================================
   BALI TRAVEL CALCULATOR
   TOOL: FUEL COST CALCULATOR
   ========================================================= */

const FuelCalculator = {

    /* =====================================================
       ELEMENTS
       ===================================================== */

    elements: {
        distance: null,
        consumption: null,
        price: null,

        calculateButton: null,

        fuelResult: null,
        costResult: null
    },


    /* =====================================================
       INITIALIZATION
       ===================================================== */

    init() {

        this.cacheElements();

        if (!this.elements.calculateButton) {
            console.warn(
                "[FuelCalculator] Calculate button not found."
            );

            return;
        }

        this.bindEvents();
    },


    /* =====================================================
       CACHE DOM ELEMENTS
       ===================================================== */

    cacheElements() {

        this.elements.distance =
            document.getElementById("input-distance");

        this.elements.consumption =
            document.getElementById("input-consumption");

        this.elements.price =
            document.getElementById("input-price");

        this.elements.calculateButton =
            document.getElementById("btn-calc-fuel");

        this.elements.fuelResult =
            document.getElementById("res-fuel-req");

        this.elements.costResult =
            document.getElementById("res-fuel-cost");
    },


    /* =====================================================
       EVENT HANDLERS
       ===================================================== */

    bindEvents() {

        this.elements.calculateButton.addEventListener(
            "click",
            () => this.calculate()
        );
    },


    /* =====================================================
       CALCULATION
       ===================================================== */

    calculate() {

        const distance =
            this.getNumber(this.elements.distance);

        const consumption =
            this.getNumber(this.elements.consumption);

        const price =
            this.getNumber(this.elements.price);


        /* ---------------------------------------------
           Validation
        --------------------------------------------- */

        if (distance === null) {
            this.showError(
                "Please enter the travel distance."
            );
            return;
        }

        if (distance < 0) {
            this.showError(
                "Distance cannot be negative."
            );
            return;
        }


        if (consumption === null) {
            this.showError(
                "Please enter fuel consumption."
            );
            return;
        }

        if (consumption <= 0) {
            this.showError(
                "Fuel consumption must be greater than 0."
            );
            return;
        }


        if (price === null) {
            this.showError(
                "Please enter the fuel price."
            );
            return;
        }

        if (price < 0) {
            this.showError(
                "Fuel price cannot be negative."
            );
            return;
        }


        /* ---------------------------------------------
           Formula

           Fuel Required = Distance / Consumption

           Estimated Cost =
           Fuel Required × Fuel Price
        --------------------------------------------- */

        const fuelRequired =
            distance / consumption;

        const estimatedCost =
            fuelRequired * price;


        /* ---------------------------------------------
           Update UI
        --------------------------------------------- */

        this.updateResult(
            fuelRequired,
            estimatedCost
        );
    },


    /* =====================================================
       NUMBER PARSER
       ===================================================== */

    getNumber(input) {

        if (!input) {
            return null;
        }

        const value = input.value.trim();

        if (value === "") {
            return null;
        }

        const number = Number(value);

        if (!Number.isFinite(number)) {
            return null;
        }

        return number;
    },


    /* =====================================================
       UPDATE RESULT
       ===================================================== */

    updateResult(
        fuelRequired,
        estimatedCost
    ) {

        if (this.elements.fuelResult) {

            this.elements.fuelResult.textContent =
                `${fuelRequired.toFixed(2)} L`;
        }


        if (this.elements.costResult) {

            this.elements.costResult.textContent =
                `Rp ${this.formatRupiah(estimatedCost)}`;
        }
    },


    /* =====================================================
       RUPIAH FORMATTER
       ===================================================== */

    formatRupiah(number) {

        return Math.round(number)
            .toLocaleString("id-ID");
    },


    /* =====================================================
       ERROR HANDLING
       ===================================================== */

    showError(message) {

        /*
         * Untuk versi awal kita gunakan alert sederhana.
         * Nanti bisa diganti dengan inline validation
         * tanpa mengubah logic kalkulasinya.
         */

        window.alert(message);
    }
};


/* =========================================================
   START TOOL
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {
        FuelCalculator.init();
    }
);