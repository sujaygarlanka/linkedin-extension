chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({color: '#3aa757'}, function() {
      console.log("The color is green.");
    });
    chrome.storage.sync.set({searchTerm: ''}, function() {
    })
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
          conditions: [new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {schemes: ['http', 'https']},
          })
          ],
              actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
      });
  });

var contextMenuItem = {
    "id": "searchLinkedIn",
    "title": "Search LinkedIn for '%s'",
    "contexts": ["selection"]
};

chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener(function(clickData){
    if (clickData.menuItemId == "searchLinkedIn" && clickData.selectionText) {
        chrome.storage.sync.set({searchTerm: clickData.selectionText}, function() {})
    }
    // chrome.tabs.create({
    //     url: chrome.extension.getURL('popup.html'),
    //     active: false
    // }, function(tab) {
    //     // After the tab has been created, open a window to inject the tab
    //     chrome.windows.create({
    //         tabId: tab.id,
    //         type: 'popup',
    //         focused: true
    //     });
    // });
    // chrome.browserAction.setPopup();
})

// chrome.runtime.onMessage.addListener((request) => {
//     if (request.type === 'popup-modal') {
//         showModal();
//     }
// })

// const showModal = () => {
//     const modal = document.createElement("dialog");
//     modal.setAttribute(
//         "style", `
// height:450px;
// border: none;
// top:150px;
// border-radius:20px;
// background-color:white;
// position: fixed; box-shadow: 0px 12px 48px rgba(29, 5, 64, 0.32);
// `
//     );
//     modal.innerHTML = `<iframe id="popup-content"; style="height:100%"></iframe>
// <div style="position:absolute; top:0px; left:5px;">
// <button style="padding: 8px 12px; font-size: 16px; border: none; border-radius: 20px;">x</button>
// </div>`;
//     document.body.appendChild(modal);
//     const dialog = document.querySelector("dialog");
//     dialog.showModal();
//     const iframe = document.getElementById("popup-content");
//     iframe.src = chrome.extension.getURL("index.html");
//     iframe.frameBorder = 0;
//     dialog.querySelector("button").addEventListener("click", () => {
//         dialog.close();
//     });
// }

// //background.js
// chrome.browserAction.onClicked.addListener(function(tab) {
//     chrome.tabs.query({
//         active: true,
//         currentWindow: true
//     }, (tabs) => {
//         chrome.tabs.sendMessage(tabs[0].id, {
//             type: "popup-modal"
//         });
//     });