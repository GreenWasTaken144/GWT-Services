(function (global) {
  "use strict";

  function isMobileDevice() {
    var userAgent =
      global.navigator && global.navigator.userAgent ? global.navigator.userAgent : "";
    var width =
      global.innerWidth ||
      (global.document && global.document.documentElement
        ? global.document.documentElement.clientWidth
        : 1200);

    return (
      /Android|iPhone|iPad|iPod|IEMobile|Opera Mini|Mobile/i.test(userAgent) ||
      width <= 768
    );
  }

  function hideMainContent() {
    var selectors = [
      ".gs-heading-container",
      ".container",
      ".disclaimer"
    ];

    selectors.forEach(function (selector) {
      var element = global.document.querySelector(selector);
      if (element) {
        element.style.display = "none";
      }
    });

    if (global.document.body) {
      global.document.body.style.overflow = "hidden";
    }
  }

  function showMobileRestriction() {
    if (!global.document || !global.document.body) {
      return false;
    }

    if (!isMobileDevice()) {
      var existingOverlay = global.document.getElementById("mobile-restriction-overlay");
      if (existingOverlay) {
        existingOverlay.remove();
      }

      var selectors = [
        ".gs-heading-container",
        ".container",
        ".disclaimer"
      ];

      selectors.forEach(function (selector) {
        var element = global.document.querySelector(selector);
        if (element) {
          element.style.display = "";
        }
      });

      global.document.body.style.overflow = "";
      return false;
    }

    var existingOverlay = global.document.getElementById("mobile-restriction-overlay");
    if (existingOverlay) {
      return true;
    }

    hideMainContent();

    var overlay = global.document.createElement("div");
    overlay.id = "mobile-restriction-overlay";
    overlay.setAttribute("role", "alertdialog");
    overlay.setAttribute("aria-live", "assertive");
    overlay.style.cssText = [
      "position: fixed",
      "inset: 0",
      "z-index: 2147483647",
      "display: grid",
      "place-items: center",
      "padding: 24px",
      "box-sizing: border-box",
      "background: rgba(10, 10, 10, 0.96)",
      "color: #ffffff",
      "font-family: system-ui, sans-serif",
      "text-align: center"
    ].join(";");

    var box = global.document.createElement("div");
    box.style.maxWidth = "540px";
    box.style.width = "100%";
    box.style.padding = "32px 24px";
    box.style.boxSizing = "border-box";

    var heading = global.document.createElement("h1");
    heading.id = "mobile-restriction-title";
    heading.textContent = "Mobile devices aren't supported yet";
    heading.style.margin = "0 0 16px";
    heading.style.fontSize = "clamp(2rem, 6vw, 3rem)";
    heading.style.color = "#00ff00";

    var message = global.document.createElement("p");
    message.textContent =
      "This website is currently designed for desktop use only. Please open it on a computer for the best experience.";
    message.style.margin = "0";
    message.style.fontSize = "1.1rem";
    message.style.lineHeight = "1.6";

    box.appendChild(heading);
    box.appendChild(message);
    overlay.appendChild(box);
    global.document.body.appendChild(overlay);

    return true;
  }

  global.MobileRestriction = {
    isMobileDevice: isMobileDevice,
    show: showMobileRestriction
  };

  if (global.document.readyState === "loading") {
    global.document.addEventListener("DOMContentLoaded", function () {
      showMobileRestriction();
    }, { once: true });
  } else {
    showMobileRestriction();
  }
})(window);
