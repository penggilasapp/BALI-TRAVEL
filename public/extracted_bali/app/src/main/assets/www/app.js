/* =========================================================
   BALI TRAVEL CALCULATOR
   MAIN APPLICATION
   ========================================================= */

const BaliTravelApp = {

    currentPage: "page-home",


    /* =====================================================
       INITIALIZATION
       ===================================================== */

    init() {

        this.bindNavigation();
        this.bindHistory();
        this.bindTabs();
        this.bindSettings();
        window.BaliTravelAds?.init();

        // Establish the SPA home state without creating an extra
        // browser-history entry. This lets Android/browser Back
        // return from a calculator to Home instead of exiting.
        history.replaceState(
            { baliTravelPage: "page-home" },
            "",
            location.href
        );

    },


    /* =====================================================
       NAVIGATION
       ===================================================== */

    bindNavigation() {

        const navigationButtons =
            document.querySelectorAll(
                "[data-target]"
            );


        navigationButtons.forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const target =
                        button.dataset.target;

                    if (!target) {
                        return;
                    }

                    // Tool headers use browser history for their Back
                    // action. This keeps Android Back and in-app Back
                    // on the same navigation path.
                    if (button.classList.contains("btn-back")) {
                        if (this.currentPage !== "page-home") {
                            history.back();
                        }
                        return;
                    }

                    this.showPage(target, true);

                }
            );

        });

    },


    bindHistory() {

        window.addEventListener("popstate", event => {

            const pageId =
                event.state?.baliTravelPage ||
                "page-home";

            this.showPage(pageId, false);

        });

    },


    /* =====================================================
       SHOW PAGE
       ===================================================== */

    showPage(pageId, addHistory = false) {

        const targetPage =
            document.getElementById(pageId);

        if (!targetPage) {
            return;
        }


        const pages =
            document.querySelectorAll(
                ".app-page"
            );


        pages.forEach(page => {

            page.classList.remove("active");

        });


        targetPage.classList.add("active");

        // Navigation must never carry an open modal/backdrop
        // into another calculator page.
        const settingsModal = document.getElementById("settings-modal");
        if (settingsModal) {
            settingsModal.hidden = true;
            settingsModal.setAttribute("aria-hidden", "true");
        }

        this.currentPage =
            pageId;

        if (addHistory &&
            pageId !== "page-home" &&
            history.state?.baliTravelPage !== pageId) {

            history.pushState(
                { baliTravelPage: pageId },
                "",
                location.href
            );

        }


        window.scrollTo({
            top: 0,
            behavior: "instant"
        });

    },


    /* =====================================================
       SETTINGS
       ===================================================== */

    bindSettings() {

        const openButton = document.getElementById("btn-settings");
        const closeButton = document.getElementById("btn-close-settings");
        const resetButton = document.getElementById("btn-reset-app");
        const modal = document.getElementById("settings-modal");

        if (!openButton || !modal) return;

        const close = () => {
            modal.hidden = true;
            modal.setAttribute("aria-hidden", "true");
        };

        openButton.addEventListener("click", () => {
            modal.hidden = false;
            modal.setAttribute("aria-hidden", "false");
            closeButton?.focus();
        });

        closeButton?.addEventListener("click", close);

        modal.addEventListener("click", event => {
            if (event.target === modal) close();
        });

        document.addEventListener("keydown", event => {
            if (event.key === "Escape" && !modal.hidden) close();
        });

        resetButton?.addEventListener("click", () => {
            document.querySelectorAll(".app-page input").forEach(input => {
                input.value = "";
            });
            document.querySelectorAll(".app-page select").forEach(select => {
                const defaultOption = select.querySelector("option[selected]");
                select.value = defaultOption ? defaultOption.value : select.options[0]?.value || "";
            });
            document.querySelectorAll(".app-page .result-value").forEach(result => {
                const id = result.id;
                if (id === "res-fuel-req") result.textContent = "—";
                else if (id === "res-fuel-cost") result.textContent = "—";
                else if (id === "currency-result") result.textContent = "—";
                else if (id === "currency-rate") result.textContent = "—";
                else if (id === "budget-daily-result") result.textContent = "—";
                else if (id === "budget-total-result") result.textContent = "—";
                else if (id === "split-result") result.textContent = "—";
                else if (id === "travel-time-result") result.textContent = "—";
                else if (id === "distance-speed-result") result.textContent = "—";
            });
            const sourceDate = document.getElementById("currency-source-date");
            if (sourceDate) { sourceDate.textContent = "—"; sourceDate.hidden = true; }
            const sourceUpdatedLabel = document.getElementById("currency-source-updated-label");
            if (sourceUpdatedLabel) sourceUpdatedLabel.hidden = true;
            const currencyStatus = document.getElementById("currency-status");
            if (currencyStatus) currencyStatus.textContent = "";
            close();
        });
    },


    /* =====================================================
       TABS
       ===================================================== */

    bindTabs() {

        const tabButtons =
            document.querySelectorAll(
                ".tab-btn"
            );


        tabButtons.forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const tabId =
                        button.dataset.tab;

                    if (!tabId) {
                        return;
                    }

                    this.activateTab(
                        button,
                        tabId
                    );

                }
            );

        });

    },


    /* =====================================================
       ACTIVATE TAB
       ===================================================== */

    activateTab(
        activeButton,
        tabId
    ) {

        const tabContainer =
            activeButton.closest(
                ".tab-container"
            );


        if (!tabContainer) {
            return;
        }


        const buttons =
            tabContainer.querySelectorAll(
                ".tab-btn"
            );


        buttons.forEach(button => {

            const isActive =
                button === activeButton;

            button.classList.toggle(
                "active",
                isActive
            );

            button.setAttribute(
                "aria-selected",
                String(isActive)
            );

        });


        const page =
            activeButton.closest(
                ".app-page"
            );


        if (!page) {
            return;
        }


        const contents =
            page.querySelectorAll(
                ".tab-content"
            );


        contents.forEach(content => {

            content.classList.toggle(
                "active",
                content.id === tabId
            );

        });

    }

};


window.BaliTravelApp = BaliTravelApp;


/* =========================================================
   START APPLICATION
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        BaliTravelApp.init();

    }
);