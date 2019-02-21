noAds = 1;
chrome.storage.local.get(['noAds'], function(result) {
  noAds = result.noAds;
});
async function getTargetNode(i) {
  await sleepOneSecond();
  let targetNode = document.getElementsByClassName("ytp-ad-simple-ad-badge")[i];
  if (noAds > 5) {
    return;
  }
  return targetNode ? observerDomChanges(i) : getTargetNode(i);
}

function sleepOneSecond() {
  noAds++;
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}
getTargetNode(0);

function observerDomChanges(i) {
  let targetNodes = document.getElementsByClassName("ytp-ad-simple-ad-badge")[0];
  if (targetNodes) {
    document.getElementsByTagName('video')[i].currentTime=document.getElementsByTagName('video')[i].duration;
    getTargetNode(1);
  }
}
