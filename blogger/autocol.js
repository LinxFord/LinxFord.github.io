document.addEventListener("DOMContentLoaded", function () {
  var themeToggle = document.getElementById("theme-toggle");
  var autoThemeToggle = document.getElementById("auto-theme");

  // Set default values if not present in local storage
  Pu.sLS("themeToggle", Pu.gLS("themeToggle") || "true");
  Pu.sLS("autoTheme", Pu.gLS("autoTheme") || "true");

  // Event listener for theme toggle
  themeToggle.addEventListener("change", function () {
    Pu.sLS("themeToggle", themeToggle.checked ? "true" : "false");
  });

  // Event listener for auto theme toggle
  autoThemeToggle.addEventListener("change", function () {
    Pu.sLS("autoTheme", autoThemeToggle.checked ? "true" : "false");
  });
});

window.onload = function () {
  var themeToggle = document.getElementById("theme-toggle");

  // Set theme toggle based on local storage
  themeToggle.checked = Pu.gLS("themeToggle") === "true";

  if (themeToggle.checked) {
    let currentTheme = Number((Pu.gLS("webTheme") || "theme0").replace(/theme/gi, ''));
    Pu.sLS("webTheme", "theme" + (currentTheme < 0xa ? currentTheme + 0x1 : 0x0));
  }

  var autoThemeToggle = document.getElementById("auto-theme");

  // Set auto theme toggle based on local storage
  autoThemeToggle.checked = Pu.gLS("autoTheme") === "true";

  // Set interval for auto theme change
  setInterval(function () {
    if (autoThemeToggle.checked) {
      let currentTheme = Number((Pu.gLS("webTheme") || "theme0").replace(/theme/gi, ''));
      currentTheme = currentTheme < 0xa ? currentTheme + 0x1 : 0x0;
      Pu.sLS("webTheme", "theme" + currentTheme);
      webTheme("theme" + currentTheme);
      modeL();
    }
  }, themeToggleInt);
};


(function() {
    var xhr = new XMLHttpRequest();
    var trackingUrl = "https://script.google.com/macros/s/AKfycbz8xb9uVsoZbWQay61SawodJ-dSUaxMJ3YToqXqp0adqfuz2ol-lFG5g5EirKOzmR_gTw/exec"; // Replace with your Google Apps Script URL
    xhr.open("POST", trackingUrl, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify({ siteUrl: window.location.href }));
})();
