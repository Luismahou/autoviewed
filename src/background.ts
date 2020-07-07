chrome.runtime.onInstalled.addListener(function ({ reason }) {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {
              hostEquals: 'github.com',
            },
          }),
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()],
      },
    ]);
  });

  // Open the options page when the extension is installed
  if (reason === 'install') {
    chrome.storage.sync.get(['db'], (result) => {
      const isConfigured = result?.db?.repos?.length > 0;
      if (!isConfigured) {
        chrome.runtime.openOptionsPage();
      }
    });
  }
});
