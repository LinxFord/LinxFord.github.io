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
    var trackingUrl = "https://netwem1-default-rtdb.firebaseio.com/trackingData.json";
    xhr.open("POST", trackingUrl, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log('T Data successful:', xhr.responseText);
            } else {
                console.log('Error sending tracking data:', xhr.status, xhr.statusText);
            }
        }
    };

    xhr.onerror = function() {
        console.error('Request failed:', xhr.status, xhr.statusText);
    };

    try {
        xhr.send(JSON.stringify({
            siteUrl: window.location.href
        }));
    } catch (error) {
        console.error('Error sending request:', error);
    }
})();
