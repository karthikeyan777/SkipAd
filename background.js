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
    console.log(tab.url);
    if(changeInfo.status == "complete" && tab.url.includes("www.youtube.com")) {
      console.log(tab.url);
      chrome.storage.local.set({noAds: 0});
      chrome.tabs.executeScript(null, {
        file: 'contentScript.js'
      });
    }

});


