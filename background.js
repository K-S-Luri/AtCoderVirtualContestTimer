// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({number: 1}, function() {
    });
});

function express() {
    let time = new Date();
    let year = time.getYear();
    let month = time.getMonth() + 1;
    let day = time.getDate();
    let hour = time.getHours();
    let minute = time.getMinutes();
    let second = time.getSeconds();
    year += 1900;
    alert(year + "年" + month + "月" + day + "日"
          + hour + "時" + minute + "分" + second + "秒");
};


function updateIcon() {
    chrome.storage.sync.get('number', function(data) {
        let current = data.number;
    });
    //setInterval(express, 120000);
};

chrome.browserAction.onClicked.addListener(updateIcon);
updateIcon();
