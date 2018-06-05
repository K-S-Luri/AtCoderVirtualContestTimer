'use strict';

function express() {
    let now = new Date();
    let url = location.href;
    let id = url.match(/\d+$/)[0];
    chrome.storage.local.get(['start' + id,'end' + id, 'shown' + id], function(data) {
        let start = data["start" + id];
        let end = data["end" + id];
        let shown = data["shown" + id];
        let startNums = start.match(/(\d+)-(\d+)-(\d+)\s(\d+):(\d+):(\d+)/);
        startNums[2]--;
        let startDate = new Date(...startNums.slice(1));
        let endNums = end.match(/(\d+)-(\d+)-(\d+)\s(\d+):(\d+):(\d+)/);
        endNums[2]--;
        let endDate = new Date(...endNums.slice(1));
        if (now > endDate && shown < 2) {
            alert("終了しました");
            chrome.storage.local.set({['shown' + id]:2});
            $("body div#clock").text("");
        } else if (now > startDate && shown < 1) {
            alert("開始しました");
            chrome.storage.local.set({['shown' + id]:1});
            //location.reload();
        } else if (now < endDate && shown == 0) {

        }

        if (shown == 1) {
            let remain = endDate - now;
            if (remain > 0) {
                let minute = Math.floor(remain / 60000);
                let second = Math.floor((remain - minute * 60000) / 1000);
                $("body div#clock").text("残り" + minute + "分" + second + "秒");
            } else {
                $("body div#clock").text("残り0分0秒");
            }
        }
    });
};

function init() {
    let timeStr = $("body div.container h1.page-header small.pull-right").text();
    $("body").append("<div id='clock' style='text-align:center;font-size:18pt;'></div>");
    let match = timeStr.match(/\d+-\d+-\d+\s\d+:\d+:\d+/g);
    
    let start = match[0];
    let end = match[1];
    
    let url = location.href;
    let id = url.match(/\d+$/)[0];
    
    chrome.storage.local.set({["start" + id]:start, ["end" + id]:end, ["shown" + id]:0});
    setInterval(express, 1000);
};

init();
