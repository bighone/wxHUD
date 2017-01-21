


module.exports.init = function() {
    // 是否为空
    String.prototype.isEmpty = function() {
        return this === undefined || this === null || this == "";
    }

    // 是否合法
    String.prototype.isValid = function() {
        return !this.isEmpty() && !this.trim().isEmpty();
    }

    // 是否包含某段字符
    String.prototype.isContains = function(value) {
        return this.indexOf(value) > -1;
    }

    // 获取字符数组
    String.prototype.toCharArray = function() {
        return this.split("");
    }

    // 逆序
    String.prototype.reverse = function() {
        return this.toCharArray().reverse().join("");
    }

    // HTML编码 
    String.prototype.HTMLEncode = function() {
        var re = this;
        var q1 = [ /x26/g, /x3C/g, /x3E/g, /x20/g ];
        var q2 = [ "&", "<", ">", " " ];
        for ( var i = 0; i < q1.length; i++)
            re = re.replace(q1[i], q2[i]);
        return re;
    }

    // Unicode转化 
    String.prototype.ascW = function() {
        var strText = "";
        for ( var i = 0; i < this.length; i++)
            strText += "&#" + this.charCodeAt(i) + ";";
        return strText;
    }

    // to int or float
    String.prototype.toInt = function() {
        return isNaN(parseInt(this)) ? 0 : parseInt(this);
    } 
    String.prototype.toFloat = function() {
        return isNaN(parseFloat(this)) ? 0 : parseFloat(this);
    }

    // 检查字符串是否是邮箱，url或整数
    String.prototype.isEmail = function() {
        return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(this);
    }
    String.prototype.isUrl = function() {
        return /^http[s]?:\/\/([\w-]+\.)+[\w-]+([\w-./?%&=]*)?$/i.test(this);
    } 
    String.prototype.isNumber=function() {
        return /^[0-9]+$/.test(this);
    }  

    // 转换
    String.prototype.numberPlate = function() {
        if (!this.isValid()) return '';
        var arr = this.split('');
        arr.splice(2, 0, '•');
        return arr.join('');
    }
    String.prototype.rNumberPlate = function() {
        if (!this.isValid() || this.length !== 8) return this;
        var arr = this.split('');
        arr.splice(2, 1);
        return arr.join('');
    } 
}