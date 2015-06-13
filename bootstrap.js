chrome.runtime.onInstalled.addListener(function(details) {
    chrome.storage.sync.set({state: 'on'}); 
});

chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.storage.sync.get('state', function(data) {
      if (data.state === 'on') {
		chrome.browserAction.setIcon({path: 'images/unlock-like-48.png'});
        chrome.storage.sync.set({state: 'off'});
		chrome.tabs.sendMessage(tab.id, {state: 'off'});
      } else {
		chrome.browserAction.setIcon({path: 'images/lock-like-48.png'});
        chrome.storage.sync.set({state: 'on'});
		chrome.tabs.sendMessage(tab.id, {state: 'on'});
      }
    });
});