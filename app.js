// Copyright (c) 2016 Monsenhor. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Implements a simple extension that play the current youtube video on telll
// telll webapp is loaded in a iframe

var VERSION = "0.17.0 Nyquist";

var conf = {
   webapp:"http://webapp.telll.me"
};

console.info("begin telll chrome version "+VERSION);

/**
 * Get the current URL.
 *
 * @param {function(string)} callback - called when the URL of the current tab
 *   is found.
 */
function getCurrentTabUrl(callback) {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    // chrome.tabs.query invokes the callback with a list of tabs that match the
    // query. When the popup is opened, there is certainly a window and at least
    // one tab, so we can safely assume that |tabs| is a non-empty array.
    // A window can only have one active tab at a time, so the array consists of
    // exactly one tab.
    var tab = tabs[0];

    // A tab is a plain object that provides information about the tab.
    // See https://developer.chrome.com/extensions/tabs#type-Tab
    var url = tab.url;
    console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(url);
  });
}

function injectTelll(url) {
  console.log("Actual URL "+url);
  document.getElementById('telll-iframe').src = url;
}

document.addEventListener('DOMContentLoaded', function() {
  getCurrentTabUrl(function(url) {
console.info("begin telll chrome version "+VERSION);
    injectTelll(conf.webapp + "?youtube=" +  url);
  });
});
