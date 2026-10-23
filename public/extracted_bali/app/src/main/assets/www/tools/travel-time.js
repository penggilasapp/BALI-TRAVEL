/* =========================================================
   BALI TRAVEL CALCULATOR
   TOOL: TRAVEL TIME
   ========================================================= */

const TravelTimeCalculator = {

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
                "travel-time-distance"
            );

        this.elements.speed =
            document.getElementById(
                "travel-time-speed"
            );

        this.elements.calculate =
            document.getElementById(
                "btn-calc-travel-time"
            );

        this.elements.result =
            document.getElementById(
                "travel-time-result"
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

        const speed =
            this.getNumber(
                this.elements.speed
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
            speed === null ||
            speed <= 0
        ) {

            window.alert(
                "Speed must be greater than 0."
            );

            return;
        }


        /* ---------------------------------------------
           CALCULATION
           
           Time = Distance / Speed
           
           Result is expressed in hours.
        --------------------------------------------- */

        const totalHours =
            distance / speed;


        /* ---------------------------------------------
           CONVERT TO HOURS + MINUTES
        --------------------------------------------- */

        const hours =
            Math.floor(totalHours);

        const minutes =
            Math.round(
                (totalHours - hours) * 60
            );


        /* ---------------------------------------------
           HANDLE 60 MINUTES
        --------------------------------------------- */

        let finalHours = hours;
        let finalMinutes = minutes;


        if (finalMinutes === 60) {

            finalHours += 1;
            finalMinutes = 0;

        }


        /* ---------------------------------------------
           UPDATE RESULT
        --------------------------------------------- */

        this.elements.result.textContent =
            this.formatTime(
                finalHours,
                finalMinutes
            );

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
       TIME FORMAT
       ===================================================== */

    formatTime(hours, minutes) {

        if (
            hours === 0 &&
            minutes === 0
        ) {
            return "0 minutes";
        }


        if (hours === 0) {

            return `${minutes} min`;

        }


        if (minutes === 0) {

            return `${hours} hr`;

        }


        return `${hours} hr ${minutes} min`;

    }

};


/* =========================================================
   START
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {
        TravelTimeCalculator.init();
    }
);