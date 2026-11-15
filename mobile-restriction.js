/*
 * Mobile restriction screen
 *
 * This file is intentionally not connected to any HTML page yet. When the
 * mobile experience is ready to be restricted, load this file from the page
 * and call showMobileRestriction() where appropriate.
 */
(function (global) {
  "use strict";

  function isMobileDevice() {
    return (
      /Android|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(
        global.navigator.userAgent
      ) || global.matchMedia("(max-width: 768px)").matches
    );
  }

  function showMobileRestriction() {
    if (!isMobileDevice() || !global.document.body) {
      return false;
    }

    var overlay = global.document.createElement("main");
    overlay.setAttribute("role", "alert");
    overlay.setAttribute("aria-labelledby", "mobile-restriction-title");
    overlay.style.cssText = [
      "position: fixed",
      "inset: 0",
      "z-index: 99999",
      "display: grid",
      "place-items: center",
      "padding: 24px",
      "box-sizing: border-box",
      "background: #101820",
      "color: #ffffff",
      "font-family: system-ui, sans-serif",
      "text-align: center"
    ].join(";");

    var content = global.document.createElement("div");
    var heading = global.document.createElement("h1");
    heading.id = "mobile-restriction-title";
    heading.textContent = "Mobile devices aren't supported yet";

    var message = global.document.createElement("p");
    message.textContent =
      "This website is currently designed for desktop. Please visit on a computer for the best experience.";

    content.appendChild(heading);
    content.appendChild(message);
    overlay.appendChild(content);
    global.document.body.appendChild(overlay);

    return true;
  }

  global.MobileRestriction = {
    isMobileDevice: isMobileDevice,
    show: showMobileRestriction
  };
})(window);
