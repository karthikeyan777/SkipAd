noAds = 1;
async function getTargetNode() {
  await sleepOneSecond();
  let targetNode = document.getElementsByClassName("ytp-ad-simple-ad-badge")[0];
  if (noAds > 5) {
    return;
  }
  return targetNode ? observerDomChanges() : getTargetNode();
}

function sleepOneSecond() {
  noAds++;
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}
getTargetNode();

function observerDomChanges() {
  let targetNodes = document.getElementsByClassName("ytp-ad-simple-ad-badge")[0];
  if (targetNodes) {
    document.getElementsByTagName('video')[0].currentTime=document.getElementsByTagName('video')[0].duration;
    getTargetNode();
  }
}
