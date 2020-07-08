// ==UserScript==
// @name         Tab Timer
// @namespace    http://kaikai.info/
// @version      0.1
// @description  为 Tab 页添加计时，用于一些要求挂机时间的页面，或提醒自己在页面上浪费的时间。
// @author       kaikai
// @include      *
// @match        *://*;
// @grant        none
// ==/UserScript==
(function() {
    'use strict';
    var originalTitle = document.title;
    var newtitle = originalTitle;
    var initialTime = new Date();
     document.addEventListener("visibilitychange", function(){
         if(document.visibilityState=='hidden'){document.title = originalTitle;}
         if(document.visibilityState=='visible'){addTimer();}
     });
    function refreshTime() {
        var match = document.title.match(/^\d{1,2}\:\d{1,2}/);
        if(match==null){
            originalTitle = document.title;
        }
        addTimer();
    }

    function addTimer(){
            var rawcount = new Date() - initialTime;
            var seconds = Math.floor(rawcount / 1000);
            var hh = Math.floor(seconds / 3600);
            var mm = Math.floor(seconds / 60) % 60;
            var ss = seconds % 60;
            var stamp;
            if (hh > 0) {
                stamp = hh + ':' + mm + '|';
            } else {
                stamp = mm + ':' + ss + '|';
            }
            newtitle = stamp + originalTitle
            if(document.visibilityState=='hidden'){newtitle = originalTitle;}
            if(originalTitle && originalTitle.length>0){document.title = newtitle};
        }
    setInterval(refreshTime, 1000);

})();