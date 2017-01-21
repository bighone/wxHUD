

module.exports.init = function() {
    Date.prototype.standardFormat = function() {
        function formatNumber(n) {
            n = n.toString();
            return n[1] ? n : '0' + n;
        }

        var year = this.getFullYear()
        var month = this.getMonth() + 1
        var day = this.getDate()

        var hour = this.getHours()
        var minute = this.getMinutes()
        var second = this.getSeconds()

        return [year, month, day].map(formatNumber).join('-') + ' ' + 
        [hour, minute, second].map(formatNumber).join(':')
    }

    this.getDateDiff = function(startTime, endTime) {
        //将xxxx-xx-xx的时间格式，转换为 xxxx的格式 
        startTime = startTime.replace(/\-/g, "/");
        endTime = endTime.replace(/\-/g, "/");

        var sTime = new Date(startTime);      //开始时间
        var eTime = new Date(endTime);  //结束时间

        var second = eTime.getTime() - sTime.getTime();

        var dayY = parseInt(second%(1000 * 3600 * 24));
        var day = parseInt(second/(1000 * 3600 * 24));
        var hour = parseInt(dayY/(1000 * 3600));
        var hourY = parseInt(dayY%(1000 * 3600));
        var minute = parseInt(hourY/(1000 * 60));
        var str = "";
        if (day > 0) {
            str = day + "天";
        }
        if (hour > 0) {
            str += hour + "小时";
        }
        if (minute > 0) {
            str += minute + "分钟";
        }
        return str;
    }
}