noAds = 1;
chrome.storage.local.get(['noAds'], function(result) {
  noAds = result.noAds;
});
async function getTargetNode() {
  await sleetOneSecond();
  let targetNode = document.getElementsByClassName("ytp-ad-skip-button-container")[0];
  if (noAds > 5) {
    return;
  }
  return targetNode ? observerDomChanges() : getTargetNode();
}

function sleetOneSecond() {
  noAds++;
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}
getTargetNode();

function observerDomChanges() {
  let targetNodes = document.getElementsByClassName("ytp-ad-skip-button-container")[0];
  var config = { attributes: true };
  var callback = function(mutationsList, observer) {
    for(var mutation of mutationsList) {
      if (mutation.attributeName == 'style') {
        document.getElementsByClassName("ytp-ad-skip-button-container")[0].click();
        observer.disconnect();
      }
    }
  };
  var observer = new MutationObserver(callback);
  observer.observe(targetNodes, config);
}




