/* =========================================================
   BALI TRAVEL CALCULATOR
   AD SERVICE
   ========================================================= */

const BaliTravelAds = {

    /* Provider integration is intentionally deferred. */
    provider: null,

    sessionVideoShown: false,


    /* =====================================================
       INITIALIZATION
       ===================================================== */

    init() {

        this.initBannerSlots();
        this.initSessionVideoAd();

    },


    /* =====================================================
       BANNER AD
       Persistent banner slots remain in the HTML contract.
       ===================================================== */

    initBannerSlots() {

        document.querySelectorAll('[data-ad-slot="BANNER_AD"]').forEach(slot => {

            slot.dataset.provider = this.provider || "none";

            if (this.provider) {
                slot.classList.remove("ad-disabled");
                slot.dataset.status = "ready";
            } else {
                slot.classList.add("ad-disabled");
                slot.dataset.status = "disabled";
            }

        });

    },


    /* =====================================================
       SESSION VIDEO AD
       Triggered only after Currency succeeds.
       Maximum once per browser/app session.
       ===================================================== */

    initSessionVideoAd() {

        this.sessionVideoShown =
            sessionStorage.getItem("PENGGILAS_SESSION_VIDEO_AD_SHOWN") === "1";

    },


    triggerSessionVideoAd() {

        if (this.sessionVideoShown) {
            return false;
        }

        this.sessionVideoShown = true;

        sessionStorage.setItem(
            "PENGGILAS_SESSION_VIDEO_AD_SHOWN",
            "1"
        );

        /*
         * Future provider integration listens for this event.
         * No video is shown directly by the application yet.
         */
        document.dispatchEvent(
            new CustomEvent("penggilas:session-video-ad", {
                detail: {
                    slotId: "SESSION_VIDEO_AD",
                    provider: this.provider
                }
            })
        );

        return true;

    }

};

window.BaliTravelAds = BaliTravelAds;
