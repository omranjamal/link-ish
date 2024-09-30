(function () {
  let enabled = false;

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === "stop") {
      window.stop();
    } else if (request.message === "enable") {
      enabled = true;
      console.debug("LINKISH: ENABLED.");
    } else if (request.message === "disable") {
      enabled = false;
    }
  });

  document.addEventListener("mousedown", (event) => {
    if (!enabled) {
      return;
    }

    let foundAnchor = false;
    let ancestor = event.srcElement;

    while (ancestor !== document.body) {
      if (ancestor.tagName === "A" && ancestor.href) {
        foundAnchor = true;
        console.debug("LINKISH: FOUND ANCHOR; Aborting.", ancestor);
        break;
      }

      ancestor = ancestor.parentElement;
    }

    if (!foundAnchor) {
      if (event.button === 0 && event.ctrlKey) {
        console.debug("LINKISH: SIGNALING ctrl");
        chrome.runtime.sendMessage({ action: "ctrl" });
      } else if (event.button === 1) {
        console.debug("LINKISH: SIGNALING mouse-center");
        chrome.runtime.sendMessage({ action: "mouse-center" });
      }
    }
  });

  chrome.runtime.sendMessage({ action: "init" });
})();
