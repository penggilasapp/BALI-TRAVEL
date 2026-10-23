/* =========================================================
   BALI TRAVEL CALCULATOR
   TOOL: TRIP BUDGET
   ---------------------------------------------------------
   RESPONSIBILITY:
   - Menghitung estimasi budget perjalanan.
   - Menghitung budget harian.
   - Menghitung total budget berdasarkan jumlah hari.
   - Tidak mengambil data internet.
   - Tidak mengelola navigasi SPA.
   ========================================================= */

const BudgetCalculator = {

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

        this.elements.days =
            document.getElementById("budget-days");

        this.elements.accommodation =
            document.getElementById(
                "budget-accommodation"
            );

        this.elements.food =
            document.getElementById(
                "budget-food"
            );

        this.elements.transport =
            document.getElementById(
                "budget-transport"
            );

        this.elements.activities =
            document.getElementById(
                "budget-activities"
            );

        this.elements.misc =
            document.getElementById(
                "budget-misc"
            );

        this.elements.calculate =
            document.getElementById(
                "btn-calc-budget"
            );

        this.elements.dailyResult =
            document.getElementById(
                "budget-daily-result"
            );

        this.elements.totalResult =
            document.getElementById(
                "budget-total-result"
            );

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

        const days =
            this.getNumber(
                this.elements.days
            );

        const accommodation =
            this.getNumber(
                this.elements.accommodation
            );

        const food =
            this.getNumber(
                this.elements.food
            );

        const transport =
            this.getNumber(
                this.elements.transport
            );

        const activities =
            this.getNumber(
                this.elements.activities
            );

        const misc =
            this.getNumber(
                this.elements.misc
            );


        /* =================================================
           VALIDATION — DAYS
           ================================================= */

        if (days === null) {

            this.showError(
                "Please enter the number of days."
            );

            return;
        }


        if (days <= 0) {

            this.showError(
                "Number of days must be greater than 0."
            );

            return;
        }


        /* =================================================
           VALIDATION — BUDGET FIELDS
           ================================================= */

        const budgetValues = [
            accommodation,
            food,
            transport,
            activities,
            misc
        ];


        if (
            budgetValues.some(
                value => value === null
            )
        ) {

            this.showError(
                "Please complete all budget fields."
            );

            return;
        }


        /* =================================================
           VALIDATION — NEGATIVE VALUES
           ================================================= */

        if (
            budgetValues.some(
                value => value < 0
            )
        ) {

            this.showError(
                "Budget values cannot be negative."
            );

            return;
        }


        /* =================================================
           CALCULATION
           ================================================= */

        const dailyBudget =
            accommodation +
            food +
            transport +
            activities +
            misc;


        const totalBudget =
            dailyBudget * days;


        /* =================================================
           UPDATE RESULT
           ================================================= */

        this.updateResult(
            dailyBudget,
            totalBudget
        );

    },


    /* =====================================================
       UPDATE UI
       ===================================================== */

    updateResult(
        dailyBudget,
        totalBudget
    ) {

        if (this.elements.dailyResult) {

            this.elements.dailyResult.textContent =
                `Rp ${this.formatRupiah(dailyBudget)}`;

        }


        if (this.elements.totalResult) {

            this.elements.totalResult.textContent =
                `Rp ${this.formatRupiah(totalBudget)}`;

        }

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

        BudgetCalculator.init();

    }
);