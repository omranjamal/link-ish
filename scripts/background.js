chrome.runtime.onInstalled.addListener(() => {
  console.log("Link-ish Installed.");
});

let newTabNavigation = false;
let newTabNavigationTimeout = setTimeout(() => {}, 0);

function resolveActionIcon() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    const activeTabURL = new URL(activeTab.url);
    const activeTabHost = activeTabURL.host;
    const activeTabProtocol = activeTabURL.protocol;

    chrome.storage.local.get([activeTabHost], (result) => {
      const isEnabled = !!result[activeTabHost];

      chrome.action.setIcon(
        {
          path: {
            128: isEnabled ? "../assets/enabled.png" : "../assets/disabled.png",
          },
        },
        () => {}
      );
    });
  });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "mouse-center" || request.action === "ctrl") {
    clearTimeout(newTabNavigationTimeout);

    newTabNavigation = true;

    newTabNavigationTimeout = setTimeout(() => {
      newTabNavigation = false;
    }, 1_000);
  } else if (request.action === "init") {
    const tab = sender.tab;
    const tabURL = new URL(tab.url);
    const tabHost = tabURL.host;
    const tabProtocol = tabURL.protocol;

    if (tabProtocol !== "http:" && tabProtocol !== "https:") {
      return;
    }

    chrome.storage.local.get([tabHost], (result) => {
      const isEnabled = !!result[tabHost];

      chrome.tabs.sendMessage(tab.id, {
        message: isEnabled ? "enable" : "disable",
      });
    });
  }
});

chrome.tabs.onActivated.addListener(() => {
  resolveActionIcon();
});

chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  console.log("BLOCKING NAVIGATION:", newTabNavigation, `(${details.url})`);

  if (newTabNavigation) {
    newTabNavigation = false;
    clearTimeout(newTabNavigationTimeout);

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];

      if (activeTab) {
        chrome.tabs.sendMessage(activeTab.id, {
          message: "stop",
        });
      }

      setTimeout(() => {
        chrome.tabs.create({
          url: details.url,
          index: tabs[0].index + 1,
          active: false,
        });
      }, 50);
    });
  }
});

chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    const activeTabURL = new URL(activeTab.url);
    const activeTabHost = activeTabURL.host;
    const activeTabProtocol = activeTabURL.protocol;

    if (activeTabProtocol !== "http:" && activeTabProtocol !== "https:") {
      return;
    }

    chrome.storage.local.get([activeTabHost], (result) => {
      const isEnabled = !!result[activeTabHost];
      const shouldEnable = !isEnabled;

      chrome.storage.local.set({ [activeTabHost]: shouldEnable }, function () {
        chrome.tabs.sendMessage(activeTab.id, {
          message: shouldEnable ? "enable" : "disable",
        });

        resolveActionIcon();
      });
    });
  });
});

chrome.tabs.onUpdated.addListener(() => {
  resolveActionIcon();
});
