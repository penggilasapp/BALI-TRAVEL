/* =========================================================
   BALI TRAVEL CALCULATOR
   TOOL: DISTANCE & SPEED
   ========================================================= */

const DistanceSpeedCalculator = {

    elements: {},


    /* =====================================================
       INITIALIZATION
       ===================================================== */

    init() {

        this.cacheElements();
        this.bindEvents();

    },


    /* =====================================================
       DOM ELEMENTS
       ===================================================== */

    cacheElements() {

        this.elements.distance =
            document.getElementById(
                "distance-speed-distance"
            );

        this.elements.time =
            document.getElementById(
                "distance-speed-time"
            );

        this.elements.calculate =
            document.getElementById(
                "btn-calc-distance-speed"
            );

        this.elements.result =
            document.getElementById(
                "distance-speed-result"
            );

    },


    /* =====================================================
       EVENTS
       ===================================================== */

    bindEvents() {

        if (!this.elements.calculate) {
            return;
        }

        this.elements.calculate.addEventListener(
            "click",
            () => this.calculate()
        );

    },


    /* =====================================================
       CALCULATE
       ===================================================== */

    calculate() {

        const distance =
            this.getNumber(
                this.elements.distance
            );

        const time =
            this.getNumber(
                this.elements.time
            );


        /* ---------------------------------------------
           VALIDATION
        --------------------------------------------- */

        if (
            distance === null ||
            distance < 0
        ) {

            window.alert(
                "Please enter a valid distance."
            );

            return;
        }


        if (
            time === null ||
            time <= 0
        ) {

            window.alert(
                "Time must be greater than 0."
            );

            return;
        }


        /* ---------------------------------------------
           CALCULATION

           Speed = Distance / Time

           Distance : km
           Time     : hours
           Speed    : km/h
        --------------------------------------------- */

        const speed =
            distance / time;


        /* ---------------------------------------------
           UPDATE RESULT
        --------------------------------------------- */

        this.elements.result.textContent =
            `${this.formatNumber(speed)} km/h`;

    },


    /* =====================================================
       NUMBER READER
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
       NUMBER FORMAT
       ===================================================== */

    formatNumber(number) {

        return new Intl.NumberFormat(
            "en-US",
            {
                maximumFractionDigits: 2
            }
        ).format(number);

    }

};


/* =========================================================
   START
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {
        DistanceSpeedCalculator.init();
    }
);