/* =========================================================
   BALI TRAVEL CALCULATOR
   DATA: CURRENCY REGISTRY
   =========================================================
   RESPONSIBILITY
   ---------------------------------------------------------
   - Menyimpan daftar mata uang yang didukung aplikasi.
   - Menyediakan metadata mata uang.
   - Menyediakan helper untuk membaca registry.
   - TIDAK menyimpan exchange rate.
   - TIDAK melakukan request internet.
   - TIDAK melakukan kalkulasi konversi.
   ========================================================= */

const CurrencyData = Object.freeze({

    /* =====================================================
       DEFAULT CURRENCY
       ===================================================== */

    defaultCurrency: "IDR",


    /* =====================================================
       SUPPORTED CURRENCIES
       ===================================================== */

    currencies: Object.freeze([

        Object.freeze({
            code: "IDR",
            name: "Indonesian Rupiah",
            symbol: "Rp"
        }),

        Object.freeze({
            code: "USD",
            name: "US Dollar",
            symbol: "$"
        }),

        Object.freeze({
            code: "EUR",
            name: "Euro",
            symbol: "€"
        }),

        Object.freeze({
            code: "GBP",
            name: "British Pound",
            symbol: "£"
        }),

        Object.freeze({
            code: "AUD",
            name: "Australian Dollar",
            symbol: "A$"
        }),

        Object.freeze({
            code: "SGD",
            name: "Singapore Dollar",
            symbol: "S$"
        }),

        Object.freeze({
            code: "MYR",
            name: "Malaysian Ringgit",
            symbol: "RM"
        }),

        Object.freeze({
            code: "JPY",
            name: "Japanese Yen",
            symbol: "¥"
        }),

        Object.freeze({
            code: "CNY",
            name: "Chinese Yuan",
            symbol: "¥"
        }),

        Object.freeze({
            code: "KRW",
            name: "South Korean Won",
            symbol: "₩"
        }),

        Object.freeze({
            code: "THB",
            name: "Thai Baht",
            symbol: "฿"
        })

    ]),


    /* =====================================================
       FIND CURRENCY
       ===================================================== */

    get(code) {

        if (typeof code !== "string") {
            return null;
        }

        const normalizedCode =
            code.trim().toUpperCase();

        if (!normalizedCode) {
            return null;
        }

        return this.currencies.find(
            currency =>
                currency.code === normalizedCode
        ) || null;
    },


    /* =====================================================
       CHECK SUPPORTED CURRENCY
       ===================================================== */

    has(code) {

        return this.get(code) !== null;
    },


    /* =====================================================
       GET ALL CURRENCIES
       ===================================================== */

    getAll() {

        return this.currencies.map(
            currency => ({ ...currency })
        );
    },


    /* =====================================================
       GET CURRENCY LABEL
       Example:
       IDR — Indonesian Rupiah
       ===================================================== */

    getLabel(code) {

        const currency = this.get(code);

        if (!currency) {
            return "";
        }

        return `${currency.code} — ${currency.name}`;
    },


    /* =====================================================
       GET CURRENCY CODE LIST
       ===================================================== */

    getCodes() {

        return this.currencies.map(
            currency => currency.code
        );
    }

});