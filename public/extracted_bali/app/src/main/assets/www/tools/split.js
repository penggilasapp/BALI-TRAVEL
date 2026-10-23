/* =========================================================
   BALI TRAVEL CALCULATOR
   TOOL: SPLIT COST
   ---------------------------------------------------------
   RESPONSIBILITY:
   - Menghitung biaya per orang.
   - Membagi total biaya secara merata.
   - Tidak mengambil data internet.
   - Tidak mengelola navigasi SPA.
   ========================================================= */

const SplitCalculator = {

    /* =====================================================
       DOM ELEMENTS
       ===================================================== */

    elements: {},


    /* =====================================================
       INITIALIZATION
       ===================================================== */

    init() {

        this.cacheElements();

        if (!this.elements.calculate) {
            return;
        }

        this.bindEvents();

    },


    /* =====================================================
       CACHE DOM ELEMENTS
       ===================================================== */

    cacheElements() {

        this.elements.total =
            document.getElementById("split-total");

        this.elements.people =
            document.getElementById("split-people");

        this.elements.calculate =
            document.getElementById("btn-calc-split");

        this.elements.result =
            document.getElementById("split-result");

    },


    /* =====================================================
       EVENTS
       ===================================================== */

    bindEvents() {

        this.elements.calculate.addEventListener(
            "click",
            () => this.calculate()
        );

    },


    /* =====================================================
       CALCULATE
       ===================================================== */

    calculate() {

        const total =
            this.getNumber(
                this.elements.total
            );

        const people =
            this.getNumber(
                this.elements.people
            );


        /* =================================================
           VALIDATION — TOTAL
           ================================================= */

        if (total === null) {

            this.showError(
                "Please enter the total cost."
            );

            return;
        }


        if (total < 0) {

            this.showError(
                "Total cost cannot be negative."
            );

            return;
        }


        /* =================================================
           VALIDATION — PEOPLE
           ================================================= */

        if (people === null) {

            this.showError(
                "Please enter the number of people."
            );

            return;
        }


        if (
            people <= 0 ||
            !Number.isInteger(people)
        ) {

            this.showError(
                "Number of people must be a whole number greater than 0."
            );

            return;
        }


        /* =================================================
           CALCULATION
           ================================================= */

        const perPerson =
            total / people;


        /* =================================================
           UPDATE RESULT
           ================================================= */

        this.updateResult(
            perPerson
        );

    },


    /* =====================================================
       UPDATE RESULT
       ===================================================== */

    updateResult(perPerson) {

        if (!this.elements.result) {
            return;
        }

        this.elements.result.textContent =
            `Rp ${this.formatRupiah(perPerson)}`;

    },


    /* =====================================================
       READ NUMBER
       ===================================================== */

    getNumber(element) {

        if (!element) {
            return null;
        }


        const value =
            element.value.trim();


        if (value === "") {
            return null;
        }


        const number =
            Number(value);


        if (!Number.isFinite(number)) {
            return null;
        }


        return number;

    },


    /* =====================================================
       RUPIAH FORMAT
       ===================================================== */

    formatRupiah(number) {

        return Math.round(number)
            .toLocaleString("id-ID");

    },


    /* =====================================================
       ERROR
       ===================================================== */

    showError(message) {

        window.alert(message);

    }

};


/* =========================================================
   START
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        SplitCalculator.init();

    }
);