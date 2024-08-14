function onClicked(tab) {
    (chrome || browser).scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content.js']
    });
}

if (chrome && chrome.action) {
    chrome.action.onClicked.addListener(onClicked);
} else if (browser && browser.browserAction) {
    browser.browserAction.onClicked.addListener(onClicked);
}
