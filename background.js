rule = {
  conditions: [
    new chrome.declarativeContent.PageStateMatcher({
      pageUrl: { hostEquals: 'www.youtube.com', schemes: ['https'] }
    })
  ],
  actions: [ new chrome.declarativeContent.ShowPageAction() ]
};
chrome.runtime.onInstalled.addListener(function(details) {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([rule]);
  });
});
  
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if(changeInfo.status == "complete" && tab.url.includes("www.youtube.com")) {
    chrome.storage.local.set({noAds: 0});
    chrome.tabs.executeScript({
      file: 'contentScript.js'
    });
  }
});


