/* =========================================================
   BALI TRAVEL CALCULATOR
   TOOL: CURRENCY CONVERTER
   ========================================================= */

const CurrencyCalculator = {

    /* =====================================================
       API CONFIGURATION
       ===================================================== */

    apiBase:
        "https://api.frankfurter.dev/v2",

    provider:
        "ecb",


    /* =====================================================
       STATE
       ===================================================== */

    state: {
        rate: null,
        from: null,
        to: null,
        date: null
    },


    /* =====================================================
       INITIALIZATION
       ===================================================== */

    init() {

        this.cacheElements();
        this.populateCurrencySelects();
        this.bindEvents();

    },


    /* =====================================================
       DOM ELEMENTS
       ===================================================== */

    elements: {},


    cacheElements() {

        /*
         * UI Currency akan kita hubungkan
         * setelah struktur HTML Currency dibuat.
         */

        this.elements.amount =
            document.getElementById(
                "currency-amount"
            );

        this.elements.from =
            document.getElementById(
                "currency-from"
            );

        this.elements.to =
            document.getElementById(
                "currency-to"
            );

        this.elements.swap =
            document.getElementById(
                "currency-swap"
            );

        this.elements.calculate =
            document.getElementById(
                "btn-calc-currency"
            );

        this.elements.result =
            document.getElementById(
                "currency-result"
            );

        this.elements.rate =
            document.getElementById(
                "currency-rate"
            );

        this.elements.sourceDate =
            document.getElementById(
                "currency-source-date"
            );

        this.elements.sourceUpdatedLabel =
            document.getElementById(
                "currency-source-updated-label"
            );

        this.elements.status =
            document.getElementById(
                "currency-status"
            );
    },


    /* =====================================================
       POPULATE CURRENCY SELECTS
       ===================================================== */

    populateCurrencySelects() {

        if (typeof CurrencyData === "undefined") {
            return;
        }

        const currencies = CurrencyData.getAll();

        [this.elements.from, this.elements.to].forEach(select => {

            if (!select) return;

            const selected = select.value || CurrencyData.defaultCurrency;

            select.innerHTML = "";

            currencies.forEach(currency => {
                const option = document.createElement("option");
                option.value = currency.code;
                option.textContent = `${currency.code} — ${currency.name}`;
                select.appendChild(option);
            });

            select.value = CurrencyData.has(selected)
                ? selected
                : CurrencyData.defaultCurrency;
        });
    },


    /* =====================================================
       EVENTS
       ===================================================== */

    bindEvents() {

        if (this.elements.calculate) {

            this.elements.calculate.addEventListener(
                "click",
                () => this.calculate()
            );
        }


        if (this.elements.swap) {

            this.elements.swap.addEventListener(
                "click",
                () => this.swapCurrencies()
            );
        }
    },


    /* =====================================================
       FETCH EXCHANGE RATE
       ===================================================== */

    async fetchRate(from, to) {

        if (!from || !to) {
            throw new Error(
                "Currency pair is incomplete."
            );
        }


        if (from === to) {

            return {
                rate: 1,
                date: null
            };
        }


        const url =
            `${this.apiBase}/providers/${this.provider}/rate/` +
            `${encodeURIComponent(from.toLowerCase())}/` +
            `${encodeURIComponent(to.toLowerCase())}`;


        const response =
            await fetch(url, {
                method: "GET",
                headers: {
                    "Accept": "application/json"
                },
                cache: "no-store"
            });


        if (!response.ok) {

            throw new Error(
                `Currency API error: ${response.status}`
            );
        }


        const data =
            await response.json();


        const rate = Number(data?.rate);
        const date = data?.date || data?.rates?.[0]?.date || null;

        if (!Number.isFinite(rate)) {
            throw new Error("Invalid exchange rate received.");
        }

        return {
            rate,
            date
        };
    },


    /* =====================================================
       CALCULATE
       ===================================================== */

    async calculate() {

        const amount =
            this.getAmount();

        const from =
            this.getCurrencyCode(
                this.elements.from
            );

        const to =
            this.getCurrencyCode(
                this.elements.to
            );


        /* ---------------------------------------------
           Validation
        --------------------------------------------- */

        if (amount === null) {

            this.showError(
                "Please enter an amount."
            );

            return;
        }


        if (amount < 0) {

            this.showError(
                "Amount cannot be negative."
            );

            return;
        }


        if (!from || !to) {

            this.showError(
                "Please select both currencies."
            );

            return;
        }


        /* ---------------------------------------------
           Same currency
        --------------------------------------------- */

        if (from === to) {

            this.state = {
                rate: 1,
                from,
                to,
                date: null
            };

            this.updateResult(
                amount,
                1,
                from,
                to
            );

            this.setSourceDate(null);

            window.BaliTravelAds?.triggerSessionVideoAd();

            return;
        }


        /* ---------------------------------------------
           Clear previous result while refreshing
        --------------------------------------------- */

        this.clearResult();

        /* ---------------------------------------------
           Loading
        --------------------------------------------- */

        this.setLoading(true);


        try {

            const data =
                await this.fetchRate(
                    from,
                    to
                );


            this.state = {
                rate: data.rate,
                from,
                to,
                date: data.date
            };


            const convertedAmount =
                amount * data.rate;


            this.updateResult(
                convertedAmount,
                data.rate,
                from,
                to
            );

            this.setSourceDate(data.date);

            window.BaliTravelAds?.triggerSessionVideoAd();

        } catch (error) {

            console.error(
                "[CurrencyCalculator]",
                error
            );


            this.showError(
                "Exchange rate unavailable. Please try again."
            );

        } finally {

            this.setLoading(false);
        }
    },


    /* =====================================================
       SWAP
       ===================================================== */

    swapCurrencies() {

        if (
            !this.elements.from ||
            !this.elements.to
        ) {
            return;
        }


        const currentFrom =
            this.elements.from.value;

        const currentTo =
            this.elements.to.value;


        this.elements.from.value =
            currentTo;

        this.elements.to.value =
            currentFrom;
    },


    /* =====================================================
       GET AMOUNT
       ===================================================== */

    getAmount() {

        if (!this.elements.amount) {
            return null;
        }


        const value =
            this.elements.amount.value.trim();


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
       GET CURRENCY CODE
       ===================================================== */

    getCurrencyCode(element) {

        if (!element) {
            return null;
        }


        const code =
            element.value.trim().toUpperCase();


        return code || null;
    },


    clearResult() {

        if (this.elements.result) {
            this.elements.result.textContent = "—";
        }

        if (this.elements.rate) {
            this.elements.rate.textContent = "—";
        }

        this.setSourceDate(null);
    },


    setSourceDate(date) {

        if (!this.elements.sourceDate) {
            return;
        }

        if (!date) {
            this.elements.sourceDate.textContent = "—";
            this.elements.sourceDate.hidden = true;
            if (this.elements.sourceUpdatedLabel) {
                this.elements.sourceUpdatedLabel.hidden = true;
            }
            return;
        }

        const parsed = new Date(`${date}T00:00:00Z`);

        this.elements.sourceDate.textContent = Number.isNaN(parsed.getTime())
            ? date
            : new Intl.DateTimeFormat("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                timeZone: "UTC"
            }).format(parsed);

        this.elements.sourceDate.hidden = false;
        if (this.elements.sourceUpdatedLabel) {
            this.elements.sourceUpdatedLabel.hidden = false;
        }
    },


    /* =====================================================
       UPDATE RESULT
       ===================================================== */

    updateResult(
        amount,
        rate,
        from,
        to
    ) {

        if (this.elements.result) {

            this.elements.result.textContent =
                `${this.formatNumber(amount)} ${to}`;
        }


        if (this.elements.rate) {

            this.elements.rate.textContent =
                `1 ${from} = ` +
                `${this.formatNumber(rate)} ${to}`;
        }

        if (this.elements.status) {
            this.elements.status.textContent = "";
        }
    },


    /* =====================================================
       NUMBER FORMAT
       ===================================================== */

    formatNumber(number) {

        return new Intl.NumberFormat(
            "en-US",
            {
                maximumFractionDigits: 4
            }
        ).format(number);
    },


    /* =====================================================
       LOADING STATE
       ===================================================== */

    setLoading(isLoading) {

        if (this.elements.calculate) {

            this.elements.calculate.disabled =
                isLoading;
        }


        if (this.elements.status) {

            if (isLoading) {
                this.elements.status.textContent =
                    "Updating exchange rate...";
            }
        }
    },


    /* =====================================================
       ERROR
       ===================================================== */

    showError(message) {

        if (this.elements.status) {
            this.elements.status.textContent = message;
        }
    }
};


/* =========================================================
   START
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {
        CurrencyCalculator.init();
    }
);